import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface CarouselImage {
  src: string;
  description: string;
  position: string; // CSS object-position value, e.g. "50% 80%"
}

interface CarouselProps {
  images: CarouselImage[];
}

const CarouselComponent: React.FC<CarouselProps> = ({ images }) => {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, playOnInit: true }),
  );

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[autoplayPlugin.current]}
      className="w-full h-[220px] sm:h-[350px] relative"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="h-full">
            <img
              src={image.src}
              alt={image.description}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="w-full h-full object-cover"
              style={{ objectPosition: image.position }}
            />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
            <span className="absolute bottom-0 left-0 w-full p-4 text-white text-lg font-semibold z-1">
              {image.description}
            </span>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 size-12 rounded-full bg-white/50 flex justify-center items-center" onClickCapture={() => autoplayPlugin.current.stop()} />
      <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 size-12 rounded-full bg-white/50 flex justify-center items-center" onClickCapture={() => autoplayPlugin.current.stop()} />
    </Carousel>
  );
};

export default CarouselComponent;
