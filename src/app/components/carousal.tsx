import { useState, useEffect, useRef } from "react";

const slides = [
  {
    src: "/image/first1.jpg",
    title: '"We found a local plumber in 10 minutes — no calls, no hassle."',
    description:
      "BETTA helps families, businesses, and individuals connect with trusted local professionals — fast.",
    alt: " ",
  },
  {
    src: "/image/second.jpg",
    title: "Skilled? Get Hired.",
    description:
      "BETTA gives you a platform to earn, grow, and get recognized for your talent — whether you’re a carpenter, developer, or designer. ",
    alt: " ",
  },
  {
    src: "/image/thirddd.jpg",
    title: "Only the Best Get In.",
    description:
      "All service providers are verified, rated, and reviewed by real clients. BETTA puts quality and trust first.",
    alt: " ",
  },
  {
    src: "/img/pic4.jpg",
    title: "Get your services at your DoorStep",
    description: " ",
    alt: " ",
  },
];

export default function Carousel({ autoPlay = true, autoPlayInterval = 5000 }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const length = slides.length;

  const resetAutoPlay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (autoPlay) {
      timeoutRef.current = setTimeout(
        () => setCurrent((prev) => (prev + 1) % length),
        autoPlayInterval
      );
    }
  };

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, autoPlay]);

  const prev = () => {
    setCurrent((c) => (c - 1 + length) % length);
  };
  const next = () => {
    setCurrent((c) => (c + 1) % length);
  };

  const startX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
  };

  return (

    <div className="relative overflow-hidden w-full h-[700px] ">
      {/* Slides */}

      <div
        className="flex transition-transform duration-700"
        style={{ transform:`translateX(-${current * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="min-w-full h-[800px] relative flex-shrink-0 bg-cover bg-[center_20%]"
            style={{ backgroundImage:`url(${slide.src})`}}>
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent ">
              <div className="text-white bg-black/40 text-center px-5">
                <h2 className="text-2xl font-bold">{slide.title}</h2>
                <p className="text-lg mt-1">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
