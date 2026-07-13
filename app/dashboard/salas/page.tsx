"use client";

import { useState, useEffect } from "react";
import { Plus, Users, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface Sala {
  id: string;
  nombre: string;
  codigo: string;
  participantes: number;
}

export default function SalasPage() {
  const router = useRouter();

  const [salas, setSalas] = useState<Sala[]>([]);
  const [cargando, setCargando] = useState(true);
  const [nombreSala, setNombreSala] = useState("");
  const [codigoSala, setCodigoSala] = useState("");

  useEffect(() => {
    cargarSalas();
  }, []);

  const cargarSalas = async () => {
    setCargando(true);
    const res = await fetch("/api/salas");
    console.log("Status:", res.status);
     const data = await res.json();
    console.log("Respuesta API:", data);
    if (res.ok) {
      setSalas(data);
    }
    setCargando(false);
  };

  const crearSala = async () => {
    if (!nombreSala.trim()) return;

    const res = await fetch("/api/salas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombreSala }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      alert(error ?? "Error al crear la sala");
      return;
    }

    setNombreSala("");
    cargarSalas();
  };

  const unirseSala = async () => {
    if (!codigoSala.trim()) return;

    const res = await fetch("/api/salas/unirse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo: codigoSala }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      alert(error ?? "Sala no encontrada");
      return;
    }

    const sala = await res.json();
    console.log("Respuesta API:", sala);
    router.push(`/dashboard/salas/${sala.id}`);
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold">Salas de Estudio</h1>
        <p className="text-muted-foreground mt-2">
          Crea una sala o únete mediante un código.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-6 bg-card">
          <h2 className="font-semibold text-xl mb-4">Crear Sala</h2>
          <input
            value={nombreSala}
            onChange={(e) => setNombreSala(e.target.value)}
            placeholder="Nombre de la sala"
            className="w-full border rounded-xl p-3 bg-background"
          />
          <button
            onClick={crearSala}
            className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground"
          >
            <Plus size={18} />
            Crear Sala
          </button>
        </div>

        <div className="border rounded-2xl p-6 bg-card">
          <h2 className="font-semibold text-xl mb-4">Unirse a una Sala</h2>
          <input
            value={codigoSala}
            onChange={(e) => setCodigoSala(e.target.value)}
            placeholder="Código de sala"
            className="w-full border rounded-xl p-3 bg-background"
          />
          <button
            onClick={unirseSala}
            className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground"
          >
            <Search size={18} />
            Unirse
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Mis Salas</h2>

        {cargando ? (
          <p className="text-muted-foreground">Cargando salas...</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {salas.map((sala) => (
              <div
                key={sala.id}
                className="border rounded-2xl p-5 bg-card hover:border-primary transition cursor-pointer"
                onClick={() => router.push(`/dashboard/salas/${sala.id}`)}
              >
                <h3 className="font-semibold text-lg">{sala.nombre}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Código: {sala.codigo}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Users size={18} />
                  {sala.participantes} participantes
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}