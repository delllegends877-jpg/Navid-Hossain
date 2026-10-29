export type Language = 'bn' | 'en';

export type SpiceLevel = 'mild' | 'medium' | 'spicy' | 'naga';

export type TokOption = 'sweet_sour' | 'sour' | 'mint' | 'naga_tok';

export interface MenuItem {
  id: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  descriptionEn: string;
  price: number; // in BDT ৳
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isSpicy?: boolean;
  spiceRating: number; // 0 to 4
  isBestseller?: boolean;
  isNew?: boolean;
  piecesCount: string; // e.g. "১০ পিস" / "10 pcs"
  prepTime: string; // e.g. "১০-১৫ মিনিট" / "10-15 mins"
  tags: string[];
}

export interface CartItemOption {
  spiceLevel: SpiceLevel;
  tokOption: TokOption;
  extraEgg: boolean;
  extraPuri: boolean;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string; // unique based on options
  item: MenuItem;
  quantity: number;
  selectedOptions: CartItemOption;
  totalPrice: number;
}

export interface RestaurantSettings {
  nameBn: string;
  nameEn: string;
  taglineBn: string;
  taglineEn: string;
  phone: string;
  whatsappNumber: string; // E.g. "8801712345678"
  email: string;
  addressBn: string;
  addressEn: string;
  areaBn: string;
  areaEn: string;
  city: string;
  openingHoursBn: string;
  openingHoursEn: string;
  deliveryFeeInside: number;
  deliveryFeeOutside: number;
  freeDeliveryThreshold: number;
  currency: string;
  bkashNumber: string;
  nagadNumber: string;
  facebookUrl?: string;
  instagramUrl?: string;
  googleSiteVerification?: string;
  customDomain?: string;
}

export interface OrderCustomerDetails {
  name: string;
  phone: string;
  address: string;
  area: string;
  orderType: 'delivery' | 'pickup';
  paymentMethod: 'cash' | 'bkash' | 'nagad';
  notes: string;
}
