/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Flame, 
  Sparkles, 
  Droplets, 
  ShieldCheck, 
  Phone,
  ChevronUp 
} from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { HygieneSection } from './components/HygieneSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OwnerEditModal } from './components/OwnerEditModal';
import { HostingGuideModal } from './components/HostingGuideModal';
import { PrivacyTermsModal } from './components/PrivacyTermsModal';

// Interactive Taste & Tok Explorer Component
const TasteExplorer: React.FC = () => {
  const { language } = useLanguage();
  const [selectedSpice, setSelectedSpice] = useState<'mild' | 'medium' | 'spicy' | 'naga'>('medium');

  const spiceDetails = {
    mild: {
      titleBn: 'হালকা ঝাল (Mild Touch)',
      titleEn: 'Mild Heat (Gentle)',
      descBn: 'কম কাঁচা মরিচ ও সুষম মশলা। ছোট বাচ্চা ও যারা ঝাল সহ্য করতে পারেন না তাদের জন্য একদম পারফেক্ট।',
      descEn: 'Low chili and balanced herbs. Ideal for kids or those preferring subtle flavors.',
      chiliCount: 1,
      bestPairingBn: 'শাহী দই ফুচকা বা মিষ্টি লাচ্ছি',
      bestPairingEn: 'Shahi Doi Fuchka or Sweet Lassi',
    },
    medium: {
      titleBn: 'মিডিয়াম ঝাল (Standard Dhaka Style)',
      titleEn: 'Medium Heat (Classic Dhaka)',
      descBn: 'ঢাকার রাস্তার আসল ঐতিহ্যবাহী ফুচকার ঝাল। খাঁটি বিট লবণ ও টেঁতুলের টকের ভারসাম্যপূর্ণ স্বাদ।',
      descEn: 'The quintessential Dhaka street food balance. Zesty roasted cumin with tangy tamarind.',
      chiliCount: 2,
      bestPairingBn: 'ক্লাসিক স্পেশাল ফুচকা ও স্পেশাল চটপটি',
      bestPairingEn: 'Classic Special Fuchka & Special Chotpoti',
    },
    spicy: {
      titleBn: 'দেশি ঝাল (Spicy Kick)',
      titleEn: 'Desi Spicy (Zesty Kick)',
      descBn: 'বেশি কাঁচা মরিচ ও ভাজা লাল মরিচের গুঁড়া। খাঁটি ভোজনরসিকদের প্রিয় পছন্দ।',
      descEn: 'Extra fresh green chillies and roasted red chili flakes for a genuine kick.',
      chiliCount: 3,
      bestPairingBn: 'ডিম চটপটি ও পুদিনা টক',
      bestPairingEn: 'Egg Chotpoti with Mint Tok',
    },
    naga: {
      titleBn: 'নাগা ব্লাস্ট (Sylheti Ghost Pepper Extreme 🔥)',
      titleEn: 'Naga Blast (Ghost Pepper Fire 🔥)',
      descBn: 'সিলেটের খাঁটি নাগা মরিচের বোমাস্টিক সুবাস ও জিভে আগুন ধরানো চরম ঝাল। সাথে মিষ্টি বোরহানি নেওয়া মাস্ট!',
      descEn: 'Infused with authentic Sylheti ghost peppers. Extreme heat with mouthwatering aroma.',
      chiliCount: 4,
      bestPairingBn: 'নাগা ফুচকা + ঠান্ডা শাহী বোরহানি',
      bestPairingEn: 'Naga Fuchka + Chilled Shahi Borhani',
    },
  };

  const current = spiceDetails[selectedSpice];

  return (
    <section className="py-12 bg-amber-50/60 border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-white via-amber-50/40 to-orange-50/40 rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              {language === 'bn' ? 'স্বাদ ও ঝালের গাইড' : 'Taste & Heat Meter'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              {language === 'bn' ? 'আপনার ঝালের সহ্যসীমা কতটুকু?' : 'Choose Your Heat Level'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {language === 'bn' ? 'ফুচকা হাউজে প্রতিটি পদ আপনার পছন্দের ঝালে হাতে বানানো হয়' : 'Every plate at Fuchka House is customized to your exact spice preference'}
            </p>
          </div>

          {/* Interactive Heat Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto mb-6">
            {(['mild', 'medium', 'spicy', 'naga'] as const).map((key) => {
              const active = selectedSpice === key;
              const item = spiceDetails[key];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSpice(key)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex justify-center gap-0.5 mb-1">
                    {[...Array(item.chiliCount)].map((_, i) => (
                      <Flame key={i} className={`w-3.5 h-3.5 ${active ? 'text-yellow-300 fill-yellow-300' : 'text-red-500 fill-red-500'}`} />
                    ))}
                  </div>
                  <div className="text-xs font-extrabold capitalize">
                    {key === 'mild' ? (language === 'bn' ? 'হালকা ঝাল' : 'Mild') :
                     key === 'medium' ? (language === 'bn' ? 'মিডিয়াম' : 'Medium') :
                     key === 'spicy' ? (language === 'bn' ? 'দেশি ঝাল' : 'Spicy') :
                     (language === 'bn' ? 'নাগা ফায়ার' : 'Naga Fire')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Spice Details Card */}
          <div className="max-w-xl mx-auto p-4 sm:p-5 bg-white rounded-2xl border border-amber-200/80 shadow-2xs text-center sm:text-left sm:flex items-center justify-between gap-4">
            <div>
              <h4 className="font-extrabold text-stone-900 text-base mb-1">
                {language === 'bn' ? current.titleBn : current.titleEn}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'bn' ? current.descBn : current.descEn}
              </p>
            </div>
            <div className="mt-3 sm:mt-0 shrink-0 text-center sm:text-right bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">
                {language === 'bn' ? 'সেরা কম্বিনেশন' : 'Best Paired With'}
              </span>
              <span className="text-xs font-black text-amber-950 mt-0.5 block">
                {language === 'bn' ? current.bestPairingBn : current.bestPairingEn}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

// Main App Container Content
const MainApp: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreMenu = () => {
    setActiveSection('menu');
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className={`min-h-screen flex flex-col font-sans ${language === 'bn' ? 'font-bangla' : ''}`}>
      
      {/* Header */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <div id="home">
          <Hero onExploreMenu={handleExploreMenu} />
        </div>

        {/* Interactive Heat & Tok Taste Explorer */}
        <TasteExplorer />

        {/* Menu Section */}
        <MenuSection />

        {/* Hygiene & Water Safety Guarantee */}
        <HygieneSection />

        {/* Story & Heritage */}
        <AboutSection />

        {/* Contact & Dhaka Outlets */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Floating Action Buttons: WhatsApp & Scroll to Top */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white/95 text-stone-700 hover:text-amber-600 shadow-lg border border-amber-200 flex items-center justify-center transition-all cursor-pointer pointer-events-auto hover:scale-105 active:scale-95"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Quick Order Button */}
        <a
          href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
            language === 'bn' 
              ? 'আসসালামু আলাইকুম ফুচকা হাউজ, আমি খাবার অর্ডার করতে চাই।' 
              : 'Hello Fuchka House, I would like to order food.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/35 transition-all transform hover:scale-105 active:scale-95 pointer-events-auto border-2 border-white"
          title="Direct WhatsApp Order"
        >
          <MessageSquare className="w-5 h-5 fill-white/20 animate-pulse" />
          <span className="hidden sm:inline">
            {language === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার' : 'WhatsApp Order'}
          </span>
        </a>

      </div>

      {/* Modals & Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OwnerEditModal />
      <HostingGuideModal />
      <PrivacyTermsModal />

    </div>
  );
};

export default function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </LanguageProvider>
    </SettingsProvider>
  );
}
