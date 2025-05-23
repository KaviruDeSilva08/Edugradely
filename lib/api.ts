import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Flask backend URL

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  // Add timeout
  timeout: 30000, 
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data instanceof FormData ? 'FormData' : config.data,
    });
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// Logging function to send logs to backend
export const logToTerminal = async (logData: any) => {
  try {
    await axiosInstance.post('/log', {
      timestamp: new Date().toISOString(),
      ...logData
    });
  } catch (error) {
    console.error('Failed to send log to terminal:', error);
  }
};

export interface GradingResponse {
  score: number;
  feedback: string;
  detailed_feedback: string;
}

export interface GradingRequest {
  assignment: File;
  rubric: File;
  answers: File;
  note?: string;
}

export const api = {
  async gradeAssignment(data: GradingRequest): Promise<GradingResponse> {
    // Verify file data
    if (!data.assignment || !data.rubric || !data.answers) {
      await logToTerminal({
        type: 'ERROR',
        message: 'Missing required files',
        files: {
          assignment: !!data.assignment,
          rubric: !!data.rubric,
          answers: !!data.answers
        }
      });
      throw new Error('Missing required files');
    }

    // Verify file types
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const files = [data.assignment, data.rubric, data.answers];
    
    for (const file of files) {
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      if (!allowedTypes.includes(fileExtension)) {
        await logToTerminal({
          type: 'ERROR',
          message: `Invalid file type for ${file.name}`,
          fileType: fileExtension,
          allowedTypes
        });
        throw new Error(`Invalid file type for ${file.name}. Only PDF and Word documents are allowed.`);
      }
    }

    await logToTerminal({
      type: 'INFO',
      message: 'Starting grading process',
      files: {
        assignment: data.assignment.name,
        rubric: data.rubric.name,
        answers: data.answers.name
      }
    });

    const formData = new FormData();
    formData.append('assignment', data.assignment);
    formData.append('rubric', data.rubric);
    formData.append('answers', data.answers);
    if (data.note) {
      formData.append('note', data.note);
    }

    try {
      const response = await axiosInstance.post('/grade', formData);
      
      if (!response.data) {
        await logToTerminal({
          type: 'ERROR',
          message: 'No data received from server'
        });
        throw new Error('No data received from server');
      }

      // Validate response data
      if (typeof response.data.score !== 'number' || 
          typeof response.data.feedback !== 'string' || 
          typeof response.data.detailed_feedback !== 'string') {
        await logToTerminal({
          type: 'ERROR',
          message: 'Invalid response format from server',
          data: response.data
        });
        throw new Error('Invalid response format from server');
      }

      await logToTerminal({
        type: 'SUCCESS',
        message: 'Grading completed successfully',
        score: response.data.score,
        feedback: response.data.feedback
      });

      return response.data;
    } catch (error) {
      await logToTerminal({
        type: 'ERROR',
        message: 'Grading process failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  },
}; 