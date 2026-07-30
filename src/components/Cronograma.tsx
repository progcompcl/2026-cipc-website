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

interface MaterialFile {
  name: string;
  path: string;
}

interface Dia {
  dia: string;
  temas: string[];
  profesor: string | null;
  especial?: boolean;
  nota?: string;
  material?: MaterialFile[];
}

interface Semana {
  dias: Dia[];
}

// ---- Horarios por nivel ----

const horariosInicial: Horario[] = [
  { actividad: "Clase",           s1: "09:00 - 10:40", s2: "09:00 - 10:40" },
  { actividad: "Coffee Break",    s1: "10:40 - 11:00", s2: "10:40 - 11:00" },
  { actividad: "Clase",           s1: "11:00 - 12:20", s2: "11:00 - 12:00" },
  { actividad: "Almuerzo",        s1: "12:20 - 13:30", s2: "12:00 - 13:30" },
  { actividad: "Contest",         s1: "13:30 - 18:30", s2: "13:30 - 18:30" },
];

const horariosAvanzado: Horario[] = [
  { actividad: "Clase",           s1: "09:00 - 11:00", s2: "09:00 - 11:00" },
  { actividad: "Coffee Break",    s1: "11:00 - 11:20", s2: "11:00 - 11:20" },
  { actividad: "Clase",           s1: "11:20 - 12:20", s2: "11:20 - 12:00" },
  { actividad: "Almuerzo",        s1: "12:20 - 13:30", s2: "12:00 - 13:30" },
  { actividad: "Contest",         s1: "13:30 - 18:30", s2: "13:30 - 18:30" },
];

// ---- Itinerarios ----

const inicial: Semana = {
  dias: [
    { dia: "Lunes 20",     temas: ["C++"],                                                 profesor: "Benjamín Letelier", nota: "Acreditación 8:30 → Ceremonia de apertura → Foto grupal → Clase", material: [{ name: "Clase 1", path: "/material/inicial/2026-07-20/Clase 1.pdf" }] },
    { dia: "Martes 21",    temas: ["Complejidad Algorítmica", "Pilas, colas, set y map"],  profesor: "Alex Blanchard", material: [{ name: "Clase 2", path: "/material/inicial/2026-07-21/slides.pdf" }] },
    { dia: "Miércoles 22", temas: ["Sorting y greedy", "Búsqueda binaria"],                profesor: "Blaz Korecic", material: [{ name: "Slides", path: "/material/inicial/2026-07-22/slides.pdf" }, { name: "busqueda-binaria.cpp", path: "/material/inicial/2026-07-22/busqueda-binaria.cpp" }, { name: "impresoras.cpp", path: "/material/inicial/2026-07-22/impresoras.cpp" }] },
    { dia: "Jueves 23",    temas: ["Programación Dinámica"],                               profesor: "Constanza Vásquez", nota: "Evento sponsor oro durante la tarde.", material: [{ name: "Slides", path: "/material/inicial/2026-07-23/slides.pdf" }] },
    { dia: "Viernes 24",   temas: ["Resolución de Problemas"],                             profesor: "Ignacio Muñoz", nota: "Charla sponsor TopSort durante clases. Actividades hasta las 17:30.", material: [{ name: "Slides", path: "/material/inicial/2026-07-24/slides.pdf" }] },
    { dia: "Sábado 25",    temas: ["Choripanada", "Paseo en barco"],                        profesor: null, especial: true, nota: "Cortesía de la organización. Sin costo para los participantes." },
    { dia: "Domingo 26",   temas: ["Descanso"],                                            profesor: null, especial: true },
    { dia: "Lunes 27",     temas: ["Brute force", "Matemáticas"],                          profesor: "Cristian Nettle", material: [{ name: "Slides", path: "/material/inicial/2025-07-27/slides.pdf" }]  },
    { dia: "Martes 28",    temas: ["Grafos I"],                                            profesor: "Nicolas Rojas", material: [{ name: "Slides", path: "/material/inicial/2025-07-28/slides.pdf" }]  },
    { dia: "Miércoles 29", temas: ["Resolución de Problemas"],                             profesor: "Cristian Nettle", nota: "Charla sponsor Neuralworks en la tarde." },
    { dia: "Jueves 30",    temas: ["Grafos II"],                                           profesor: "Alex Blanchard", material: [{ name: "Slides", path: "/material/inicial/2025-07-30/slides.pdf" }] },
    { dia: "Viernes 31",   temas: ["Cierre"],                                              profesor: null, especial: true, nota: "Actividades hasta las 13:30" },
  ],
};

const avanzado: Semana = {
  dias: [
    { dia: "Lunes 20",     temas: ["Algoritmos randomizados"],                             profesor: "Sebastian Torrealba", nota: "Acreditación 8:30 → Ceremonia de apertura → Foto grupal → Clase", material: [{ name: "Clase 1", path: "/material/avanzado/2026-07-20/Clase 1.pdf" }] },
    { dia: "Martes 21",    temas: ["EDD's persistentes"],                                  profesor: "Benjamin Letelier", material: [{ name: "Clase 2", path: "/material/avanzado/2026-07-21/slides.pdf?v=2" }] },
    { dia: "Miércoles 22", temas: ["Prefix Function y Aho-Corasick"],                     profesor: "Ignacio Muñoz", material: [{ name: "Clase 3", path: "/material/avanzado/2026-07-22/slides.pdf" }] },
    { dia: "Jueves 23",    temas: ["Programación Dinámica Avanzada"],                      profesor: "Blaz Korecic", nota: "Evento sponsor oro durante la tarde.", material: [{ name: "Slides", path: "/material/avanzado/2026-07-23/slides.pdf" }] },
    { dia: "Viernes 24",   temas: ["Sqrt tricks y Algoritmos offline"],                    profesor: "Abner Vidal", nota: "Charla sponsor TopSort durante clases. Actividades hasta las 17:30.", material: [{ name: "Slides", path: "/material/avanzado/2025-07-24/main.pdf" }]  },
    { dia: "Sábado 25",    temas: ["Choripanada", "Paseo en barco"],                        profesor: null, especial: true, nota: "Cortesía de la organización. Sin costo para los participantes." },
    { dia: "Domingo 26",   temas: ["Descanso"],                                            profesor: null, especial: true },
    { dia: "Lunes 27",     temas: ["Teoria de Juegos"],                                    profesor: "Marcelo Lemus", material: [{ name: "Slides", path: "/material/avanzado/2025-07-27/slides.pdf" }]  },
    { dia: "Martes 28",    temas: ["Flujo"],                                               profesor: "Abner Vidal", material: [{ name: "Slides", path: "/material/avanzado/2025-07-28/slides.pdf" }]  },
    { dia: "Miércoles 29", temas: ["Resolución de Problemas"],                             profesor: "Marcelo Lemus", nota: "Charla sponsor Neuralworks en la tarde." },
    { dia: "Jueves 30",    temas: ["Geometría Computacional"],                             profesor: "Sebastian Torrealba", material: [{ name: "Slides", path: "/material/avanzado/2025-07-30/slides.pdf" }]  },
    { dia: "Viernes 31",   temas: ["Cierre"],                                              profesor: null, especial: true, nota: "Actividades hasta las 13:30" },
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
                  dia.material && dia.material.length > 0 ? (
                    <div className="flex flex-col items-end gap-1">
                      {dia.material.map((m, i) => (
                        <a
                          key={i}
                          href={m.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline text-primary hover:text-primary/80"
                        >
                          {m.name}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Próximamente</span>
                  )
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
        El primer día, las actividades inician a las 8:30 con la acreditación, seguidas de la ceremonia de apertura y la foto grupal del campamento.
      </p>
      <p className="mt-4 text-sm">
        El sábado 25 se realizará una choripanada en horario de almuerzo y un paseo en barco durante la tarde. Ambas actividades son cortesía de la organización y no tienen costo para los participantes.
      </p>
      <p className="mt-4 text-sm">
        El último día, viernes 31 de julio, las actividades finalizarán a las 13:30 después del almuerzo.
      </p>

      <TablaItinerario semana={itinerario} />
    </div>
  );
}
