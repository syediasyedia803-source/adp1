import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Heart, Award, Users, ArrowRight } from 'lucide-react';
import heroImg from '../../assets/images/hero_luxury_pret_1790862593457.jpg';
import sageCoordImg from '../../assets/images/product_sage_coord_1790862622925.jpg';

export const AboutPage: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-[#12544F]"></span>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#12544F]">
              Our Heritage & Maison
            </span>
            <span className="w-8 h-[1px] bg-[#12544F]"></span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#092328]">
            Elegance in Every Stitch
          </h1>

          <p className="text-sm sm:text-base text-[#092328]/75 max-w-2xl mx-auto leading-relaxed">
            Comfort was founded on a singular conviction: women should never have to compromise ease and bodily well-being for high-fashion Pakistani couture.
          </p>
        </div>

        {/* Story Section with Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#092328]/10">
            <img
              src={heroImg}
              alt="Comfort Atelier Craftsmanship"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#092328]/80 leading-relaxed font-light">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#092328] font-normal">
              A Legacy Born in Lahore
            </h2>
            <p>
              Centuries of Mughal aesthetic lineage celebrate intricate zardozi, hand-beaten silver tilla, and diaphanous raw silks. Yet for decades, women endured heavy, stiff garments with synthetic underlays that irritated the skin.
            </p>
            <p>
              In our flagship Lahore atelier, we reinvented traditional silhouette geometry. Every single kurta, suit, and co-ord set is lined with pure breathable mulmul, cut with graceful ease-of-motion armholes, and tailored with hidden deep pockets.
            </p>
            <p>
              The result is an undeniable aura of regal poise — fashion that breathes with you from morning conferences to evening festive galas.
            </p>
          </div>
        </div>

        {/* Pillars Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 space-y-2">
            <Sparkles className="w-6 h-6 text-[#2A835F]" />
            <h3 className="font-serif-luxury text-lg text-[#092328]">Pure Organic Yarns</h3>
            <p className="text-xs text-[#092328]/70 leading-relaxed">
              We work exclusively with 100% pure raw silks, supima lawns, and cruelty-free viscose drapes.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 space-y-2">
            <Users className="w-6 h-6 text-[#2A835F]" />
            <h3 className="font-serif-luxury text-lg text-[#092328]">Fair Trade Artisan Families</h3>
            <p className="text-xs text-[#092328]/70 leading-relaxed">
              Our embroiderers receive living wages, healthcare, and educational stipends for their children.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 space-y-2">
            <Heart className="w-6 h-6 text-[#2A835F]" />
            <h3 className="font-serif-luxury text-lg text-[#092328]">Confidence Guaranteed</h3>
            <p className="text-xs text-[#092328]/70 leading-relaxed">
              14-day effortless doorstep return and exchange on every order placed online.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-[#092328] text-white text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#12544F] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
