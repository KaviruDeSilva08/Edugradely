"use client";

import { Button } from "@/components/ui/button";
import { 
  LayoutGrid, 
  UserCircle, 
  BookOpen, 
  Info, 
  LogOut, 
  Search,
  Upload,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AccountPopup } from "@/components/AccountPopup";
import { useRouter } from "next/navigation";
import { UploadDialog } from "@/components/UploadDialog";
import jsPDF, { GState } from "jspdf";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { GradingReport } from '@/components/GradingReport';
import { logToTerminal } from '@/lib/api';

type GradingResponse = {
  score: number;
  feedback: string;
  detailed_feedback: string;
};

interface AnswerComparison {
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

interface RubricEntry {
  name: string;
  value: number;
  color: string;
}

// Add these functions at the top level, before the Dashboard component
const getRandomGrade = () => {
  const grades = ['C+', 'B', 'A+'];
  const randomIndex = Math.floor(Math.random() * grades.length);
  return grades[randomIndex];
};

const getGradeFeedback = (grade: string) => {
  switch (grade) {
    case 'A+':
      return "Outstanding work! The assignment demonstrates exceptional understanding and mastery of the concepts.";
    case 'B':
      return "Good work! The assignment shows a solid understanding of the concepts with some areas for improvement.";
    case 'C+':
      return "Satisfactory work. The assignment meets basic requirements but needs improvement in several areas.";
    default:
      return "Work submitted. Please review feedback for detailed comments.";
  }
};

const getAnswerComparisons = (grade: string) => {
  switch (grade) {
    case 'A+':
      return [
        {
          question: "Explain the concept of machine learning and its applications.",
          studentAnswer: "Machine learning is a subset of AI that enables systems to learn from data. It's used in recommendation systems, image recognition, and natural language processing.",
          correctAnswer: "Machine learning is a subset of AI that enables systems to learn from data. It's used in recommendation systems, image recognition, and natural language processing.",
          isCorrect: true,
          explanation: "Excellent explanation! The answer demonstrates deep understanding of machine learning concepts and provides relevant examples."
        },
        {
          question: "What are the key differences between supervised and unsupervised learning?",
          studentAnswer: "Supervised learning uses labeled data for training, while unsupervised learning finds patterns in unlabeled data. Supervised learning is used for classification and regression, while unsupervised learning is used for clustering and dimensionality reduction.",
          correctAnswer: "Supervised learning uses labeled data for training, while unsupervised learning finds patterns in unlabeled data.",
          isCorrect: true,
          explanation: "Outstanding answer! The student provided a comprehensive comparison with additional details about use cases."
        }
      ];
    case 'B':
      return [
        {
          question: "Explain the concept of machine learning and its applications.",
          studentAnswer: "Machine learning is a type of AI that learns from data. It's used in many applications like recommendations and image recognition.",
          correctAnswer: "Machine learning is a subset of AI that enables systems to learn from data. It's used in recommendation systems, image recognition, and natural language processing.",
          isCorrect: true,
          explanation: "Good understanding of the concept, but could provide more specific examples and technical details."
        },
        {
          question: "What are the key differences between supervised and unsupervised learning?",
          studentAnswer: "Supervised learning uses labeled data, while unsupervised learning doesn't use labels.",
          correctAnswer: "Supervised learning uses labeled data for training, while unsupervised learning finds patterns in unlabeled data.",
          isCorrect: true,
          explanation: "Basic understanding shown, but could elaborate more on the differences and provide examples."
        }
      ];
    case 'C+':
      return [
        {
          question: "Explain the concept of machine learning and its applications.",
          studentAnswer: "Machine learning is when computers learn from data. It's used in many things.",
          correctAnswer: "Machine learning is a subset of AI that enables systems to learn from data. It's used in recommendation systems, image recognition, and natural language processing.",
          isCorrect: true,
          explanation: "Basic understanding demonstrated, but needs more technical depth and specific examples."
        },
        {
          question: "What are the key differences between supervised and unsupervised learning?",
          studentAnswer: "Supervised learning has labels and unsupervised doesn't.",
          correctAnswer: "Supervised learning uses labeled data for training, while unsupervised learning finds patterns in unlabeled data.",
          isCorrect: true,
          explanation: "Minimal understanding shown. Needs to explain the concepts more thoroughly and provide examples."
        }
      ];
    default:
      return [];
  }
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [gradingReport, setGradingReport] = useState<GradingReport | null>(null);
  const [email, setEmail] = useState("User");
  // const username = "User"; // This would come from authentication
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
    } else {
      const user = JSON.parse(storedUser);
      setEmail(user.username || "User"); // Adjust this according to your user object
    }
  }, []);

  // Get current time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const logout = () => {
    // Remove user session data from localStorage
    localStorage.removeItem('user');
  
    // Redirect to the login page
    window.location.href = '/login';
  };
  
  // Simulate grading and show report
  const handleGrading = async (
    files: { assignment: File | null; rubric: File | null; answers: File | null },
    note: string,
    response?: GradingResponse
  ) => {
    await logToTerminal({
      type: 'INFO',
      message: 'Generating grading report',
      files: {
        assignment: files.assignment?.name,
        rubric: files.rubric?.name,
        answers: files.answers?.name
      },
      note,
      response
    });

    // Get random grade
    const randomGrade = getRandomGrade();
    const gradeFeedback = getGradeFeedback(randomGrade);
    const answerComparisons = getAnswerComparisons(randomGrade);
    
    await logToTerminal({
      type: 'INFO',
      message: 'Random grade selected',
      grade: randomGrade,
      feedback: gradeFeedback,
      answerComparisons: answerComparisons.length
    });

    // Create a report object using the simulated response
    const report: GradingReport = {
      assignment: files.assignment?.name || "No file uploaded",
      rubric: files.rubric?.name || "No file uploaded",
      answers: files.answers?.name || "No file uploaded",
      note: note || "",
      grade: randomGrade,
      feedback: gradeFeedback,
      rubricChart: [
        { name: "Content", value: 40, color: "#14b8a6" },
        { name: "Structure", value: 30, color: "#2dd4bf" },
        { name: "Language", value: 20, color: "#5eead4" },
        { name: "Originality", value: 10, color: "#99f6e4" },
      ],
      answerComparisons: answerComparisons
    };

    await logToTerminal({
      type: 'SUCCESS',
      message: 'Grading report generated',
      report: {
        grade: report.grade,
        feedback: report.feedback,
        rubricBreakdown: report.rubricChart,
        answerComparisons: report.answerComparisons?.length
      }
    });

    setGradingReport(report);
    setIsReportDialogOpen(true);
  };

  // Download report as PDF
  const handleDownloadPDF = async () => {
    if (!gradingReport) return;
    
    await logToTerminal({
      type: 'INFO',
      message: 'Downloading PDF report',
      report: {
        grade: gradingReport.grade,
        assignment: gradingReport.assignment,
        rubric: gradingReport.rubric,
        answers: gradingReport.answers
      }
    });

    const doc = new jsPDF();
    let yPosition = 20;
    
    // Add page border
    doc.setDrawColor(20, 184, 166); // Teal color
    doc.setLineWidth(1);
    doc.rect(5, 5, 200, 287); // Page border with 5mm margin
    
    // Add watermark
    const watermark = new window.Image();
    watermark.src = '/images/Eg_i.png';
    doc.saveGraphicsState();
    doc.setGState(new GState({ opacity: 0.1 }));
    doc.addImage(watermark, 'PNG', 50, 100, 100, 100);
    doc.restoreGraphicsState();
    
    // Add logo
    const logo = new window.Image();
    logo.src = '/images/EG_Logo.png';
    doc.addImage(logo, 'PNG', 14, 10, 40, 20);

    // Add header text
    doc.setFontSize(24);
    doc.setTextColor(20, 184, 166); // Teal color
    doc.text("Grading Report", 105, 20, { align: 'center' });
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(`Generated on: ${today}`, 105, 30, { align: 'center' });

    // Add divider line
    doc.setDrawColor(20, 184, 166);
    doc.setLineWidth(0.5);
    doc.line(14, 35, 196, 35);

    // Helper function to add text with word wrap
    const addWrappedText = (text: string, y: number, fontSize: number = 12) => {
      doc.setFontSize(fontSize);
      const splitText = doc.splitTextToSize(text, 182); // 200 - 18 for margins
      doc.text(splitText, 14, y);
      return y + (splitText.length * (fontSize * 0.35));
    };

    // Assignment details
    doc.setFontSize(14);
    doc.setTextColor(20, 184, 166);
    doc.text("Assignment Details", 14, 45);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    yPosition = addWrappedText(`Assignment: ${gradingReport.assignment}`, 55);
    yPosition = addWrappedText(`Rubric: ${gradingReport.rubric}`, yPosition);
    yPosition = addWrappedText(`Answers: ${gradingReport.answers}`, yPosition);
    yPosition += 10;
    
    // Grade and feedback
    doc.setFontSize(14);
    doc.setTextColor(20, 184, 166);
    doc.text("Grade & Feedback", 14, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    yPosition = addWrappedText(`Note: ${gradingReport.note}`, yPosition);
    yPosition += 5;
    
    // Grade with special styling
    doc.setFontSize(16);
    doc.setTextColor(20, 184, 166);
    doc.text(`Grade: ${gradingReport.grade}`, 14, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    yPosition = addWrappedText(`Feedback: ${gradingReport.feedback}`, yPosition);
    yPosition += 15;

    // Add Answer Comparisons if they exist
    if (gradingReport.answerComparisons && gradingReport.answerComparisons.length > 0) {
      // Add Answer Analysis section header
      doc.setFontSize(14);
      doc.setTextColor(20, 184, 166);
      doc.text("Answer Analysis", 14, yPosition);
      yPosition += 10;

      // Add each answer comparison
      for (const comparison of gradingReport.answerComparisons) {
        // Check if we need a new page
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }

        // Question
        doc.setFont('helvetica', 'bold');
        yPosition = addWrappedText(`Question: ${comparison.question}`, yPosition);
        yPosition += 5;

        // Student's Answer
        doc.setFont('helvetica', 'bold');
        yPosition = addWrappedText("Student's Answer:", yPosition);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(comparison.isCorrect ? 0 : 255, comparison.isCorrect ? 128 : 0, 0);
        yPosition = addWrappedText(comparison.studentAnswer, yPosition);
        yPosition += 5;

        // Correct Answer
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        yPosition = addWrappedText("Correct Answer:", yPosition);
        doc.setFont('helvetica', 'normal');
        yPosition = addWrappedText(comparison.correctAnswer, yPosition);
        yPosition += 5;

        // Explanation
        doc.setFont('helvetica', 'bold');
        yPosition = addWrappedText("Explanation:", yPosition);
        doc.setFont('helvetica', 'normal');
        yPosition = addWrappedText(comparison.explanation, yPosition);
        yPosition += 15;
      }
    }

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Generated by EduGradely - AI-Powered Grading System", 105, 280, { align: 'center' });
    
    doc.save("grading_report.pdf");
  };

  return (
    <div className="min-h-screen flex">
      {/* Account Popup */}
      <AccountPopup 
        isOpen={isAccountPopupOpen}
        onClose={() => setIsAccountPopupOpen(false)}
      />

      {/* Upload Dialog */}
      <UploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onGrading={handleGrading}
      />

      {/* Grading Report Dialog */}
      {isReportDialogOpen && gradingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsReportDialogOpen(false)} />
          <div className="relative z-50 bg-white rounded-2xl p-8 w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-100">
            <h2 className="text-2xl font-bold mb-4 text-center text-teal-700 flex items-center justify-center gap-2">
              <span>Final Grading Report</span>
              <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-[pulse_3s_ease-in-out_infinite]" />
            </h2>
            <div className="mb-4 flex flex-col items-center">
              {/* Pie Chart */}
              {gradingReport.rubricChart && (
                <div className="mb-2">
                  <PieChart width={180} height={180}>
                    <Pie
                      data={gradingReport.rubricChart}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={40}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {gradingReport.rubricChart.map((entry: RubricEntry, idx: number) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  <div className="text-xs text-gray-500 text-center mt-1">Rubric Breakdown</div>
                </div>
              )}
            </div>
            <div className="mb-2"><b>Assignment:</b> <span className="text-teal-700">{gradingReport.assignment}</span></div>
            <div className="mb-2"><b>Rubric:</b> <span className="text-teal-700">{gradingReport.rubric}</span></div>
            <div className="mb-2"><b>Answers:</b> <span className="text-teal-700">{gradingReport.answers}</span></div>
            <div className="mb-2"><b>Note:</b> <span className="text-gray-700">{gradingReport.note}</span></div>
            <div className="mb-2"><b>Grade:</b> <span className="text-teal-600 font-semibold text-lg">{gradingReport.grade}</span></div>
            <div className="mb-4"><b>Feedback:</b> <span className="text-gray-700">{gradingReport.feedback}</span></div>

            {/* Answer Comparisons Section */}
            {gradingReport.answerComparisons && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-teal-700">Answer Analysis</h3>
                <div className="space-y-4">
                  {gradingReport.answerComparisons.map((comparison: AnswerComparison, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="mb-2">
                        <span className="font-medium text-gray-700">Question {index + 1}:</span>
                        <p className="text-gray-600">{comparison.question}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="font-medium text-gray-700">Student's Answer:</span>
                          <p className={`text-sm ${comparison.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {comparison.studentAnswer}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Correct Answer:</span>
                          <p className="text-sm text-gray-600">{comparison.correctAnswer}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Explanation:</span> {comparison.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button className="flex-1 rounded-full bg-teal-600 text-white hover:bg-teal-700 py-2 text-sm shadow-md" onClick={handleDownloadPDF}>
                Download as PDF
              </Button>
              <Button variant="outline" className="flex-1 rounded-full py-2 text-sm border-teal-200 hover:bg-teal-50" onClick={() => setIsReportDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 fixed h-full transform transition-all duration-500 ease-in-out ${
          isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-0'
        } shadow-lg`}
      >
        <div className="h-full flex flex-col">
          {/* Logo in Sidebar */}
          <div className="px-6 py-2">
            <div className={`transition-all duration-500 ease-in-out ${
              isSidebarOpen ? 'w-32' : 'w-10'
            }`}>
              <Image
                src="/images/EG_Logo.png"
                alt="EG Logo"
                width={128}
                height={40}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <div className="px-6 py-4 flex-1">
            <nav className="space-y-2">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 text-teal-600 font-medium p-2 rounded-lg bg-teal-50 group hover:scale-105 transform transition-all duration-300"
              >
                <LayoutGrid className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>Dashboard</span>
              </Link>
              <button 
                onClick={() => setIsAccountPopupOpen(true)}
                className="flex items-center gap-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg group hover:scale-105 transform transition-all duration-300 w-full text-left"
              >
                <UserCircle className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>Account</span>
              </button>
              <Link 
                href="/how-it-works" 
                className="flex items-center gap-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg group hover:scale-105 transform transition-all duration-300"
              >
                <BookOpen className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>How to use</span>
              </Link>
              <Link 
                href="/about" 
                className="flex items-center gap-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg group hover:scale-105 transform transition-all duration-300"
              >
                <Info className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>About</span>
              </Link>
              <button 
                onClick={() => {logout()}}
                className="flex items-center gap-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg w-full text-left group hover:scale-105 transform transition-all duration-300"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>Logout</span>
              </button>
            </nav>
          </div>

          {/* Toggle Button */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-teal-50 text-gray-600 transition-all duration-300 hover:text-teal-600 group"
            >
              {isSidebarOpen ? (
                <>
                  <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className={`text-sm font-medium whitespace-nowrap transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                  }`}>Collapse</span>
                </>
              ) : (
                <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-500 ease-in-out ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      } bg-gray-50`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8 flex-1">
            {/* Logo in Top Bar when sidebar is collapsed */}
            <div className={`transition-all duration-500 ease-in-out ${
              isSidebarOpen ? 'w-0 opacity-0' : 'w-32 opacity-100'
            }`}>
              <Image
                src="/images/EG_Logo.png"
                alt="EG Logo"
                width={128}
                height={40}
                className="w-full h-auto object-contain"
              />
            </div>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
              />
            </div>
          </div>
          
          {/* User Profile */}
          <button
            onClick={() => setIsAccountPopupOpen(true)}
            className="flex items-center gap-2 p-2 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
          >
            <UserCircle className="h-6 w-6" />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{getGreeting()}, {email}!</h1>
            <p className="text-gray-600">How can we help you today?</p>
          </div>

          {/* Main Image */}
          <div className="mb-12">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/Dashboard_Baner.jpg"
                alt="Dashboard Banner"
                width={1920}
                height={400}
                className="w-full h-64 object-cover"
                priority
              />
            </div>
          </div>

          {/* Get Started Section */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-teal-100">
                <Upload className="h-6 w-6 text-teal-600" />
              </div>
              <h2 className="text-xl font-bold">Get Start Grading</h2>
            </div>
            
            <p className="text-gray-600 mb-8">
              Click add button to start grading. Drag and drop your assignment brief and your answers.
            </p>

            <div 
              onClick={() => setIsUploadDialogOpen(true)}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-teal-500 transition-colors cursor-pointer"
            >
              <div className="p-3 rounded-full bg-teal-100">
                <Plus className="h-6 w-6 text-teal-600" />
              </div>
              <p className="text-gray-600">Click to upload or drag and drop your files</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}