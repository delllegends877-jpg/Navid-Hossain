import React, { useState } from 'react';
import { X, Flame, Sparkles, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { MenuItem, SpiceLevel, TokOption, CartItemOption } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';

interface CustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, options: CartItemOption, quantity: number) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({ 
  item, 
  onClose, 
  onAddToCart 
}) => {
  const { language, t } = useLanguage();
  const { settings } = useSettings();

  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>('medium');
  const [tokOption, setTokOption] = useState<TokOption>('sweet_sour');
  const [extraEgg, setExtraEgg] = useState(false);
  const [extraPuri, setExtraPuri] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const name = language === 'bn' ? item.nameBn : item.nameEn;

  // Addon pricing
  let unitAddonPrice = 0;
  if (extraEgg) unitAddonPrice += 15;
  if (extraPuri) unitAddonPrice += 20;

  const unitTotal = item.price + unitAddonPrice;
  const grandTotal = unitTotal * quantity;

  const handleConfirm = () => {
    onAddToCart(
      item,
      {
        spiceLevel,
        tokOption,
        extraEgg,
        extraPuri,
        specialInstructions: instructions.trim() || undefined,
      },
      quantity
    );
    onClose();
  };

  const spiceOptions: { id: SpiceLevel; label: string; iconCount: number; color: string }[] = [
    { id: 'mild', label: t.customizeModal.mild, iconCount: 1, color: 'text-amber-500' },
    { id: 'medium', label: t.customizeModal.medium, iconCount: 2, color: 'text-orange-500' },
    { id: 'spicy', label: t.customizeModal.spicy, iconCount: 3, color: 'text-red-500' },
    { id: 'naga', label: t.customizeModal.naga, iconCount: 4, color: 'text-red-600' },
  ];

  const tokOptions: { id: TokOption; label: string; desc: string }[] = [
    { 
      id: 'sweet_sour', 
      label: t.customizeModal.sweet_sour, 
      desc: language === 'bn' ? 'আসল তেঁতুল, বিট লবণ ও গুঁড়া মশলা' : 'Signature authentic blend of tamarind & roasted cumin' 
    },
    { 
      id: 'sour', 
      label: t.customizeModal.sour, 
      desc: language === 'bn' ? 'মিষ্টি ছাড়া খাঁটি টক যারা ভালোবাসেন' : 'Tangy and tart without sweetness' 
    },
    { 
      id: 'mint', 
      label: t.customizeModal.mint, 
      desc: language === 'bn' ? 'সতেজ পুদিনা ও ধনেপাতার সবুজ চাটনি' : 'Herbal mint and green cilantro infused tok' 
    },
    { 
      id: 'naga_tok', 
      label: t.customizeModal.naga_tok, 
      desc: language === 'bn' ? 'নাগা মরিচের সুবাসিত এক্সট্রিম টক' : 'Sylheti ghost pepper infused spicy tamarind nectar' 
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Top Header with Dish Info */}
        <div className="relative h-32 sm:h-40 bg-stone-900">
          <img
            src={item.image}
            alt={name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
              {item.piecesCount}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 line-clamp-1">
              {name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 max-h-[65vh] overflow-y-auto space-y-6">
          
          {/* Section 1: Heat / Spice Level */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-500 fill-red-500" />
                <span>{t.customizeModal.selectSpice}</span>
              </label>
              <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                {language === 'bn' ? 'বাধ্যতামূলক' : 'Required'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {spiceOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSpiceLevel(opt.id)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    spiceLevel === opt.id
                      ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/20'
                      : 'border-stone-200 hover:border-amber-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">{opt.label}</div>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(opt.iconCount)].map((_, i) => (
                        <Flame key={i} className={`w-3 h-3 ${opt.color} fill-current`} />
                      ))}
                    </div>
                  </div>
                  {spiceLevel === opt.id && (
                    <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Tok Sauce Options */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{t.customizeModal.selectTok}</span>
              </label>
              <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                {language === 'bn' ? 'বাধ্যতামূলক' : 'Required'}
              </span>
            </div>

            <div className="space-y-2">
              {tokOptions.map((tok) => (
                <button
                  key={tok.id}
                  type="button"
                  onClick={() => setTokOption(tok.id)}
                  className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    tokOption === tok.id
                      ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/20'
                      : 'border-stone-200 hover:border-amber-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">{tok.label}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{tok.desc}</div>
                  </div>
                  {tokOption === tok.id && (
                    <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Extra Addons */}
          <div>
            <label className="text-sm font-extrabold text-stone-900 block mb-2.5">
              {t.customizeModal.addons}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              
              {/* Extra Egg */}
              <label
                onClick={() => setExtraEgg(!extraEgg)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  extraEgg
                    ? 'border-amber-600 bg-amber-50/70'
                    : 'border-stone-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraEgg}
                    onChange={() => {}}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-stone-800">
                    {t.customizeModal.extraEgg}
                  </span>
                </div>
              </label>

              {/* Extra Puri */}
              <label
                onClick={() => setExtraPuri(!extraPuri)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  extraPuri
                    ? 'border-amber-600 bg-amber-50/70'
                    : 'border-stone-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraPuri}
                    onChange={() => {}}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-stone-800">
                    {t.customizeModal.extraPuri}
                  </span>
                </div>
              </label>

            </div>
          </div>

          {/* Section 4: Special Instructions */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              {t.customizeModal.specialNote}
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder={t.customizeModal.notePlaceholder}
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-hidden resize-none"
            />
          </div>

        </div>

        {/* Modal Bottom Footer with Quantity and Confirm Button */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-amber-200/80 flex items-center justify-between gap-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-black text-stone-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Total & Confirm Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-md shadow-amber-600/25 flex items-center justify-between transition-all active:scale-98 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span>{t.customizeModal.addToCartBtn}</span>
            </span>
            <span className="font-black text-base">
              {settings.currency}{grandTotal}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};
