import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { ChevronLeft, ChevronRight } from "lucide-react"; 

// Importing your specific banner images
import slider1 from "../../../assets/images/suk-slide3.jpeg";
import slider2 from "../../../assets/images/suk-slide1.jpeg";
import slider3 from "../../../assets/images/suk-slide2.jpeg";

const slides = [
  { id: 1, image: slider1 },
  { id: 2, image: slider2 },
  { id: 3, image: slider3 },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-play logic: changes slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[450px] md:h-[600px] lg:h-[750px] overflow-hidden bg-gray-100 font-sans">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* THE BANNER IMAGE */}
          <img
            src={slide.image}
            alt="SuK Marketplace Banner"
            className="w-full h-full object-cover" 
          />

          {/* INTERACTIVE BUTTONS OVERLAY - ALIGNED TO THE RIGHT */}
          <div className="absolute inset-0 z-20 flex items-end md:items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-20 w-full flex justify-center md:justify-end pb-20 md:pb-0">
              
              {/* Stacked or Row buttons on the right side */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                
                <Link
                  to="/shop"
                  className="bg-[#fbb03b] hover:bg-black hover:text-white text-black font-black px-10 py-4 rounded-xl transition-all shadow-2xl active:scale-95 uppercase text-xs tracking-widest flex items-center justify-center min-w-[180px] backdrop-blur-sm"
                >
                  Buy Now
                </Link>

                <Link
                  to="/setup-store"
                  className="bg-white/90 text-black font-bold px-10 py-4 rounded-xl border-2 border-black/5 hover:border-[#fbb03b] transition-all shadow-xl active:scale-95 uppercase text-xs tracking-widest flex items-center justify-center min-w-[180px] backdrop-blur-md"
                >
                  Sell Now
                </Link>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* NAVIGATION ARROWS - Styled to be less intrusive */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-black/10 hover:bg-white/80 text-white hover:text-black p-2 rounded-full backdrop-blur-sm transition-all shadow-md"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-black/10 hover:bg-white/80 text-white hover:text-black p-2 rounded-full backdrop-blur-sm transition-all shadow-md"
      >
        <ChevronRight size={24} />
      </button>

      {/* PAGINATION INDICATORS */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
              index === current
                ? "w-10 bg-[#fbb03b]"
                : "w-4 bg-white/40 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}