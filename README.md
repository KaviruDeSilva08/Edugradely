<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=00DEFF&text=Welcome&reversal=false&descAlign=60&descAlignY=60&fontColor=ffffff&fontSize=40&animation=twinkling&section=header" width="100%" />
</p>

# EduGradely - AI-Powered Grading System

![EduGradely Logo](/public/images/EG_Logo.png)

EduGradely is a modern web application that leverages artificial intelligence to assist in grading and evaluating student submissions. The project combines a Next.js frontend with a Flask backend to provide a seamless grading experience.

## Features

- AI-powered grading system
- Modern, responsive UI built with Next.js and Tailwind CSS
- Secure user authentication
- Real-time feedback and evaluation
- PDF generation and export capabilities

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn package manager
- pip (Python package manager)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd Edugradely
```

2. Set up the frontend:
```bash
# Install dependencies
npm install

# Create a .env.local file in the root directory and add necessary environment variables
```

3. Set up the backend:
```bash
# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows, use: .venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

## Running the Application

1. Start the backend server:
```bash
# Make sure your virtual environment is activated
python app.py
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Development

- Frontend development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`
- Run linting: `npm run lint`

## Project Structure

```
Edugradely/
├── app/                 # Next.js app directory
├── components/          # React components
├── Backend/            # Backend related files
├── lib/                # Utility libraries
├── public/             # Static files
├── utils/              # Utility functions
├── app.py             # Flask backend server
└── requirements.txt    # Python dependencies
```

## Technologies Used

- **Frontend:**
  - Next.js
  - React
  - Tailwind CSS
  - TypeScript
  - Radix UI Components

- **Backend:**
  - Flask
  - Python
  - scikit-learn
  - NLTK
  - Pandas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact to my self.

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=00DEFF&reversal=false&descAlign=60&descAlignY=60&fontColor=ffffff&fontSize=60&animation=twinkling&section=footer" width="100%" />
</p>
