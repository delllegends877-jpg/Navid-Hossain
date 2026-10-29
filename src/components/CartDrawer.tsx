import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Flame, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings } = useSettings();
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    totalCount,
    setIsCheckoutOpen 
  } = useCart();

  if (!isCartOpen) return null;

  const freeDeliveryProgress = Math.min(100, (subtotal / settings.freeDeliveryThreshold) * 100);
  const remainingForFree = Math.max(0, settings.freeDeliveryThreshold - subtotal);

  const spiceLabels: Record<string, string> = {
    mild: t.customizeModal.mild,
    medium: t.customizeModal.medium,
    spicy: t.customizeModal.spicy,
    naga: t.customizeModal.naga,
  };

  const tokLabels: Record<string, string> = {
    sweet_sour: t.customizeModal.sweet_sour,
    sour: t.customizeModal.sour,
    mint: t.customizeModal.mint,
    naga_tok: t.customizeModal.naga_tok,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-amber-200 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Top Header */}
          <div className="p-4 sm:p-5 border-b border-amber-100 flex items-center justify-between bg-amber-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-stone-900 text-base sm:text-lg">
                  {t.cart.title}
                </h2>
                <p className="text-xs text-stone-500">
                  {totalCount} {t.cart.itemsCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-stone-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                  title={t.cart.clearCart}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-xl bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Bar */}
          {items.length > 0 && (
            <div className="p-3 bg-amber-100/70 border-b border-amber-200 text-xs">
              <div className="flex items-center justify-between text-amber-950 font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-700" />
                  {remainingForFree === 0 ? (
                    <span className="text-emerald-700 font-extrabold">
                      {language === 'bn' ? '🎉 অভিনন্দন! আপনার ডেলিভারি সম্পূর্ণ ফ্রি!' : '🎉 Congratulations! You unlocked Free Delivery!'}
                    </span>
                  ) : (
                    <span>
                      {language === 'bn' 
                        ? `আর মাত্র ৳${remainingForFree} অর্ডারে ফ্রি ডেলিভারি!` 
                        : `Add ৳${remainingForFree} more for Free Delivery!`}
                    </span>
                  )}
                </span>
                <span className="text-amber-800">{Math.round(freeDeliveryProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-amber-200/80 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all duration-300" 
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-lg mb-1">
                    {t.cart.emptyTitle}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                    {t.cart.emptySub}
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-600/20 hover:bg-amber-700 transition-colors cursor-pointer"
                >
                  {t.cart.browseMenu}
                </button>
              </div>
            ) : (
              items.map((ci) => {
                const itemTitle = language === 'bn' ? ci.item.nameBn : ci.item.nameEn;
                return (
                  <div 
                    key={ci.cartItemId}
                    className="p-3 bg-stone-50/80 border border-amber-200/60 rounded-2xl flex gap-3 items-start relative hover:bg-white hover:border-amber-300 transition-all"
                  >
                    <img
                      src={ci.item.image}
                      alt={itemTitle}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-stone-900 text-sm line-clamp-1">
                          {itemTitle}
                        </h4>
                        <button
                          onClick={() => removeFromCart(ci.cartItemId)}
                          className="text-stone-400 hover:text-red-500 p-0.5 cursor-pointer shrink-0"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      <div className="text-[11px] text-stone-500 mt-0.5 space-y-0.5">
                        <div className="flex items-center gap-1 text-amber-800">
                          <Flame className="w-3 h-3 text-red-500" />
                          <span>{spiceLabels[ci.selectedOptions.spiceLevel] || ci.selectedOptions.spiceLevel}</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-600">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>{tokLabels[ci.selectedOptions.tokOption] || ci.selectedOptions.tokOption}</span>
                        </div>

                        {(ci.selectedOptions.extraEgg || ci.selectedOptions.extraPuri) && (
                          <div className="text-emerald-700 font-medium">
                            {ci.selectedOptions.extraEgg && '+ ডিম '}
                            {ci.selectedOptions.extraPuri && '+ এক্সট্রা পুরি'}
                          </div>
                        )}

                        {ci.selectedOptions.specialInstructions && (
                          <div className="italic text-stone-400 truncate">
                            "{ci.selectedOptions.specialInstructions}"
                          </div>
                        )}
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                        <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(ci.cartItemId, -1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-bold text-stone-800">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(ci.cartItemId, 1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-extrabold text-amber-700 text-sm">
                          {settings.currency}{ci.totalPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Bottom Summary & Checkout Button */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-amber-200 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{t.cart.subtotal}:</span>
                  <span className="font-bold text-stone-900">{settings.currency}{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.cart.deliveryFee}:</span>
                  <span className="font-semibold text-stone-700">
                    {subtotal >= settings.freeDeliveryThreshold 
                      ? (language === 'bn' ? 'ফ্রি' : 'FREE') 
                      : `৳${settings.deliveryFeeInside} - ৳${settings.deliveryFeeOutside}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-stone-200">
                <span className="text-sm font-extrabold text-stone-900">{t.cart.total}:</span>
                <span className="text-2xl font-black text-amber-600">
                  {settings.currency}{subtotal}*
                </span>
              </div>
              <p className="text-[10px] text-stone-400">
                *{language === 'bn' ? 'ডেলিভারি এরিয়া অনুযায়ী চূড়ান্ত ফি চেকআউটে যুক্ত হবে।' : 'Exact delivery fee added on checkout based on your area.'}
              </p>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{t.cart.proceedToOrder}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
