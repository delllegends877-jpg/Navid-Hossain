import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { MenuItem, CartItem, CartItemOption, OrderCustomerDetails } from '../types';
import { useSettings } from './SettingsContext';
import { useLanguage } from './LanguageContext';

export interface OrderReceipt {
  orderId: string;
  timestamp: string;
  customer: OrderCustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  whatsappUrl: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, options: CartItemOption, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orderReceipt: OrderReceipt | null;
  setOrderReceipt: (receipt: OrderReceipt | null) => void;
  sendWhatsAppOrder: (customer: OrderCustomerDetails) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useSettings();
  const { language } = useLanguage();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fuchka_house_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    localStorage.setItem('fuchka_house_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: MenuItem, options: CartItemOption, quantity = 1) => {
    const optionKey = `${item.id}_${options.spiceLevel}_${options.tokOption}_${options.extraEgg ? 'egg' : ''}_${options.extraPuri ? 'puri' : ''}_${options.specialInstructions || ''}`;
    
    // Extra add-on calculation
    let unitAddonPrice = 0;
    if (options.extraEgg) unitAddonPrice += 15;
    if (options.extraPuri) unitAddonPrice += 20;

    const unitPrice = item.price + unitAddonPrice;

    setItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.cartItemId === optionKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId: optionKey,
            item,
            quantity,
            selectedOptions: options,
            totalPrice: quantity * unitPrice,
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems(prev => {
      return prev.map(ci => {
        if (ci.cartItemId === cartItemId) {
          const newQty = ci.quantity + delta;
          if (newQty <= 0) return null;
          
          let unitAddonPrice = 0;
          if (ci.selectedOptions.extraEgg) unitAddonPrice += 15;
          if (ci.selectedOptions.extraPuri) unitAddonPrice += 20;
          const unitPrice = ci.item.price + unitAddonPrice;

          return {
            ...ci,
            quantity: newQty,
            totalPrice: newQty * unitPrice,
          };
        }
        return ci;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(ci => ci.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, ci) => sum + ci.totalPrice, 0);
  }, [items]);

  const totalCount = useMemo(() => {
    return items.reduce((sum, ci) => sum + ci.quantity, 0);
  }, [items]);

  const sendWhatsAppOrder = (customer: OrderCustomerDetails): string => {
    const orderId = `FH-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Calculate delivery fee
    let fee = 0;
    if (customer.orderType === 'delivery') {
      if (subtotal >= settings.freeDeliveryThreshold) {
        fee = 0;
      } else if (customer.area.toLowerCase().includes('dhanmondi') || customer.area.includes('ধানমন্ডি')) {
        fee = settings.deliveryFeeInside;
      } else {
        fee = settings.deliveryFeeOutside;
      }
    }

    const total = subtotal + fee;

    // Spice and Tok translation mapping for WhatsApp text
    const spiceMapBn: Record<string, string> = {
      mild: 'হালকা ঝাল (Mild)',
      medium: 'মিডিয়াম ঝাল (Medium)',
      spicy: 'দেশি ঝাল (Spicy)',
      naga: 'নাগা ব্লাস্ট (Naga Extreme 🔥)',
    };
    const tokMapBn: Record<string, string> = {
      sweet_sour: 'সিগনেচার মিষ্টি-টক',
      sour: 'রেগুলার টক',
      mint: 'পুদিনা ও ধনেপাতা টক',
      naga_tok: 'নাগা ফ্লেভার্ড টক',
    };

    let msg = `🌟 *নতুন ফুচকা ও চটপটি অর্ডার* 🌟\n`;
    msg += `*রেস্তোরাঁ:* ${settings.nameBn} (${settings.nameEn})\n`;
    msg += `*অর্ডার কোড:* #${orderId}\n`;
    msg += `*তারিখ ও সময়:* ${formattedDate}\n`;
    msg += `------------------------------------\n`;
    msg += `👤 *গ্রাহকের তথ্য:*\n`;
    msg += `• নাম: ${customer.name}\n`;
    msg += `• মোবাইল: ${customer.phone}\n`;
    msg += `• অর্ডারের ধরন: ${customer.orderType === 'delivery' ? '🛵 হোম ডেলিভারি' : '🛍️ টেকঅ্যাওয়ে / পিকআপ'}\n`;
    if (customer.orderType === 'delivery') {
      msg += `• এলাকা: ${customer.area}\n`;
      msg += `• বিস্তারিত ঠিকানা: ${customer.address}\n`;
    }
    if (customer.notes) {
      msg += `• বিশেষ নির্দেশনা: ${customer.notes}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `🍽️ *অর্ডারকৃত খাবারের তালিকা:*\n`;

    items.forEach((ci, idx) => {
      const itemTitle = language === 'bn' ? ci.item.nameBn : ci.item.nameEn;
      msg += `${idx + 1}. *${itemTitle}* x ${ci.quantity} (${ci.item.piecesCount})\n`;
      msg += `   - ঝাল: ${spiceMapBn[ci.selectedOptions.spiceLevel] || ci.selectedOptions.spiceLevel}\n`;
      msg += `   - টক: ${tokMapBn[ci.selectedOptions.tokOption] || ci.selectedOptions.tokOption}\n`;
      const extras: string[] = [];
      if (ci.selectedOptions.extraEgg) extras.push('ডিম (+৳১৫)');
      if (ci.selectedOptions.extraPuri) extras.push('এক্সট্রা পুরি (+৳২০)');
      if (extras.length > 0) {
        msg += `   - অতিরিক্ত: ${extras.join(', ')}\n`;
      }
      if (ci.selectedOptions.specialInstructions) {
        msg += `   - কাস্টম নোট: ${ci.selectedOptions.specialInstructions}\n`;
      }
      msg += `   - মূল্য: ৳${ci.totalPrice}\n\n`;
    });

    msg += `------------------------------------\n`;
    msg += `💵 *বিল বিবরণী:*\n`;
    msg += `• আইটেম সাব-টোটাল: ৳${subtotal}\n`;
    msg += `• ডেলিভারি ফি: ${fee === 0 ? '৳০ (ফ্রি ডেলিভারি)' : `৳${fee}`}\n`;
    msg += `• *সর্বমোট প্রদেয়:* ৳${total}\n`;
    msg += `• পেমেন্ট মেথড: ${customer.paymentMethod === 'cash' ? 'ক্যাশ অন ডেলিভারি (Cash)' : 'বিকাশ / নগদ (bKash/Nagad)'}\n`;
    msg += `------------------------------------\n`;
    msg += `ধন্যবাদ! দয়া করে কিচেনে কনফার্ম করে ডেলিভারির আনুমানিক সময় জানিয়ে দিন। 🙏`;

    const encoded = encodeURIComponent(msg);
    // WhatsApp format: use clean numeric number
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encoded}`;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas not supported
    }

    const receipt: OrderReceipt = {
      orderId,
      timestamp: formattedDate,
      customer,
      items: [...items],
      subtotal,
      deliveryFee: fee,
      total,
      whatsappUrl,
    };

    setOrderReceipt(receipt);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);

    return whatsappUrl;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orderReceipt,
        setOrderReceipt,
        sendWhatsAppOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
