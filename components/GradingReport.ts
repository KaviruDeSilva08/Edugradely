export interface GradingReport {
  assignment: string;
  rubric: string;
  answers: string;
  note: string;
  grade: string;
  score: number;
  feedback: string;
  rubricChart?: { name: string; value: number; color: string }[];
  answerComparisons?: {
    question: string;
    studentAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }[];
} 