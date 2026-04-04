import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import foto1 from "../assets/fotos-campamento/p1110247.jpg";
import foto2 from "../assets/fotos-campamento/p1110254.jpg";
import foto3 from "../assets/fotos-campamento/p1110363.jpg";
import foto4 from "../assets/fotos-campamento/p1110423.jpg";

const fotos = [
  { src: foto1.src, alt: "CIPC 2025 — sesión de clases" },
  { src: foto2.src, alt: "CIPC 2025 — trabajo en equipo" },
  { src: foto3.src, alt: "CIPC 2025 — sesión práctica" },
  { src: foto4.src, alt: "CIPC 2025 — competencia" },
];

const ImpactoCarousel: React.FC = () => {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3500, playOnInit: true }),
  );

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[autoplayPlugin.current]}
      className="w-full h-[340px] relative overflow-hidden"
    >
      <CarouselContent>
        {fotos.map((foto, index) => (
          <CarouselItem key={index} className="h-full">
            <img
              src={foto.src}
              alt={foto.alt}
              className="w-full h-full object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="absolute top-1/2 left-4 -translate-y-1/2 size-10 rounded-full bg-white/50 flex justify-center items-center"
        onClickCapture={() => autoplayPlugin.current.stop()}
      />
      <CarouselNext
        className="absolute top-1/2 right-4 -translate-y-1/2 size-10 rounded-full bg-white/50 flex justify-center items-center"
        onClickCapture={() => autoplayPlugin.current.stop()}
      />
    </Carousel>
  );
};

export default ImpactoCarousel;
