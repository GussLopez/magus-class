export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export type Exam = {
  id: string;
  title: string;
  description: string;
  pdfSource: string;
  questions: Question[];
  completed: boolean;
  completionTime?: string;
  score?: number;
  totalQuestions?: number;
  userAnswers?: Record<string, number>;
}