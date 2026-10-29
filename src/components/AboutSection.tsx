import React from 'react';
import { Sparkles, Heart, Star, Quote, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language, t } = useLanguage();

  const reviews = [
    {
      name: 'সাদিয়া তাসনিম',
      role: 'ধানমন্ডি, ঢাকা',
      comment: 'ঢাকার অনেক জায়গায় ফুচকা খেয়েছি, কিন্তু ফুচকা হাউজের মতো মচমচে পুরি আর আসল তেঁতুলের মিষ্টি-টক স্বাদ কোথাও পাইনি। বিশেষ করে এদের পরিষ্কার-পরিচ্ছন্নতা প্রশংসনীয়!',
      rating: 5,
      dish: 'ক্লাসিক স্পেশাল ফুচকা'
    },
    {
      name: 'আসিফ ইকবাল',
      role: 'গুলশান ২, ঢাকা',
      comment: 'নাগা ব্লাস্ট ফুচকা চরম লেভেলের ঝাল! ঝালপ্রেমী হলে এটা একবার ট্রাই করতেই হবে। আর শাহী বোরহানিটা ছিল মন জুড়িয়ে যাওয়ার মতো। হোয়াটসঅ্যাপে অর্ডার করার ৩০ মিনিটের মধ্যে ডেলিভারি পেয়েছি।',
      rating: 5,
      dish: 'নাগা ব্লাস্ট ও শাহী বোরহানি'
    },
    {
      name: 'ফারহানা ইসলাম চৌধুরী',
      role: 'উত্তরা সেক্টর ৭',
      comment: 'দই ফুচকার ফ্যান আমি। এদের দই ফুচকায় যে মিষ্টি দই ও ডালিমের টপিং দেয়, মুখে দিলে একদম মিলিয়ে যায়। পরিবারের সবাই দারুণ পছন্দ করেছে।',
      rating: 5,
      dish: 'শাহী দই ফুচকা'
    }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-[#faf7f2] via-orange-50/20 to-amber-50/40 border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Images Grid */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 relative">
              <div className="space-y-3 sm:space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
                  alt="Traditional Doi Fuchka"
                  className="rounded-2xl object-cover h-48 sm:h-56 w-full shadow-md border-2 border-white"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
                  alt="Crispy Fuchka Spices"
                  className="rounded-2xl object-cover h-36 sm:h-44 w-full shadow-md border-2 border-white"
                  loading="lazy"
                />
              </div>

              <div className="space-y-3 sm:space-y-4 pt-6">
                <img
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
                  alt="Delicious Egg Chotpoti"
                  className="rounded-2xl object-cover h-36 sm:h-44 w-full shadow-md border-2 border-white"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
                  alt="Street Fuchka Platter"
                  className="rounded-2xl object-cover h-48 sm:h-56 w-full shadow-md border-2 border-white"
                  loading="lazy"
                />
              </div>

              {/* Floating Center Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white p-3 rounded-2xl shadow-xl border-4 border-white flex flex-col items-center justify-center text-center">
                <Award className="w-6 h-6 text-yellow-300" />
                <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">Est. 2021</span>
                <span className="text-xs font-black">Dhaka</span>
              </div>
            </div>
          </div>

          {/* Text Story Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{t.about.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
              {t.about.title}
            </h2>

            <div className="space-y-3.5 text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300/70 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-amber-950">
                {t.about.signatureRecipe}
              </div>
            </div>
          </div>

        </div>

        {/* Customer Testimonials Carousel/Cards */}
        <div className="pt-8 border-t border-amber-200/60">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              {language === 'bn' ? 'কাস্টমার মতামত' : 'Customer Reviews'}
            </span>
            <h3 className="text-2xl font-black text-stone-900 mt-1">
              {language === 'bn' ? 'ফুড লাভাররা আমাদের সম্পর্কে কী বলেন?' : 'What Dhaka Foodies Say About Us'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-amber-300 stroke-[1.5]" />
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs text-stone-900">{rev.name}</h4>
                    <span className="text-[11px] text-stone-400">{rev.role}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                    {rev.dish}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
