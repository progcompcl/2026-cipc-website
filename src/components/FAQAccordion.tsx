import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  data: {
    title: string;
    description: React.ReactNode;
  }[];
}

const accordionData: Props["data"] = [
  {
    title:
      "¿Es un campamento de verdad? ¿Vamos a acampar y programar a la luz de una fogata? ",
    description:
      "¡No! (aunque no sería mala idea). El campamento es una escuela de invierno entre clases y sesiones prácticas en equipos. Típicamente, cada jornada dura todo el día, con clases en la mañana y sesiones prácticas en las tardes.",
  },
  {
    title: "¿Cuándo y dónde se realizará el campamento?",
    description: (
      <>
        <p>
          El campamento se realizará durante dos semanas en Julio de 2026, en la ciudad de Valdivia. 
        </p>
        {/*
        <p>
          Puedes encontrar más información en el <a href="/cronograma">cronograma</a>.
        </p>
        */}
      </>
    ),
  },
  {
    title: "¿Quiénes pueden participar?",
    description: (
      <p>
        El campamento está abierto a todos los interesados. Aunque está principalmente
        dirigido a estudiantes universitarios, también son bienvenidos estudiantes
        escolares y cualquier persona con interés en aprender.
      </p>
    ),
  },
  {
    title: "¿Hay conocimientos mínimos requeridos para participar?",
    description: (
      <>
        <p>
          No hay requisitos de entrada, quienes quieran pueden participar. Sin
          embargo, si quieres sacarle el jugo al campamento, debes tener algún
          dominio en algún lenguaje de programación (como C++, Java, o Python),
          y conocer algunos conceptos básicos de programación (bucles o
          for-loops, arreglos y listas, recursión, estructuras básicas,
          algoritmos básicos, etc.).
        </p>
        <p>
          Puedes ver nuestro canal de YouTube para aprender desde tópicos
          esenciales a avanzados y ver algunas de las clases de campamentos
          pasados!
        </p>
      </>
    ),
  },
  {
    title: "Me inscribí en el formulario, ¿tengo que hacer algo más?",
    description: (
      <p>
        No. Te notificaremos tras terminar las inscripciones, confirmando tu
        inscripción al campamento. Tras esa fecha y hasta el inicio del
        campamento, te enviaremos unos cuantos correos más con más información
        importante sobre el evento.
      </p>
    ),
  },
  {
    title: "¿Me puedo cambiar de nivel?",
    description: (
      <p>
        Te puedes cambiar de nivel libremente antes o durante el campamento. Es decir,
        si ves que la clase avanzada es muy difícil o la inicial es muy fácil, puedes
        cambiarte a la otra sin problemas. También puedes ir cambiando día a día según
        el tema que más te interese del <a href="/cronograma">cronograma</a>.
      </p>
    ),
  },
  {
    title:
      "¿Qué ocurre si no puedo asistir al campamento todos los días?",
    description: (
      <>
        <p>
          No hay problemas si no puedes asistir a todas las actividades del
          campamento, pero el cronograma está diseñado para aprender lo máximo
          posible al ir todos los días.
        </p>
      </>
    ),
  },
  {
    title: "No tengo una o dos personas para armar un equipo, ¿qué hago?",
    description: (
      <p>
        Puedes participar de forma individual, en pareja o en equipo de tres
        personas. Si no tienes equipo completo, en el campamento haremos nuestro
        mejor esfuerzo para que todos estén en uno.
      </p>
    ),
  },
  {
    title: "¿Tengo que llevar computador?",
    description: (
      <p>
        Para las sesiones prácticas usaremos los computadores de los laboratorios de la
        universidad, por lo que no es necesario llevar uno. Sin embargo, si prefieres
        usar tu computador personal porque te resulta más cómodo, puedes traerlo sin 
        problema.
      </p>
    ),
  },
  {
    title: "¿La inscripción tiene costo?",
    description: (
      <p>
        La inscripción y participación en el campamento son totalmente gratis.
      </p>
    ),
  },
  {
    title: "¿Y si no puedo costear el viaje o el hospedaje?",
    description: (
      <p>
        La Sociedad Chilena de Programación Competitiva ofrece becas destinadas
        a ayudar a costear transporte, hospedaje y alimentación para promover la
        participación de estudiantes de diversas instituciones y quienes tengan
        dificultades económicas para asistir al campamento. Más detalles <a href="/acerca">aquí</a>.
      </p>
    ),
  },
  {
    title:
      "¿Qué hay de la alimentación, transporte, y estadía durante el campamento?",
    description: (
      <>
        <p>
          Quienes participen en el campamento deben hacerse cargo de los gastos de
          alimentación, transporte y hospedaje durante los días del campamento.
        </p>
        <p>
          {/* El casino de la universidad estará disponible para comprar almuerzo a precios
          accesibles. */}
        </p>
      </>
    ),
  },
  {
    title:
      "Me estoy preparando para la Olimpiada Chilena de Informática o la IOI, ¿puedo inscribirme?",
    description: (
      <p>
        ¡Por supuesto! Eres igualmente bienvenid@, y esperamos que el campamento
        te sea de ayuda.
      </p>
    ),
  },
  {
    title: "¿Qué pasa si tengo más preguntas?",
    description: (
      <p>
        Para cualquier duda o consulta, puedes escribirnos a campamento@progcomp.cl
      </p>
    ),
  }
];
export default function FAQAccordion() {
  return (
    <BaseAccordion
      type="single"
      collapsible
      className="w-full prose-headings:my-0"
    >
      {accordionData.map((item, i) => {
        return (
          <AccordionItem
            value={`item-${i.toFixed()}`}
            key={`item-${i.toFixed()}`}
          >
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        );
      })}
    </BaseAccordion>
  );
}
