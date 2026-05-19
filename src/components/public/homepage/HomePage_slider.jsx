import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 1. IMPORT LINK
import { ChevronLeft, ChevronRight } from "lucide-react"; 
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-gray-100 font-sans">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
          }`}
        >
          <img
            src={slide.image}
            alt="SuK Hero"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10 flex items-center">
            <div className="max-w-7xl mx-auto px-10 md:px-20 w-full">
              <div className="bg-white/20 backdrop-blur-md p-10 md:p-14 rounded-[40px] max-w-lg text-black shadow-2xl border border-white/30 animate-in fade-in zoom-in duration-700">
                <h2 className="text-4xl md:text-5xl font-[900] leading-tight uppercase tracking-tighter italic">
                  {slide.title}
                </h2>
                <p className="mt-4 mb-8 text-lg md:text-xl font-bold opacity-80 leading-snug">
                  {slide.subtitle}
                </p>

                <div className="flex gap-4">
                  {/* 2. LINK 'BUY NOW' TO SHOP */}
                  <Link 
                    to="/shop" 
                    className="bg-[#fbb03b] text-black font-black px-8 py-3.5 rounded-xl hover:bg-orange-500 transition-all shadow-lg active:scale-95 uppercase text-xs tracking-widest flex items-center justify-center"
                  >
                    Buy Now
                  </Link>

                  {/* 3. LINK 'SELL NOW' TO SETUP STORE */}
                  <Link 
                    to="/setup-store" 
                    className="bg-white text-black font-bold px-8 py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 uppercase text-xs tracking-widest flex items-center justify-center"
                  >
                    Sell Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ARROWS */}
      <button onClick={prevSlide} className="absolute top-1/2 left-6 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10">
        <ChevronLeft size={24} />
      </button>

      <button onClick={nextSlide} className="absolute top-1/2 right-6 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10">
        <ChevronRight size={24} />
      </button>

      {/* PAGINATION */}
      <div className="absolute bottom-8 w-full flex justify-center gap-3 z-30">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer shadow-sm ${
              index === current ? "w-10 h-2 bg-[#fbb03b]" : "w-3 h-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}