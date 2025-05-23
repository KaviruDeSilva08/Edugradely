import { useState, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, Pencil, Loader2 } from 'lucide-react';
import { api, GradingResponse, logToTerminal } from '@/lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGrading?: (files: {
    assignment: File | null;
    rubric: File | null;
    answers: File | null;
  }, note: string, response?: GradingResponse) => void;
}

const dropzoneStyle =
  'flex flex-col items-center justify-center border-2 border-teal-200 rounded-xl bg-teal-50 min-h-[120px] transition-colors cursor-pointer hover:border-teal-500 px-4 py-6';

export function UploadDialog({ isOpen, onClose, onGrading }: UploadDialogProps) {
  const router = useRouter();
  const [files, setFiles] = useState({
    assignment: null as File | null,
    rubric: null as File | null,
    answers: null as File | null,
  });
  const [note, setNote] = useState('Please recheck caret document upload');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');

  // Refs for file inputs
  const assignmentInput = useRef<HTMLInputElement>(null);
  const rubricInput = useRef<HTMLInputElement>(null);
  const answersInput = useRef<HTMLInputElement>(null);

  const handleGrading = async () => {
    await logToTerminal({
      type: 'INFO',
      message: 'Grading button clicked',
      files: {
        assignment: files.assignment?.name || 'Not uploaded',
        rubric: files.rubric?.name || 'Not uploaded',
        answers: files.answers?.name || 'Not uploaded'
      }
    });
    
    if (!files.assignment || !files.rubric || !files.answers) {
      await logToTerminal({
        type: 'ERROR',
        message: 'Missing required files',
        files: {
          assignment: !!files.assignment,
          rubric: !!files.rubric,
          answers: !!files.answers
        }
      });
      toast.error('Please upload all required files');
      return;
    }

    setIsLoading(true);
    setAnalysisStep('Initializing analysis...');
    
    try {
      // Simulate analysis steps
      setAnalysisStep('Reading assignment file...');
      await logToTerminal({
        type: 'INFO',
        message: 'Reading assignment file',
        file: files.assignment.name
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisStep('Processing rubric...');
      await logToTerminal({
        type: 'INFO',
        message: 'Processing rubric',
        file: files.rubric.name
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisStep('Analyzing answers...');
      await logToTerminal({
        type: 'INFO',
        message: 'Analyzing answers',
        file: files.answers.name
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisStep('Generating feedback...');
      await logToTerminal({
        type: 'INFO',
        message: 'Generating feedback'
      });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate grading response
      const response: GradingResponse = {
        score: 85,
        feedback: "Excellent work! The assignment demonstrates a strong understanding of the concepts.",
        detailed_feedback: "The student has shown exceptional understanding of the subject matter. The answers are well-structured and demonstrate critical thinking."
      };

      await logToTerminal({
        type: 'SUCCESS',
        message: 'Grading completed successfully',
        result: {
          score: response.score,
          feedback: response.feedback
        }
      });

      setShowSuccess(true);
      toast.success('Grading completed successfully!');
      
      // Wait for success animation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (onGrading) {
        await logToTerminal({
          type: 'INFO',
          message: 'Sending grading results to parent component'
        });
        onGrading(files, note, response);
      }
      handleDialogClose();
    } catch (error) {
      await logToTerminal({
        type: 'ERROR',
        message: 'Grading process failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      setIsLoading(false);
      setAnalysisStep('');
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const validateFileType = (file: File): boolean => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    const isValid = allowedTypes.includes(fileExtension);
    
    if (!isValid) {
      console.warn('⚠️ Invalid file type:', {
        fileName: file.name,
        fileType: fileExtension,
        allowedTypes,
      });
    }
    
    return isValid;
  };

  const handleFileChange = async (type: keyof typeof files, file: File | null) => {
    await logToTerminal({
      type: 'INFO',
      message: 'File change',
      fileInfo: {
        type,
        fileName: file?.name || 'removed',
        fileSize: file?.size ? `${(file.size / 1024).toFixed(2)} KB` : 'N/A',
        fileType: file?.type || 'N/A'
      }
    });

    if (file && !validateFileType(file)) {
      await logToTerminal({
        type: 'ERROR',
        message: 'Invalid file type',
        fileInfo: {
          name: file.name,
          type: file.type
        }
      });
      toast.error('Please upload only PDF or Word documents');
      return;
    }
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleDrop = async (type: keyof typeof files, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    await logToTerminal({
      type: 'INFO',
      message: 'File drop event',
      dropInfo: { type }
    });
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await logToTerminal({
        type: 'INFO',
        message: 'File dropped',
        fileInfo: {
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          type: file.type
        }
      });

      if (!validateFileType(file)) {
        await logToTerminal({
          type: 'ERROR',
          message: 'Invalid file type in drop',
          fileInfo: {
            name: file.name,
            type: file.type
          }
        });
        toast.error('Please upload only PDF or Word documents');
        return;
      }
      handleFileChange(type, file);
    }
  };

  const handleDialogClose = async () => {
    await logToTerminal({
      type: 'INFO',
      message: 'Closing dialog and resetting state',
      files: {
        assignment: files.assignment?.name,
        rubric: files.rubric?.name,
        answers: files.answers?.name
      }
    });
    setFiles({ assignment: null, rubric: null, answers: null });
    setNote('Please recheck caret document upload');
    setIsLoading(false);
    setShowSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-[350px] rounded-2xl p-0 overflow-visible">
        <div className="p-5 rounded-2xl bg-white">
          <div className="flex flex-col items-center mb-3">
            <Pencil className="h-7 w-7 text-teal-600 mb-1" />
            <h2 className="text-xl font-bold text-center mb-1">Get Start Grading</h2>
            <p className="text-gray-600 text-center text-xs mb-1">
              Drag and drop your assignment brief and your answers
            </p>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-50">
              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-teal-600 animate-[bounce_1s_infinite_0ms]" />
                <div className="w-3 h-3 rounded-full bg-teal-600 animate-[bounce_1s_infinite_200ms]" />
                <div className="w-3 h-3 rounded-full bg-teal-600 animate-[bounce_1s_infinite_400ms]" />
              </div>
              <p className="text-teal-600 font-medium mb-2">Processing your files...</p>
              {analysisStep && (
                <p className="text-teal-500 text-sm animate-pulse">{analysisStep}</p>
              )}
            </div>
          )}

          {/* Success Animation */}
          {showSuccess && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-50">
              <div className="w-12 h-12 mb-4 relative">
                <svg 
                  className="w-full h-full text-teal-600 animate-[draw_1s_ease-in-out]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
              <p className="text-teal-600 font-medium">Grading Complete!</p>
            </div>
          )}

          {/* Assignment */}
          <div className="mb-3">
            <div className="font-semibold mb-1">Assignment</div>
            <div
              className={dropzoneStyle + ' min-h-[80px]'}
              onClick={() => assignmentInput.current?.click()}
              onDrop={e => handleDrop('assignment', e)}
              onDragOver={e => e.preventDefault()}
            >
              <FileText className="h-8 w-8 text-gray-400 mb-1" />
              <div className="text-gray-500 text-xs mb-1">
                {files.assignment ? files.assignment.name : 'No file uploaded'}
              </div>
              <input
                ref={assignmentInput}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={e => handleFileChange('assignment', e.target.files?.[0] || null)}
              />
              {files.assignment && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1"
                  onClick={e => {
                    e.stopPropagation();
                    handleFileChange('assignment', null);
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>

          {/* Rubric */}
          <div className="mb-3">
            <div className="font-semibold mb-1">Rubric</div>
            <div
              className={dropzoneStyle + ' min-h-[80px]'}
              onClick={() => rubricInput.current?.click()}
              onDrop={e => handleDrop('rubric', e)}
              onDragOver={e => e.preventDefault()}
            >
              <FileText className="h-8 w-8 text-gray-400 mb-1" />
              <div className="text-gray-500 text-xs mb-1">
                {files.rubric ? files.rubric.name : 'No file uploaded'}
              </div>
              <input
                ref={rubricInput}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={e => handleFileChange('rubric', e.target.files?.[0] || null)}
              />
              {files.rubric && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1"
                  onClick={e => {
                    e.stopPropagation();
                    handleFileChange('rubric', null);
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>

          {/* Answers */}
          <div className="mb-3">
            <div className="font-semibold mb-1">Answers</div>
            <div
              className={dropzoneStyle + ' min-h-[80px]'}
              onClick={() => answersInput.current?.click()}
              onDrop={e => handleDrop('answers', e)}
              onDragOver={e => e.preventDefault()}
            >
              <FileText className="h-8 w-8 text-gray-400 mb-1" />
              <div className="text-gray-500 text-xs mb-1">
                {files.answers ? files.answers.name : 'No file uploaded'}
              </div>
              <input
                ref={answersInput}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={e => handleFileChange('answers', e.target.files?.[0] || null)}
              />
              {files.answers && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1"
                  onClick={e => {
                    e.stopPropagation();
                    handleFileChange('answers', null);
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>

          {/* Note area */}
          <div className="mb-4">
            <textarea
              className="w-full rounded-xl border border-gray-200 p-2 text-xs resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
              rows={2}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Note"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-full bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200 py-2 text-sm"
              onClick={handleDialogClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 rounded-full bg-teal-600 text-white hover:bg-teal-700 py-2 text-sm relative"
              onClick={handleGrading}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Grading'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 