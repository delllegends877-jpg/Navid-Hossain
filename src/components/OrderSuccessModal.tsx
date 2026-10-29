import React from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Copy, 
  ExternalLink, 
  Check 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { useCart } from '../context/CartContext';

export const OrderSuccessModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings } = useSettings();
  const { orderReceipt, setOrderReceipt, clearCart } = useCart();
  const [copied, setCopied] = React.useState(false);

  if (!orderReceipt) return null;

  const handleClose = () => {
    clearCart();
    setOrderReceipt(null);
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderReceipt.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-200 animate-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Top Green Header */}
        <div className="p-6 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white text-center relative">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-200" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            {t.orderSuccess.title}
          </h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-sm mx-auto">
            {t.orderSuccess.subtitle}
          </p>

          {/* Order ID Pill */}
          <div className="mt-4 inline-flex items-center gap-2 bg-black/25 px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
            <span>{t.orderSuccess.orderId}: {orderReceipt.orderId}</span>
            <button
              onClick={copyOrderId}
              className="text-emerald-200 hover:text-white cursor-pointer"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Modal Body Receipt */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
          
          {/* Customer summary */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
            <div className="font-extrabold text-stone-900 text-sm mb-1">
              {language === 'bn' ? 'গ্রাহক ও ডেলিভারি বিবরণ:' : 'Customer & Delivery Info:'}
            </div>
            <div className="flex justify-between text-stone-600">
              <span>নাম:</span>
              <span className="font-bold text-stone-800">{orderReceipt.customer.name}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>ফোন:</span>
              <span className="font-bold text-stone-800">{orderReceipt.customer.phone}</span>
            </div>
            {orderReceipt.customer.orderType === 'delivery' ? (
              <>
                <div className="flex justify-between text-stone-600">
                  <span>এলাকা:</span>
                  <span className="font-bold text-stone-800">{orderReceipt.customer.area}</span>
                </div>
                <div className="text-stone-600 pt-1">
                  <span>ঠিকানা: </span>
                  <span className="font-medium text-stone-800">{orderReceipt.customer.address}</span>
                </div>
              </>
            ) : (
              <div className="text-emerald-700 font-bold">
                {language === 'bn' ? 'টেকঅ্যাওয়ে / রেস্তোরাঁ থেকে পিকআপ করবেন' : 'Takeaway / Self-Pickup from Dhanmondi Branch'}
              </div>
            )}
            {orderReceipt.customer.notes && (
              <div className="text-stone-500 italic pt-1">
                নোট: "{orderReceipt.customer.notes}"
              </div>
            )}
          </div>

          {/* Items summary */}
          <div>
            <div className="font-extrabold text-stone-900 mb-2">
              {t.orderSuccess.orderSummary}
            </div>
            <div className="space-y-2">
              {orderReceipt.items.map((ci, idx) => (
                <div 
                  key={idx}
                  className="flex justify-between items-center py-1.5 border-b border-stone-100 last:border-b-0"
                >
                  <div>
                    <div className="font-bold text-stone-800">
                      {language === 'bn' ? ci.item.nameBn : ci.item.nameEn} x {ci.quantity}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {ci.selectedOptions.spiceLevel} | {ci.selectedOptions.tokOption}
                      {ci.selectedOptions.extraEgg ? ' | +ডিম' : ''}
                      {ci.selectedOptions.extraPuri ? ' | +পুরি' : ''}
                    </div>
                  </div>
                  <div className="font-extrabold text-stone-900">
                    {settings.currency}{ci.totalPrice}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Total */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
            <div className="flex justify-between text-stone-600">
              <span>সাব-টোটাল:</span>
              <span>{settings.currency}{orderReceipt.subtotal}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>ডেলিভারি ফি:</span>
              <span>{orderReceipt.deliveryFee === 0 ? 'ফ্রি' : `${settings.currency}${orderReceipt.deliveryFee}`}</span>
            </div>
            <div className="flex justify-between font-black text-sm text-stone-900 pt-1 border-t border-amber-200">
              <span>সর্বমোট প্রদেয়:</span>
              <span className="text-amber-700">{settings.currency}{orderReceipt.total}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <a
              href={orderReceipt.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.orderSuccess.openWhatsAppAgain}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center justify-center gap-2 text-stone-500 text-[11px] pt-1">
              <span>{t.orderSuccess.callForUrgent}</span>
              <a 
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{settings.phone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Modal Bottom Close */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-center">
          <button
            onClick={handleClose}
            className="w-full py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-bold text-xs cursor-pointer transition-colors"
          >
            {t.orderSuccess.backToHome}
          </button>
        </div>

      </div>
    </div>
  );
};
