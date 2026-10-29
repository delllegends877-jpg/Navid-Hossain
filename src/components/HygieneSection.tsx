import React from 'react';
import { Droplets, ShieldCheck, Sparkles, ChefHat, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HygieneSection: React.FC = () => {
  const { t } = useLanguage();

  const points = [
    {
      icon: <Droplets className="w-6 h-6 text-cyan-600" />,
      bg: 'bg-cyan-50 border-cyan-200',
      title: t.hygiene.point1Title,
      desc: t.hygiene.point1Desc,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200',
      title: t.hygiene.point2Title,
      desc: t.hygiene.point2Desc,
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200',
      title: t.hygiene.point3Title,
      desc: t.hygiene.point3Desc,
    },
    {
      icon: <ChefHat className="w-6 h-6 text-orange-600" />,
      bg: 'bg-orange-50 border-orange-200',
      title: t.hygiene.point4Title,
      desc: t.hygiene.point4Desc,
    },
  ];

  return (
    <section id="hygiene" className="py-16 bg-white border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.hygiene.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {t.hygiene.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            স্ট্রিট ফুডের সেরা স্বাদ, কিন্তু কোনো প্রকার স্বাস্থ্যঝুঁকি ছাড়া
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl border ${pt.bg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center mb-4 border border-stone-100">
                  {pt.icon}
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900 mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {pt.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1 text-[11px] font-bold text-stone-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>ফুড কোয়ালিটি সার্টিফাইড</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
