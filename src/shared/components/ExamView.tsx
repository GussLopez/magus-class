"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  Target,
  X,
} from "lucide-react";
import { cn } from "@/src/shared/lib/utils";

// Types
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Exam {
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

// Mock data - 2 exámenes de diferentes tópicos
const mockExams: Exam[] = [
  {
    id: "1",
    title: "Fundamentos de Inteligencia Artificial",
    description: "Examen basado en el contenido del PDF: Introducción a la IA",
    pdfSource: "introduccion_ia.pdf",
    questions: [
      {
        id: "q1",
        question: "¿Cuál es la definición más precisa de Inteligencia Artificial?",
        options: [
          "Programas que ejecutan tareas repetitivas",
          "Sistemas que simulan procesos de inteligencia humana",
          "Robots con forma humana",
          "Computadoras muy rápidas",
        ],
        correctAnswer: 1,
      },
      {
        id: "q2",
        question: "¿Qué tipo de aprendizaje automático utiliza datos etiquetados?",
        options: [
          "Aprendizaje no supervisado",
          "Aprendizaje por refuerzo",
          "Aprendizaje supervisado",
          "Aprendizaje profundo",
        ],
        correctAnswer: 2,
      },
      {
        id: "q3",
        question: "¿Cuál de las siguientes NO es una aplicación de la IA?",
        options: [
          "Reconocimiento de voz",
          "Conducción autónoma",
          "Calculadora básica",
          "Traducción automática",
        ],
        correctAnswer: 2,
      },
      {
        id: "q4",
        question: "¿Qué es una red neuronal artificial?",
        options: [
          "Un tipo de virus informático",
          "Un modelo computacional inspirado en neuronas biológicas",
          "Una red de computadoras conectadas",
          "Un sistema operativo",
        ],
        correctAnswer: 1,
      },
      {
        id: "q5",
        question: "¿Cuál es el objetivo principal del Machine Learning?",
        options: [
          "Reemplazar a los humanos",
          "Crear robots humanoides",
          "Permitir a las máquinas aprender de los datos",
          "Acelerar el procesamiento de archivos",
        ],
        correctAnswer: 2,
      },
    ],
    completed: false,
  },
  {
    id: "2",
    title: "Programación en Python",
    description: "Examen basado en el contenido del PDF: Python para Principiantes",
    pdfSource: "python_basics.pdf",
    questions: [
      {
        id: "q1",
        question: "¿Cuál es la sintaxis correcta para definir una función en Python?",
        options: [
          "function mi_funcion():",
          "def mi_funcion():",
          "func mi_funcion():",
          "define mi_funcion():",
        ],
        correctAnswer: 1,
      },
      {
        id: "q2",
        question: "¿Qué estructura de datos en Python es inmutable?",
        options: [
          "Lista (list)",
          "Diccionario (dict)",
          "Tupla (tuple)",
          "Conjunto (set)",
        ],
        correctAnswer: 2,
      },
      {
        id: "q3",
        question: "¿Cómo se crea un comentario de una línea en Python?",
        options: [
          "// comentario",
          "/* comentario */",
          "# comentario",
          "-- comentario",
        ],
        correctAnswer: 2,
      },
      {
        id: "q4",
        question: "¿Cuál es el resultado de: print(type([1, 2, 3]))?",
        options: [
          "<class 'tuple'>",
          "<class 'list'>",
          "<class 'array'>",
          "<class 'set'>",
        ],
        correctAnswer: 1,
      },
      {
        id: "q5",
        question: "¿Qué método se usa para agregar un elemento al final de una lista?",
        options: [
          "add()",
          "insert()",
          "append()",
          "push()",
        ],
        correctAnswer: 2,
      },
      {
        id: "q6",
        question: "¿Cuál es el operador para comparar igualdad en Python?",
        options: [
          "=",
          "==",
          "===",
          "equals()",
        ],
        correctAnswer: 1,
      },
    ],
    completed: false,
  },
];

// Timer hook
function useTimer(isRunning: boolean, initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = useCallback(() => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [seconds]);

  return { seconds, formatTime };
}

// Exam Card Component
function ExamCard({
  exam,
  onClick,
}: {
  exam: Exam;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:bg-white/10"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl",
              exam.completed
                ? "bg-green-600/20 border border-green-500/30"
                : "bg-blue-600/20 border border-blue-500/30"
            )}
          >
            {exam.completed ? (
              <CheckCircle2 className="h-7 w-7 text-green-400" />
            ) : (
              <FileText className="h-7 w-7 text-blue-400" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
              {exam.title}
            </h3>
            <p className="mt-1 text-sm text-blue-100/60">{exam.description}</p>
            <p className="mt-2 text-xs text-blue-100/40">
              📄 {exam.pdfSource} • {exam.questions.length} preguntas
            </p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-blue-100/40 group-hover:text-blue-400 transition-colors" />
      </div>

      {exam.completed && (
        <div className="mt-4 flex items-center gap-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-blue-100/80">
              {exam.score}/{exam.totalQuestions} correctas (
              {Math.round((exam.score! / exam.totalQuestions!) * 100)}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-100/80">{exam.completionTime}</span>
          </div>
        </div>
      )}
    </button>
  );
}

// Exam Modal/CRUD Component
function ExamModal({
  exam,
  onClose,
  onComplete,
}: {
  exam: Exam;
  onClose: () => void;
  onComplete: (score: number, time: string, answers: Record<string, number>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>(
    exam.userAnswers || {}
  );
  const { formatTime } = useTimer(!exam.completed);
  const [isReviewing] = useState(exam.completed);

  const allAnswered = exam.questions.every((q) => answers[q.id] !== undefined);

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (isReviewing) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleFinish = () => {
    if (!allAnswered) return;
    const score = exam.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
    onComplete(score, formatTime(), answers);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#06142d] via-[#081b3c] to-[#0a2250] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">{exam.title}</h2>
            <p className="text-sm text-blue-100/60 mt-1">
              {exam.questions.length} preguntas • {exam.pdfSource}
            </p>
          </div>
          {!isReviewing && (
            <div className="flex items-center gap-2 bg-blue-600/20 px-4 py-2 rounded-xl border border-blue-500/30">
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="font-mono text-lg text-white">{formatTime()}</span>
            </div>
          )}
          {isReviewing && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-600/20 px-4 py-2 rounded-xl border border-green-500/30">
                <Trophy className="h-5 w-5 text-green-400" />
                <span className="text-white">
                  {exam.score}/{exam.totalQuestions} (
                  {Math.round((exam.score! / exam.totalQuestions!) * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-600/20 px-4 py-2 rounded-xl border border-blue-500/30">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="text-white">{exam.completionTime}</span>
              </div>
            </div>
          )}
        </div>

        {/* Questions */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {exam.questions.map((question, qIndex) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className={cn(
                  "rounded-2xl border p-6 transition-all",
                  isReviewing
                    ? isCorrect
                      ? "border-green-500/30 bg-green-600/10"
                      : "border-red-500/30 bg-red-600/10"
                    : "border-white/10 bg-white/5"
                )}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                      isReviewing
                        ? isCorrect
                          ? "bg-green-600/30 text-green-300"
                          : "bg-red-600/30 text-red-300"
                        : "bg-blue-600/30 text-blue-300"
                    )}
                  >
                    {qIndex + 1}
                  </span>
                  <p className="text-lg text-white font-medium">
                    {question.question}
                  </p>
                </div>

                <div className="space-y-3 ml-12">
                  {question.options.map((option, oIndex) => {
                    const isSelected = userAnswer === oIndex;
                    const isCorrectOption = question.correctAnswer === oIndex;

                    let optionStyles = "border-white/10 bg-white/5 hover:bg-white/10";
                    
                    if (isReviewing) {
                      if (isCorrectOption) {
                        optionStyles = "border-green-500/50 bg-green-600/20";
                      } else if (isSelected && !isCorrectOption) {
                        optionStyles = "border-red-500/50 bg-red-600/20";
                      } else {
                        optionStyles = "border-white/10 bg-white/5 opacity-60";
                      }
                    } else if (isSelected) {
                      optionStyles = "border-blue-500/50 bg-blue-600/20";
                    }

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelectAnswer(question.id, oIndex)}
                        disabled={isReviewing}
                        className={cn(
                          "w-full text-left rounded-xl border p-4 transition-all flex items-center gap-3",
                          optionStyles,
                          !isReviewing && "cursor-pointer"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                            isReviewing && isCorrectOption
                              ? "border-green-400 text-green-400"
                              : isReviewing && isSelected && !isCorrectOption
                              ? "border-red-400 text-red-400"
                              : isSelected
                              ? "border-blue-400 text-blue-400 bg-blue-600/30"
                              : "border-white/30 text-white/60"
                          )}
                        >
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span
                          className={cn(
                            "text-sm",
                            isReviewing && isCorrectOption
                              ? "text-green-300 font-medium"
                              : isReviewing && isSelected && !isCorrectOption
                              ? "text-red-300"
                              : "text-white"
                          )}
                        >
                          {option}
                        </span>
                        {isReviewing && isCorrectOption && (
                          <CheckCircle2 className="ml-auto h-5 w-5 text-green-400" />
                        )}
                        {isReviewing && isSelected && !isCorrectOption && (
                          <XCircle className="ml-auto h-5 w-5 text-red-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/5">
          <div className="flex items-center gap-2 text-sm text-blue-100/60">
            <Target className="h-4 w-4" />
            <span>
              {Object.keys(answers).length}/{exam.questions.length} respondidas
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-white hover:bg-white/5 transition-colors"
            >
              <X className="h-4 w-4" />
              Cerrar
            </button>
            {!isReviewing && (
              <button
                onClick={handleFinish}
                disabled={!allAnswered}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-all",
                  allAnswered
                    ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                )}
              >
                <CheckCircle2 className="h-4 w-4" />
                Finalizar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main ExamView Component
export function ExamView() {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const handleOpenExam = (exam: Exam) => {
    setSelectedExam(exam);
  };

  const handleCloseExam = () => {
    setSelectedExam(null);
  };

  const handleCompleteExam = (
    score: number,
    time: string,
    answers: Record<string, number>
  ) => {
    if (!selectedExam) return;

    setExams((prev) =>
      prev.map((exam) =>
        exam.id === selectedExam.id
          ? {
              ...exam,
              completed: true,
              completionTime: time,
              score,
              totalQuestions: exam.questions.length,
              userAnswers: answers,
            }
          : exam
      )
    );

    // Update selected exam with completion data
    setSelectedExam((prev) =>
      prev
        ? {
            ...prev,
            completed: true,
            completionTime: time,
            score,
            totalQuestions: prev.questions.length,
            userAnswers: answers,
          }
        : null
    );
  };

  const completedCount = exams.filter((e) => e.completed).length;
  const totalQuestions = exams.reduce((acc, e) => acc + e.questions.length, 0);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#06142d] via-[#081b3c] to-[#0a2250] text-white">
      <div className="w-full px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-600/20">
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">Exámenes</h1>
              <p className="mt-2 text-lg text-blue-100/70">
                Practica con exámenes generados a partir del contenido de tus PDFs
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{exams.length}</p>
                <p className="text-sm text-blue-100/60">Exámenes disponibles</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600/20">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {completedCount}/{exams.length}
                </p>
                <p className="text-sm text-blue-100/60">Completados</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20">
                <Target className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalQuestions}</p>
                <p className="text-sm text-blue-100/60">Preguntas totales</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exam List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">
            Tus exámenes
          </h2>
          {exams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onClick={() => handleOpenExam(exam)}
            />
          ))}
        </div>

        {/* Empty state if no exams */}
        {exams.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-blue-600/10">
              <FileText className="h-16 w-16 text-blue-400" />
            </div>
            <h3 className="text-4xl font-bold">No hay exámenes disponibles</h3>
            <p className="mt-4 max-w-lg text-lg text-blue-100/60">
              Los exámenes se generan automáticamente a partir de los PDFs que
              subas al sistema.
            </p>
          </div>
        )}
      </div>

      {/* Exam Modal */}
      {selectedExam && (
        <ExamModal
          exam={selectedExam}
          onClose={handleCloseExam}
          onComplete={handleCompleteExam}
        />
      )}
    </div>
  );
}
