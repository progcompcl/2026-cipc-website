import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Foto {
  src: string;
  alt: string;
}

interface ImpactoCarouselProps {
  fotos: Foto[];
}

const ImpactoCarousel: React.FC<ImpactoCarouselProps> = ({ fotos }) => {
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
              loading={index === 0 ? "eager" : "lazy"}
              fetchpriority={index === 0 ? "high" : "auto"}
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
