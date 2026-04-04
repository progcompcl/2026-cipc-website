import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import image2025 from "../assets/anos-anteriores/2025-valparaiso.jpg";
import image2024 from "../assets/anos-anteriores/2024-concepcion.jpg";
import image2023 from "../assets/anos-anteriores/2023-valparaiso.jpg";
import image2019 from "../assets/anos-anteriores/2019-valdivia.jpg";
import image2018 from "../assets/anos-anteriores/2018-santiago.jpg";
import image2017 from "../assets/anos-anteriores/2017-concepcion.jpg";
import image2016 from "../assets/anos-anteriores/2016-la-serena.jpg";
import image2015 from "../assets/anos-anteriores/2015-valparaiso.jpg";

const descriptions: Record<string, string> = {
  "2025": "2025, Valparaíso",
  "2024": "2024, Concepción",
  "2023": "2023, Valparaíso",
  "2019": "2019, Valdivia",
  "2018": "2018, Santiago",
  "2017": "2017, Concepción",
  "2016": "2016, La Serena",
  "2015": "2015, Valparaíso",
};

const positions: Record<string, string> = {
  "2025": "object-[0%_50%]",
  "2024": "object-[0%_80%]",
  "2023": "object-[0%_40%]",
  "2019": "object-[0%_50%]",
  "2018": "object-[0%_80%]",
  "2017": "object-bottom",
  "2016": "object-[0%_80%]",
  "2015": "",
};

// Array of image data, sorted by year descending
const images = [
  {
    year: "2025",
    src: image2025.src,
    description: descriptions["2025"] || "",
    position: positions["2025"],
  },
  {
    year: "2024",
    src: image2024.src,
    description: descriptions["2024"] || "",
    position: positions["2024"],
  },
  {
    year: "2023",
    src: image2023.src,
    description: descriptions["2023"] || "",
    position: positions["2023"],
  },
  {
    year: "2019",
    src: image2019.src,
    description: descriptions["2019"] || "",
    position: positions["2019"],
  },
  {
    year: "2018",
    src: image2018.src,
    description: descriptions["2018"] || "",
    position: positions["2018"],
  },
  {
    year: "2017",
    src: image2017.src,
    description: descriptions["2017"] || "",
    position: positions["2017"],
  },
  {
    year: "2016",
    src: image2016.src,
    description: descriptions["2016"] || "",
    position: positions["2016"],
  },
  {
    year: "2015",
    src: image2015.src,
    description: descriptions["2015"] || "",
    position: positions["2015"],
  },
].sort((a, b) => Number(b.year) - Number(a.year));

const CarouselComponent: React.FC = () => {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, playOnInit: true }),
  );

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[autoplayPlugin.current]}
      className="w-full h-[350px] relative"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="h-full">
            <img
              src={image.src}
              alt={image.description}
              className={`w-full h-full object-cover ${image.position}`} // Apply object-cover and dynamic position
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
