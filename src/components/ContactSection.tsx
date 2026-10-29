import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Navigation,
  CreditCard,
  Truck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { POPULAR_AREAS } from '../data/defaultSettings';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings } = useSettings();

  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [sent, setSent] = useState(false);

  const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', contact: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 bg-white border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
            <Navigation className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.contact.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Info Grid & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-400 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-stone-900 text-sm mb-1">
                  {t.contact.addressTitle}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {language === 'bn' ? settings.addressBn : settings.addressEn}
                </p>
                <p className="text-xs text-amber-700 font-bold mt-1">
                  {language === 'bn' ? settings.areaBn : settings.areaEn}
                </p>
              </div>

              {/* Opening Hours Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-400 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-stone-900 text-sm mb-1">
                  {t.contact.hoursTitle}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {language === 'bn' ? settings.openingHoursBn : settings.openingHoursEn}
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === 'bn' ? 'সরাসরি কিচেন ডেলিভারি চালু' : 'Kitchen Active Now'}</span>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-400 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-stone-900 text-sm mb-1">
                  {t.contact.phoneTitle}
                </h3>
                <a 
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-sm font-black text-blue-700 hover:underline block mb-1"
                >
                  {settings.phone}
                </a>
                <span className="text-[11px] text-stone-400">
                  {language === 'bn' ? 'সরাসরি কল করে অর্ডার ও তথ্য' : 'Direct calling hotline'}
                </span>
              </div>

              {/* WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-400 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-stone-900 text-sm mb-1">
                  {t.contact.whatsappTitle}
                </h3>
                <a 
                  href={`https://wa.me/${cleanWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-black text-emerald-700 hover:underline block mb-1"
                >
                  +{settings.whatsappNumber}
                </a>
                <span className="text-[11px] text-stone-400">
                  {language === 'bn' ? 'হোয়াটসঅ্যাপে দ্রুত মেসেজ পাঠান' : 'Instant chat & live tracking'}
                </span>
              </div>

            </div>

            {/* bKash & Nagad Info Card */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-600/10 text-amber-700 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-stone-900">
                    {language === 'bn' ? 'বিকাশ ও নগদ পেমেন্ট তথ্য:' : 'bKash & Nagad Payment Info:'}
                  </div>
                  <div className="text-stone-600 mt-0.5">
                    {settings.bkashNumber}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-white text-emerald-800 px-2.5 py-1 rounded-lg border border-amber-200">
                {language === 'bn' ? 'সেন্ড মানি বা ক্যাশ' : 'Send Money / COD'}
              </span>
            </div>

            {/* Delivery Areas Coverage Pill Box */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 text-xs font-extrabold text-stone-900 mb-2">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>{t.contact.deliveryCoverageTitle}</span>
              </div>
              <p className="text-xs text-stone-500 mb-3 leading-relaxed">
                {t.contact.deliveryCoverageDesc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_AREAS.map((a, i) => (
                  <span 
                    key={i} 
                    className="text-[11px] font-bold bg-white text-stone-700 border border-stone-200 px-2.5 py-1 rounded-lg shadow-2xs"
                  >
                    {language === 'bn' ? a.bn : a.en} (৳{a.fee})
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-5 bg-stone-50 border border-amber-200/80 p-6 sm:p-7 rounded-3xl shadow-sm">
            <h3 className="text-lg font-black text-stone-900 mb-1">
              {t.contact.formTitle}
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              {language === 'bn' ? 'ক্যাটারিং, অনুষ্ঠান বা কোনো পরামর্শ থাকলে আমাদের লিখে জানান।' : 'Have catering requests, party orders, or feedback? Drop us a note.'}
            </p>

            {sent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-emerald-900 text-sm">
                  {t.contact.formSuccess}
                </h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {t.contact.formName} *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="যেমন: সাকিব আল হাসান"
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {t.contact.formEmail} *
                  </label>
                  <input
                    type="text"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="017XXXXXXXX বা ইমেইল"
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {t.contact.formMsg} *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="আপনার বার্তা বা প্রশ্ন..."
                    rows={4}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.contact.formSubmit}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
