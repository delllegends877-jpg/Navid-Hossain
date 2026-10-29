import React, { useState } from 'react';
import { X, Save, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';

export const OwnerEditModal: React.FC = () => {
  const { t } = useLanguage();
  const { 
    settings, 
    updateSettings, 
    resetSettings, 
    isOwnerModeOpen, 
    setIsOwnerModeOpen,
    resetMenu 
  } = useSettings();

  const [form, setForm] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOwnerModeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsOwnerModeOpen(false);
    }, 1200);
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to restore default restaurant details and initial food menu?')) {
      resetSettings();
      resetMenu();
      setForm({ ...settings });
      setIsOwnerModeOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-200 animate-in fade-in zoom-in duration-200 my-8">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white relative">
          <button
            onClick={() => setIsOwnerModeOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold mb-1">
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>রেস্তোরাঁ ওনার ও ম্যানেজার প্যানেল</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            {t.ownerModal.title}
          </h2>
          <p className="text-xs text-amber-200/90 mt-1">
            {t.ownerModal.subtitle}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে!</span>
            </div>
          )}

          {/* Restaurant Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.nameBn} *
              </label>
              <input
                type="text"
                value={form.nameBn}
                onChange={(e) => setForm({ ...form, nameBn: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden font-bold"
                required
              />
            </div>
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.nameEn} *
              </label>
              <input
                type="text"
                value={form.nameEn}
                onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden font-bold"
                required
              />
            </div>
          </div>

          {/* Contact Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.phone} *
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden"
                required
              />
            </div>
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.whatsapp} *
              </label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                placeholder="8801712345678"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden font-mono text-emerald-800 font-bold"
                required
              />
              <span className="text-[10px] text-stone-400">দেশ কোড সহ (880...) কোনো স্পেস বা চিহ্ন ছাড়া</span>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.addressBn} *
              </label>
              <input
                type="text"
                value={form.addressBn}
                onChange={(e) => setForm({ ...form, addressBn: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden"
                required
              />
            </div>
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.addressEn} *
              </label>
              <input
                type="text"
                value={form.addressEn}
                onChange={(e) => setForm({ ...form, addressEn: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden"
                required
              />
            </div>
          </div>

          {/* Opening Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.hoursBn} *
              </label>
              <input
                type="text"
                value={form.openingHoursBn}
                onChange={(e) => setForm({ ...form, openingHoursBn: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden"
                required
              />
            </div>
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.hoursEn} *
              </label>
              <input
                type="text"
                value={form.openingHoursEn}
                onChange={(e) => setForm({ ...form, openingHoursEn: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 outline-hidden"
                required
              />
            </div>
          </div>

          {/* Delivery Charges & Threshold */}
          <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200">
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.insideFee}
              </label>
              <input
                type="number"
                value={form.deliveryFeeInside}
                onChange={(e) => setForm({ ...form, deliveryFeeInside: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-stone-200 rounded-lg outline-hidden font-bold"
              />
            </div>
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.outsideFee}
              </label>
              <input
                type="number"
                value={form.deliveryFeeOutside}
                onChange={(e) => setForm({ ...form, deliveryFeeOutside: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-stone-200 rounded-lg outline-hidden font-bold"
              />
            </div>
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.freeThreshold}
              </label>
              <input
                type="number"
                value={form.freeDeliveryThreshold}
                onChange={(e) => setForm({ ...form, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-stone-200 rounded-lg outline-hidden font-bold text-emerald-700"
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.bkash}
              </label>
              <input
                type="text"
                value={form.bkashNumber}
                onChange={(e) => setForm({ ...form, bkashNumber: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-hidden"
              />
            </div>
            <div>
              <label className="font-extrabold text-stone-700 block mb-1">
                {t.ownerModal.nagad}
              </label>
              <input
                type="text"
                value={form.nagadNumber}
                onChange={(e) => setForm({ ...form, nagadNumber: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-hidden"
              />
            </div>
          </div>

          {/* Google Search Console Verification Meta */}
          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200">
            <label className="font-extrabold text-stone-700 block mb-1">
              গুগল সার্চ কনসোল ভেরিফিকেশন টোকেন (Google Site Verification Token)
            </label>
            <input
              type="text"
              value={form.googleSiteVerification || ''}
              onChange={(e) => {
                let val = e.target.value.trim();
                if (val.includes('content="')) {
                  const m = val.match(/content=["']([^"']+)["']/);
                  if (m && m[1]) val = m[1];
                }
                setForm({ ...form, googleSiteVerification: val });
              }}
              placeholder='যেমন: 4x5a_yZ8B7c...'
              className="w-full p-2.5 bg-white border border-stone-200 rounded-xl outline-hidden font-mono text-xs"
            />
            <span className="text-[10px] text-stone-500 mt-1 block">
              Google Search Console এর HTML tag থেকে content="টোকেন" এর মানটি এখানে দিলে সার্চ কনসোল স্বয়ংক্রিয়ভাবে ওনারশিপ ভেরিফাই করবে।
            </span>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetAll}
              className="text-stone-500 hover:text-red-600 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.ownerModal.reset}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOwnerModeOpen(false)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 font-semibold cursor-pointer"
              >
                {t.ownerModal.close}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{t.ownerModal.save}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
