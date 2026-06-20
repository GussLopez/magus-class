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
import { Button } from "@/src/shared/components/ui/button";


export default function Page() {
  return (
    <main className="min-h-screen dark:bg-[#0f172a] overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative px-6 md:px-16 py-24 flex flex-col lg:flex-row items-center justify-between gap-20">
        <div className="absolute top-0 left-0 w-75 h-75 bg-cyan-500/40 blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-75 h-75 bg-purple-500/40 blur-[120px]" />

        {/* Texto */}
        <div className="max-w-2xl relative z-10">
          
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Plataforma Universitaria con
              <span className="text-cyan-400"> IA</span>
            </h1>
          
          

          <p className="text-muted-foreground mt-8 text-lg leading-relaxed">
            Sube PDFs, apuntes y presentaciones para generar
            preguntas inteligentes, resúmenes automáticos,
            flashcards y exámenes con IA.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <a href="/login">
              <Button className="px-8 h-13 text-xl rounded-xl">
                Comenzar
              </Button>
            </a>

          </div>
        </div>

        {/* Card */}
        <div className="relative z-20">
          <div className="bg-white dark:bg-gray-900 border border-white/10 backdrop-blur-xl p-8 rounded-3xl w-87.5 shadow-2xl z-99">
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit className="text-cyan-400" size={35} />

              <div>
                <h2 className="font-bold text-xl">
                  Motor IA RAG
                </h2>

                <p className="text-muted-foreground text-sm">
                  Preguntas inteligentes
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted dark:bg-[#1e293b] p-4 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  Pregunta:
                </p>

                <p className="font-medium mt-1">
                  ¿Qué es Machine Learning?
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-400/20 p-4 rounded-xl">
                <p className="text-sm text-cyan-500 dark:text-cyan-300">
                  Respuesta IA:
                </p>

                <p className="text-sm mt-2 text-foreground">
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

            <FeatureCard
              icon={<GraduationCap size={35} />}
              title="Exámenes"
              description="Crea quizzes y prácticas."
            />

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