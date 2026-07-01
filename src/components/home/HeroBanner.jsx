import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "../../data/mockData";
import Button from "../ui/Button";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % HERO_SLIDES.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative overflow-hidden rounded-3xl" aria-label="Promociones">
      <div className="relative aspect-[16/7] min-h-[280px] sm:min-h-[360px]">
        {HERO_SLIDES.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16">
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-3 max-w-md text-base text-white/90 sm:text-lg">
            {slide.subtitle}
          </p>
          <div className="mt-6">
            <Link to={slide.link}>
              <Button size="lg">{slide.cta}</Button>
            </Link>
          </div>
        </div>

        <button
          onClick={() => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/30"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrent((c) => (c + 1) % HERO_SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/30"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
