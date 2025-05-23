<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=00DEFF&text=Welcome&reversal=false&descAlign=60&descAlignY=60&fontColor=ffffff&fontSize=40&animation=twinkling&section=header" width="100%" />
</p>

# EduGradely - AI-Powered Grading System

![EduGradely Logo](/public/images/EG_Logo.png)

EduGradely is a modern web application that leverages artificial intelligence to assist in grading and evaluating student 
submissions. The project combines a Next.js frontend with a Flask backend to provide a seamless grading experience.

## Project Structure

```
EduGradely/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utility libraries
│   ├── public/             # Static assets
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   └── ...                 # Configuration files
│
├── backend/                 # Python Flask backend
│   ├── src/                # Source code
│   ├── model/              # AI model files
│   ├── uploads/            # File upload directory
│   ├── app.py              # Main Flask application
│   ├── model.py            # AI model implementation
│   └── requirements.txt    # Python dependencies
│
└── .gitignore              # Git ignore file
```

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn
- pip (Python package manager)

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

The backend API will be available at `http://localhost:5000`

## Features

- AI-powered grading system
- Real-time feedback generation
- Modern, responsive user interface
- Secure file upload and processing
- Comprehensive grading analytics

## Development

- Frontend is built with Next.js, TypeScript, and Tailwind CSS
- Backend is built with Python Flask
- AI model integration for automated grading
- RESTful API architecture

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=00DEFF&reversal=false&descAlign=60&descAlignY=60&fontColor=ffffff&fontSize=60&animation=twinkling&section=footer" width="100%" />
</p>
