import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Horario {
  actividad: string;
  s1: string;
  s2: string;
}

interface Dia {
  dia: string;
  temas: string[];
  profesor: string | null;
  especial?: boolean;
  nota?: string;

}

interface Semana {
  dias: Dia[];
}

// ---- Horarios por nivel ----

const horariosInicial: Horario[] = [
  { actividad: "Clase",     s1: "09:00 - 10:40", s2: "09:00 - 10:40" },
  { actividad: "Coffee Break",    s1: "10:40 - 11:00", s2: "10:40 - 11:00" },
  { actividad: "Clase",     s1: "11:00 - 12:20", s2: "11:00 - 12:00" },
  { actividad: "Almuerzo",  s1: "12:20 - 13:30", s2: "12:00 - 13:30" },
  { actividad: "Contest",   s1: "13:30 - 18:30", s2: "13:30 - 18:30" },
];

const horariosAvanzado: Horario[] = [
  { actividad: "Clase",     s1: "09:00 - 11:00", s2: "09:00 - 11:00" },
  { actividad: "Coffee Break",    s1: "11:00 - 11:20", s2: "11:00 - 11:20" },
  { actividad: "Clase",     s1: "11:20 - 12:20", s2: "11:20 - 12:00" },
  { actividad: "Almuerzo",  s1: "12:20 - 13:30", s2: "12:00 - 13:30" },
  { actividad: "Contest",   s1: "13:30 - 18:30", s2: "13:30 - 18:30" },
];

// ---- Itinerarios ----

const inicial: Semana = {
  dias: [
    { dia: "Lunes 20",     temas: ["Complejidad Algorítmica y C++"],        profesor: null },
    { dia: "Martes 21",    temas: ["Sorting y greedy", "Búsqueda binaria"], profesor: null },
    { dia: "Miércoles 22", temas: ["Pilas y colas", "Set y map"],           profesor: null },
    { dia: "Jueves 23",    temas: ["Programación Dinámica"],                profesor: null },
    { dia: "Viernes 24",   temas: ["Resolución de Problemas"],              profesor: null, nota: "Actividades hasta las 16:30" },
    { dia: "Sábado 25",    temas: ["Descanso"],  profesor: null, especial: true, nota: "Actividad Recreativa Sorpresa" },
    { dia: "Domingo 26",   temas: ["Descanso"],                             profesor: null, especial: true },
    { dia: "Lunes 27",     temas: ["Brute force", "Matemáticas"],           profesor: null },
    { dia: "Martes 28",    temas: ["Grafos I"],                             profesor: null },
    { dia: "Miércoles 29", temas: ["Resolución de Problemas"],              profesor: null },
    { dia: "Jueves 30",    temas: ["Grafos II"],                            profesor: null },
    { dia: "Viernes 31",   temas: ["Cierre"],                               profesor: null, especial: true, nota: "Actividades hasta las 13:30" },
  ],
};

const avanzado: Semana = {
  dias: [
    { dia: "Lunes 20",     temas: ["Divide & Conquer Aplicado"],                  profesor: null },
    { dia: "Martes 21",    temas: ["EDD's persistentes"],                         profesor: null },
    { dia: "Miércoles 22", temas: ["Hashing y Prefix Function", "Aho-Corasick"],  profesor: null },
    { dia: "Jueves 23",    temas: ["Programación Dinámica Avanzada"],             profesor: null },
    { dia: "Viernes 24",   temas: ["Sqrt tricks y Algoritmos offline"],           profesor: null, nota: "Actividades hasta las 16:30" },
    { dia: "Sábado 25",    temas: ["Descanso"],  profesor: null, especial: true, nota: "Actividad Recreativa Sorpresa" },
    { dia: "Domingo 26",   temas: ["Descanso"],                                   profesor: null, especial: true },
    { dia: "Lunes 27",     temas: ["Aritmética Modular, T. de Números,", "T. de Juegos"], profesor: null },
    { dia: "Martes 28",    temas: ["Flujo en Redes"],                                     profesor: null },
    { dia: "Miércoles 29", temas: ["Resolución de Problemas"],                            profesor: null },
    { dia: "Jueves 30",    temas: ["Geometría"],                                          profesor: null },
    { dia: "Viernes 31",   temas: ["Cierre"],                                             profesor: null, especial: true, nota: "Actividades hasta las 13:30" },
  ],
};

// ---- Componentes ----

function TablaHorario({ horarios }: { horarios: Horario[] }) {
  return (
    <Table>
      <TableCaption>Horario de actividades diarias</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Actividad</TableHead>
          <TableHead><div>Semana 1</div><div className="font-normal text-muted-foreground">Universidad San Sebastián</div></TableHead>
          <TableHead><div>Semana 2</div><div className="font-normal text-muted-foreground">Universidad Austral de Chile</div></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {horarios.map((h, i) => (
          <TableRow key={i}>
            <TableCell>{h.actividad}</TableCell>
            <TableCell>{h.s1}</TableCell>
            <TableCell>{h.s2}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TablaItinerario({ semana }: { semana: Semana }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Itinerario</h2>
      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>Día</TableHead>
            <TableHead>Temas</TableHead>
            <TableHead>Profesor</TableHead>
            <TableHead className="text-right">Material</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {semana.dias.map((dia) => (
            <TableRow key={dia.dia} className={dia.especial ? "text-muted-foreground" : ""}>
              <TableCell className="font-medium whitespace-nowrap">{dia.dia}</TableCell>
              <TableCell className="whitespace-normal">
                <>
                  {dia.temas.map((t, i) => (
                    <div key={i} className={dia.especial ? "italic" : ""}>{t}</div>
                  ))}
                  {dia.nota && (
                    <div className="text-xs text-muted-foreground mt-1">{dia.nota}</div>
                  )}
                </>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {dia.especial ? "" : (
                  <span className="text-muted-foreground">{dia.profesor ?? "Próximamente"}</span>
                )}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {dia.especial ? "" : (
                  <span className="text-muted-foreground">Próximamente</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default function Cronograma() {
  const [nivel, setNivel] = useState<"inicial" | "avanzado">("inicial");

  const horarios  = nivel === "inicial" ? horariosInicial : horariosAvanzado;
  const itinerario = nivel === "inicial" ? inicial : avanzado;

  return (
    <div>
      <div className="inline-flex rounded-lg bg-muted p-1 mb-8" role="tablist">
        {(["inicial", "avanzado"] as const).map((n) => (
          <button
            key={n}
            role="tab"
            aria-selected={nivel === n}
            onClick={() => setNivel(n)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              nivel === n
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Nivel {n === "inicial" ? "Inicial" : "Avanzado"}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Horario de actividades</h2>
      <TablaHorario horarios={horarios} />

      <p className="mt-4 text-sm">
        El primer día, las actividades inician a las 8:30 para la entrega de credenciales y acreditación.
      </p>
      <p className="mt-4 text-sm">
        El viernes 24 de julio las actividades finalizan a las 16:30.
      </p>
      <p className="mt-4 text-sm">
        El último día, viernes 31 de julio, las actividades finalizarán a las 13:30 después del almuerzo.
      </p>

      <TablaItinerario semana={itinerario} />
    </div>
  );
}
