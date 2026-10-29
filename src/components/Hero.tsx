import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Award, 
  Clock, 
  Droplets,
  Star
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  const { language, t } = useLanguage();
  const { settings } = useSettings();

  const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-amber-50/90">
      {/* Decorative Warm Backing Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-red-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines, Highlights, and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Hygiene Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-2xs">
              <Droplets className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>{t.hero.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <span className="text-amber-800 hidden sm:inline">{language === 'bn' ? 'ধানমন্ডি, ঢাকা' : 'Dhanmondi, Dhaka'}</span>
            </div>

            {/* Main Headline with Street Food Flavor */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.15]">
              {t.hero.headline1}{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
                {t.hero.headlineHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              {t.hero.subhead}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-base shadow-lg shadow-amber-600/30 hover:shadow-amber-600/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.hero.btnMenu}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  language === 'bn' 
                    ? 'আসসালামু আলাইকুম, আমি ফুচকা হাউজের স্পেশাল মেন্যু থেকে অর্ডার করতে চাই।' 
                    : 'Hello Fuchka House, I would like to place an order from your menu.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all flex items-center justify-center gap-2.5"
              >
                <MessageSquare className="w-5 h-5 fill-white/20" />
                <span>{t.hero.btnWhatsApp}</span>
              </a>
            </div>

            {/* Trust and Social Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-stone-600 border-t border-amber-200/60">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-stone-800 ml-1">4.9 / 5.0</span>
                <span className="text-stone-500 hidden sm:inline">({t.hero.happyEaters})</span>
              </div>

              <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.hero.freshGuarantee}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Glow Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/80 bg-amber-950 aspect-4/3 sm:aspect-square group">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85"
                  alt="Bangladeshi Crispy Special Fuchka with signature spicy tamarind sauce"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/40 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'আজকের হট স্পেশাল' : 'Chef\'s Today Special'}</span>
                    </div>
                    <div className="font-extrabold text-stone-900 text-base">
                      {language === 'bn' ? 'ক্লাসিক স্পেশাল ফুচকা + শাহী বোরহানি' : 'Classic Special Fuchka + Shahi Borhani'}
                    </div>
                    <div className="text-xs text-stone-500">
                      {language === 'bn' ? '১০ পিস ক্রিস্পি পুরি ও মিষ্টি-টক তেঁতুল' : '10 Pcs crispy puri with sweet tamarind tok'}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-black text-amber-600">
                      ৳১৮০
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      {language === 'bn' ? 'সেভ ৳১০' : 'Save ৳10'}
                    </span>
                  </div>
                </div>

                {/* Top Corner Floating Pill */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                  <span>{language === 'bn' ? 'হট সেলিং ফুড' : 'Most Popular'}</span>
                </div>
              </div>

              {/* Decorative Accent Badges Around Card */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl p-3 shadow-xl border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {language === 'bn' ? '১৮ ভাজা মশলা' : '18 Secret Spices'}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {language === 'bn' ? 'ঐতিহ্যবাহী স্বাদ' : 'Traditional Recipe'}
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white rounded-2xl p-3 shadow-xl border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {language === 'bn' ? 'দ্রুত ডেলিভারি' : 'Express Delivery'}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {language === 'bn' ? '৩০-৪৫ মিনিট' : '30-45 Mins Dhaka'}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Highlights Band below Hero */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/80 border border-amber-200/70 shadow-sm">
          <div className="text-center p-2 border-r border-amber-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-black text-amber-700">15+</div>
            <div className="text-xs sm:text-sm font-semibold text-stone-600 mt-0.5">{t.stats.crispPuries}</div>
          </div>
          <div className="text-center p-2 border-r border-amber-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-black text-amber-700">150K+</div>
            <div className="text-xs sm:text-sm font-semibold text-stone-600 mt-0.5">{t.stats.ordersServed}</div>
          </div>
          <div className="text-center p-2 border-r border-amber-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-stone-600 mt-0.5">{t.stats.mineralWater}</div>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-black text-amber-700">4.9 ★</div>
            <div className="text-xs sm:text-sm font-semibold text-stone-600 mt-0.5">{t.stats.satisfaction}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
