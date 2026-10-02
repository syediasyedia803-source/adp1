import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { FileText, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { HeroSlide } from '../../types';

export const AdminCMS: React.FC = () => {
  const { settings, updateSettings, showToast } = useStore();

  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [slides, setSlides] = useState<HeroSlide[]>(settings.heroSlides);

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ announcementText });
    showToast('Announcement banner updated');
  };

  const handleToggleSlide = (slideId: string) => {
    const updated = slides.map((s) => (s.id === slideId ? { ...s, isActive: !s.isActive } : s));
    setSlides(updated);
    updateSettings({ heroSlides: updated });
    showToast('Hero slide visibility updated');
  };

  const handleUpdateSlideText = (slideId: string, field: keyof HeroSlide, val: any) => {
    const updated = slides.map((s) => (s.id === slideId ? { ...s, [field]: val } : s));
    setSlides(updated);
    updateSettings({ heroSlides: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
          Storefront Content & Hero Management
        </h1>
        <p className="text-xs text-[#092328]/60 mt-0.5">
          Update editorial campaign banners, global notification bars, and brand messaging in real time.
        </p>
      </div>

      {/* Announcement Bar CMS */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
          Top Utility Announcement Ticker
        </h3>
        <form onSubmit={handleSaveAnnouncement} className="space-y-3">
          <textarea
            rows={2}
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            className="w-full p-3 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-[#092328] text-white rounded-xl text-xs font-semibold hover:bg-[#12544F] transition-colors cursor-pointer"
          >
            Publish Announcement
          </button>
        </form>
      </div>

      {/* Hero Slides Editor */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
            Editorial Hero Carousel ({slides.length} Slides)
          </h3>
        </div>

        <div className="space-y-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-xs space-y-4"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#092328]/10">
                <span className="text-xs font-bold text-[#12544F] uppercase tracking-wider">
                  Slide {idx + 1}: {slide.subtitle}
                </span>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={slide.isActive}
                      onChange={() => handleToggleSlide(slide.id)}
                      className="w-4 h-4 accent-[#12544F] rounded"
                    />
                    <span>Active on Storefront</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#092328] mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => handleUpdateSlideText(slide.id, 'title', e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl font-serif-luxury text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#092328] mb-1">
                    Subtitle / Collection Tag
                  </label>
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => handleUpdateSlideText(slide.id, 'subtitle', e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-[#092328] mb-1">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={slide.description}
                    onChange={(e) => handleUpdateSlideText(slide.id, 'description', e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#092328] mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={slide.ctaText}
                    onChange={(e) => handleUpdateSlideText(slide.id, 'ctaText', e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#092328] mb-1">
                    Slide Image URL
                  </label>
                  <input
                    type="text"
                    value={slide.image}
                    onChange={(e) => handleUpdateSlideText(slide.id, 'image', e.target.value)}
                    className="w-full p-2.5 font-mono text-[10px] bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
