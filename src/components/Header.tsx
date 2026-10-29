import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  MessageSquare, 
  Globe, 
  Menu as MenuIcon, 
  X, 
  SlidersHorizontal,
  Flame,
  HelpCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { settings, setIsOwnerModeOpen, setIsHostingGuideOpen } = useSettings();
  const { totalCount, subtotal, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'menu', label: t.nav.menu },
    { id: 'hygiene', label: t.nav.hygiene },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      {/* Top Notification Bar with Business Hours & Free Delivery Hint */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-100 text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'bn' ? settings.openingHoursBn : settings.openingHoursEn}</span>
            </span>
            <span className="hidden sm:inline text-amber-300/40">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-amber-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'bn' ? settings.areaBn : settings.areaEn}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHostingGuideOpen(true)}
              className="text-amber-200 hover:text-white flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer text-xs"
              title="Google Search Console & Free Hosting Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.nav.hostingGuide}</span>
            </button>
            <span className="text-amber-300/40">|</span>
            <button
              onClick={() => setIsOwnerModeOpen(true)}
              className="text-amber-300 hover:text-amber-100 flex items-center gap-1 bg-amber-950/60 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-700/50 cursor-pointer"
              title="Edit Restaurant Info & Settings"
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span>{t.nav.ownerMode}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-red-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200 border-2 border-amber-200">
              <Flame className="w-7 h-7 text-white fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-amber-950 group-hover:text-amber-600 transition-colors">
                  {language === 'bn' ? settings.nameBn : settings.nameEn}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Kitchen Open" />
              </div>
              <p className="text-xs text-amber-800/80 font-medium line-clamp-1">
                {language === 'bn' ? settings.taglineBn : settings.taglineEn}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-amber-700 bg-amber-100/70' 
                    : 'text-stone-700 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Language toggle, Phone, WhatsApp, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-stone-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              aria-label="Change Language"
              title="Toggle Bangla / English"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'bn' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Quick Call Button (Desktop) */}
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 text-stone-700 hover:border-amber-400 hover:text-amber-700 text-xs font-semibold transition-all"
              title="Call Fuchka House"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>{settings.phone}</span>
            </a>

            {/* WhatsApp Fast Button */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(language === 'bn' ? 'আসসালামু আলাইকুম, আমি ফুচকা হাউজ থেকে খাবার অর্ডার করতে চাই।' : 'Hello Fuchka House, I would like to inquire about food orders.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all hover:shadow-md"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-md shadow-amber-500/25 transition-all transform active:scale-95 cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {subtotal > 0 ? `${settings.currency}${subtotal}` : t.nav.cart}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-amber-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-amber-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold transition-all ${
                  activeSection === item.id 
                    ? 'text-amber-800 bg-amber-100 font-bold' 
                    : 'text-stone-700 hover:bg-amber-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-amber-100 flex flex-col gap-2">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-stone-200 text-stone-700 font-semibold text-sm"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>{settings.phone}</span>
              </a>
              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে মেসেজ পাঠান' : 'Chat on WhatsApp'}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
