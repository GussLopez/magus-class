"use client";

import {
  BookOpen,
  BrainCircuit,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Users,
} from "lucide-react";

import Header from "../src/shared/components/Header";
import Footer from "../src/shared/components/Footer";
import FeatureCard from "../src/shared/components/FeatureCard";


export default function Page() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative px-6 md:px-16 py-24 flex flex-col lg:flex-row items-center justify-between gap-20">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/20 blur-[120px]" />

        {/* Texto */}
        <div className="max-w-2xl relative z-10">
          
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Plataforma Universitaria con
              <span className="text-cyan-400"> IA</span>
            </h1>
          
          

          <p className="text-gray-300 mt-8 text-lg leading-relaxed">
            Sube PDFs, apuntes y presentaciones para generar
            preguntas inteligentes, resúmenes automáticos,
            flashcards y exámenes con IA.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <a href="/login">
              <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-2xl font-bold">
                Comenzar
              </button>
            </a>

          </div>
        </div>

        {/* Card */}
        <div className="relative z-10">
          <div className="bg-white/10 border border-white/10 backdrop-blur-xl p-8 rounded-3xl w-[350px] shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit className="text-cyan-400" size={35} />

              <div>
                <h2 className="font-bold text-xl">
                  Motor IA RAG
                </h2>

                <p className="text-gray-400 text-sm">
                  Preguntas inteligentes
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1e293b] p-4 rounded-xl">
                <p className="text-sm text-gray-400">
                  Pregunta:
                </p>

                <p className="font-medium mt-1">
                  ¿Qué es Machine Learning?
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-400/20 p-4 rounded-xl">
                <p className="text-sm text-cyan-300">
                  Respuesta IA:
                </p>

                <p className="text-sm mt-2 text-gray-200">
                  Machine Learning es una rama de la IA
                  que aprende automáticamente con datos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-16 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Funciones principales
          </h2>

          <p className="text-gray-400 mt-4">
            Herramientas diseñadas para estudiantes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText size={35} />}
            title="Subida de documentos"
            description="Carga PDFs y apuntes automáticamente."
          />

          <FeatureCard
            icon={<BrainCircuit size={35} />}
            title="Preguntas con IA"
            description="Consulta cualquier tema con IA."
          />

          <FeatureCard
            icon={<BookOpen size={35} />}
            title="Flashcards"
            description="Genera tarjetas automáticas."
          />

          <a href="/dashboard/examenes">
            <FeatureCard
              icon={<GraduationCap size={35} />}
              title="Exámenes"
              description="Crea quizzes y prácticas."
            />
          </a>

          <FeatureCard
            icon={<LayoutDashboard size={35} />}
            title="Dashboard"
            description="Visualiza progreso académico."
          />

          <FeatureCard
            icon={<Users size={35} />}
            title="Salas de estudio"
            description="Comparte materiales con compañeros."
          />
        </div>
      </section>

      {/* DASHBOARD */}
      

      <Footer />
    </main>
  );
}