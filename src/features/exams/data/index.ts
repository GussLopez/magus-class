import { Exam } from "../types/exam.types";

export const mockExams: Exam[] = [
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