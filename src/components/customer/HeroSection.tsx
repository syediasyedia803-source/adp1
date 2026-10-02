import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import bannerLogo from '../../assets/images/banner.png';

export const HeroSection: React.FC = () => {
  const { settings, setActiveView, setSelectedCategory, setSelectedProductId } = useStore();
  const slides = settings.heroSlides.filter((s) => s.isActive);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[currentSlide];

  const handleCta = () => {
    if (slide.id === 'slide-cloth') {
      setSelectedProductId('prod-cloth-signature');
      setActiveView('product');
    } else {
      setSelectedCategory(null);
      setActiveView('shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#092328] text-white overflow-hidden min-h-[580px] sm:min-h-[640px] flex items-center">
      {/* Background Media with High-Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-center transform scale-105 transition-all duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#092328]/95 via-[#092328]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#092328] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Subtitle / Collection kicker with brand crest */}
          <div className="flex items-center gap-3">
            <img
              src={bannerLogo}
              alt="Comfort"
              className="h-10 sm:h-12 w-auto object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#8BBB92]"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8BBB92]">
                {slide.subtitle}
              </span>
            </div>
          </div>

          {/* Luxury Editorial Headline */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white text-balance">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#FAF8F5]/80 font-light leading-relaxed max-w-xl">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleCta}
              className="px-8 py-3.5 bg-[#FAF8F5] text-[#092328] text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-[#8BBB92] hover:text-[#092328] transition-all flex items-center gap-2.5 shadow-xl cursor-pointer"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setSelectedCategory('Luxury Pret');
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 border border-white/40 text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-white/10 hover:border-white transition-all cursor-pointer backdrop-blur-xs"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-[#8BBB92]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};
