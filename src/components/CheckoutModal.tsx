import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  MapPin, 
  User, 
  Phone, 
  FileText, 
  CreditCard, 
  Truck, 
  ShoppingBag,
  AlertCircle 
} from 'lucide-react';
import { POPULAR_AREAS } from '../data/defaultSettings';
import { OrderCustomerDetails } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings } = useSettings();
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    subtotal, 
    items, 
    sendWhatsAppOrder 
  } = useCart();

  const [customer, setCustomer] = useState<OrderCustomerDetails>({
    name: '',
    phone: '',
    address: '',
    area: 'ধানমন্ডি (Dhanmondi)',
    orderType: 'delivery',
    paymentMethod: 'cash',
    notes: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  // Calculate delivery fee
  let deliveryFee = 0;
  if (customer.orderType === 'delivery') {
    if (subtotal >= settings.freeDeliveryThreshold) {
      deliveryFee = 0;
    } else {
      const selected = POPULAR_AREAS.find(a => a.bn === customer.area || a.en === customer.area);
      if (selected) {
        deliveryFee = selected.fee;
      } else if (customer.area.toLowerCase().includes('dhanmondi') || customer.area.includes('ধানমন্ডি')) {
        deliveryFee = settings.deliveryFeeInside;
      } else {
        deliveryFee = settings.deliveryFeeOutside;
      }
    }
  }

  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim()) {
      setErrorMsg(t.checkout.fillRequiredError);
      return;
    }
    if (customer.orderType === 'delivery' && !customer.address.trim()) {
      setErrorMsg(t.checkout.fillRequiredError);
      return;
    }

    // BD Phone validation sanity check
    const cleanDigits = customer.phone.replace(/[^0-9]/g, '');
    if (cleanDigits.length < 11) {
      setErrorMsg(language === 'bn' ? 'দয়া করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)' : 'Please enter a valid 11-digit mobile number (e.g. 017XXXXXXXX)');
      return;
    }

    setErrorMsg('');
    const whatsappUrl = sendWhatsAppOrder(customer);
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-amber-200 animate-in fade-in zoom-in duration-200 my-8">
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white relative">
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold mb-1">
            <MessageSquare className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ ডিরেক্ট চেকআউট' : 'WhatsApp Direct Checkout'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            {t.checkout.title}
          </h2>
          <p className="text-xs text-amber-200/90 mt-1">
            {t.checkout.subtitle}
          </p>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Delivery vs Takeaway Switcher */}
          <div>
            <label className="text-xs font-extrabold text-stone-700 block mb-1.5">
              {t.checkout.orderTypeLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCustomer({ ...customer, orderType: 'delivery' })}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  customer.orderType === 'delivery'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-2xs'
                    : 'border-stone-200 text-stone-600 hover:border-amber-300'
                }`}
              >
                <Truck className="w-4 h-4 text-amber-600" />
                <span>{t.cart.delivery}</span>
              </button>

              <button
                type="button"
                onClick={() => setCustomer({ ...customer, orderType: 'pickup' })}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  customer.orderType === 'pickup'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-2xs'
                    : 'border-stone-200 text-stone-600 hover:border-amber-300'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <span>{t.cart.pickup}</span>
              </button>
            </div>
            {customer.orderType === 'pickup' && (
              <p className="text-[11px] text-emerald-700 font-medium mt-1.5 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                {t.checkout.pickupNotice} ({language === 'bn' ? settings.addressBn : settings.addressEn})
              </p>
            )}
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-extrabold text-stone-700 flex items-center gap-1 mb-1">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>{t.checkout.nameLabel}</span>
              </label>
              <input
                type="text"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder={t.checkout.namePlaceholder}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-hidden"
                required
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-stone-700 flex items-center gap-1 mb-1">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>{t.checkout.phoneLabel}</span>
              </label>
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                placeholder={t.checkout.phonePlaceholder}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-hidden font-medium"
                required
              />
            </div>
          </div>

          {/* Delivery Area & Address (If Delivery) */}
          {customer.orderType === 'delivery' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-extrabold text-stone-700 flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{t.checkout.areaLabel}</span>
                </label>
                <select
                  value={customer.area}
                  onChange={(e) => setCustomer({ ...customer, area: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500 outline-hidden"
                >
                  {POPULAR_AREAS.map((a, i) => (
                    <option key={i} value={a.bn}>
                      {language === 'bn' ? a.bn : a.en} (+৳{a.fee} ডেলিভারি ফি)
                    </option>
                  ))}
                  <option value="অন্যান্য ঢাকা এলাকা (Other Dhaka Area)">
                    {language === 'bn' ? 'ঢাকার অন্যান্য এলাকা (অন্যান্য)' : 'Other Dhaka Area'} (+৳{settings.deliveryFeeOutside})
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold text-stone-700 flex items-center gap-1 mb-1">
                  <span>{t.checkout.addressLabel}</span>
                </label>
                <textarea
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder={t.checkout.addressPlaceholder}
                  rows={2}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500 outline-hidden resize-none"
                  required={customer.orderType === 'delivery'}
                />
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label className="text-xs font-extrabold text-stone-700 flex items-center gap-1 mb-1.5">
              <CreditCard className="w-3.5 h-3.5 text-stone-400" />
              <span>{t.checkout.paymentMethodLabel}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCustomer({ ...customer, paymentMethod: 'cash' })}
                className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                  customer.paymentMethod === 'cash'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                    : 'border-stone-200 text-stone-600 hover:border-amber-300'
                }`}
              >
                <div className="font-bold">{t.checkout.cashOnDelivery}</div>
                <div className="text-[10px] text-stone-500 font-normal">খাবার হাতে পেয়ে মূল্য পরিশোধ</div>
              </button>

              <button
                type="button"
                onClick={() => setCustomer({ ...customer, paymentMethod: 'bkash' })}
                className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                  customer.paymentMethod === 'bkash'
                    ? 'border-pink-600 bg-pink-50 text-pink-900 ring-2 ring-pink-500/20'
                    : 'border-stone-200 text-stone-600 hover:border-pink-300'
                }`}
              >
                <div className="font-bold">{t.checkout.bkashNagad}</div>
                <div className="text-[10px] text-pink-600 font-normal">bKash/Nagad Send Money</div>
              </button>
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="text-xs font-extrabold text-stone-700 flex items-center gap-1 mb-1">
              <FileText className="w-3.5 h-3.5 text-stone-400" />
              <span>{t.checkout.notesLabel}</span>
            </label>
            <input
              type="text"
              value={customer.notes}
              onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
              placeholder={t.checkout.notesPlaceholder}
              className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-500 outline-hidden"
            />
          </div>

          {/* Bill Overview in Checkout */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>আইটেম সংখ্যা:</span>
              <span className="font-bold text-stone-800">{items.length} টি আইটেম</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>{t.cart.subtotal}:</span>
              <span className="font-bold text-stone-800">{settings.currency}{subtotal}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>{t.cart.deliveryFee}:</span>
              <span className="font-bold text-stone-800">
                {deliveryFee === 0 ? '৳০ (ফ্রি ডেলিভারি)' : `${settings.currency}${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-stone-900 font-black text-sm pt-2 border-t border-amber-200">
              <span>{t.cart.total}:</span>
              <span className="text-amber-700 text-base">{settings.currency}{grandTotal}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-98"
          >
            <MessageSquare className="w-5 h-5 fill-white/20" />
            <span>{t.checkout.submitWhatsApp}</span>
          </button>

          <p className="text-[11px] text-center text-stone-400">
            {language === 'bn' 
              ? 'বাটনে চাপলে স্বয়ংক্রিয়ভাবে বিস্তারিত তালিকা সহ হোয়াটসঅ্যাপ মেসেজ তৈরি হয়ে যাবে।' 
              : 'Clicking will automatically format your order items and open WhatsApp to send.'}
          </p>

        </form>

      </div>
    </div>
  );
};
