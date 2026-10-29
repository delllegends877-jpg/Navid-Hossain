import React from 'react';
import { 
  Flame, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  FileCode, 
  HelpCircle,
  ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const { language, t } = useLanguage();
  const { 
    settings, 
    setIsHostingGuideOpen, 
    setIsPrivacyOpen, 
    setIsTermsOpen 
  } = useSettings();

  const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t-4 border-amber-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white shadow-md">
                <Flame className="w-6 h-6 fill-amber-300 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                {language === 'bn' ? settings.nameBn : settings.nameEn}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed font-normal">
              {language === 'bn' ? settings.taglineBn : settings.taglineEn}
            </p>

            <div className="p-3.5 bg-stone-900/90 rounded-2xl border border-stone-800 space-y-2 max-w-sm text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'bn' ? '১০০% বিশুদ্ধ মিনারেল ওয়াটার গ্যারান্টি' : '100% Filtered Mineral Water'}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === 'bn' ? 'ধানমন্ডি কিচেন ওপেন ও ডেলিভারি চালু' : 'Kitchen Active in Dhanmondi'}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('menu')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.nav.menu}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('hygiene')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.nav.hygiene}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('contact')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {t.footer.hotline}
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{settings.phone}</span>
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>WhatsApp: +{settings.whatsappNumber}</span>
              </a>

              <div className="flex items-start gap-2 text-stone-400">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{language === 'bn' ? settings.addressBn : settings.addressEn}</span>
              </div>

              <div className="flex items-center gap-2 text-stone-400">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{language === 'bn' ? settings.openingHoursBn : settings.openingHoursEn}</span>
              </div>
            </div>
          </div>

          {/* SEO & Web Standards (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              SEO & নীতি
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  className="hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.footer.sitemap}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  className="hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.footer.robots}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsHostingGuideOpen(true)}
                  className="hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>হোস্টিং ও এসইও গাইড</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.footer.terms}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4">
            <span>{t.footer.madeWithLove}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
