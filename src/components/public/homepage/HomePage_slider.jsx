import { useState, useEffect } from "react";
import slider from "../../../assets/images/Furniture.jpg";

const slides = [
  {
    id: 1,
    image: slider,
    title: "NEVER STOP TRADING",
    subtitle: "Push The Limit Of The IMPOSSIBLE",
  },
  {
    id: 2,
    image: slider,
    title: "STYLE YOUR SPACE",
    subtitle: "Comfort Meets Elegance",
  },
  {
    id: 3,
    image: slider,
    title: "MODERN LIVING",
    subtitle: "Upgrade Your Lifestyle",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt="slide"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute top-1/2 left-8 -translate-y-1/2 bg-white/20 backdrop-blur-md p-8 rounded-2xl max-w-sm text-black shadow-lg">
            <h2 className="text-2xl font-bold">
              {slide.title}
            </h2>
            <p className="mt-2 mb-4">
              {slide.subtitle}
            </p>

            <div className="flex gap-3">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                Buy Now
              </button>
              <button className="bg-white border px-4 py-2 rounded-md hover:bg-gray-100 transition">
                Sell Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}