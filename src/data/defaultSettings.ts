import { RestaurantSettings } from '../types';

export const DEFAULT_SETTINGS: RestaurantSettings = {
  nameBn: 'ফুচকা হাউজ',
  nameEn: 'Fuchka House',
  taglineBn: 'ঢাকার সেরা মচমচে দেশি ফুচকা ও খাঁটি তেঁতুলের টক',
  taglineEn: 'Dhaka\'s Premier Artisan Fuchka & Chotpoti with Pure Mineral Water',
  phone: '+880 1712-345678',
  whatsappNumber: '8801712345678', // Format without '+' for wa.me links
  email: 'hello@fuchkahousebd.com',
  addressBn: 'বাড়ি ১২, রোড ৭, ধানমন্ডি (লেকের বিপরীতে)',
  addressEn: 'House 12, Road 7, Dhanmondi (Opposite Dhanmondi Lake)',
  areaBn: 'ধানমন্ডি, ঢাকা ১২০৫',
  areaEn: 'Dhanmondi, Dhaka 1205',
  city: 'Dhaka, Bangladesh',
  openingHoursBn: 'প্রতিদিন দুপুর ১:০০ টা - রাত ১১:০০ টা',
  openingHoursEn: 'Everyday 1:00 PM – 11:00 PM',
  deliveryFeeInside: 50, // inside local zone BDT
  deliveryFeeOutside: 80, // other Dhaka areas BDT
  freeDeliveryThreshold: 700, // free delivery over 700 BDT
  currency: '৳',
  bkashNumber: '01712345678 (Personal / Send Money)',
  nagadNumber: '01712345678 (Personal)',
  facebookUrl: 'https://facebook.com/fuchkahousebd',
  instagramUrl: 'https://instagram.com/fuchkahousebd',
  googleSiteVerification: '',
  customDomain: 'https://ais-pre-nofix7be63aog2qyhaahpo-728128489142.asia-east1.run.app',
};

export const POPULAR_AREAS = [
  { bn: 'ধানমন্ডি (Dhanmondi)', en: 'Dhanmondi', fee: 50 },
  { bn: 'গুলশান ১ ও ২ (Gulshan)', en: 'Gulshan 1 & 2', fee: 80 },
  { bn: 'বনানী (Banani)', en: 'Banani', fee: 80 },
  { bn: 'মিরপুর (Mirpur)', en: 'Mirpur (All Sections)', fee: 80 },
  { bn: 'উত্তরা (Uttara)', en: 'Uttara', fee: 90 },
  { bn: 'মোহাম্মদপুর (Mohammadpur)', en: 'Mohammadpur', fee: 50 },
  { bn: 'লালমাটিয়া (Lalmatia)', en: 'Lalmatia', fee: 50 },
  { bn: 'পুরান ঢাকা (Old Dhaka)', en: 'Old Dhaka', fee: 80 },
  { bn: 'বসুন্ধরা আবাসিক এলাকা (Bashundhara R/A)', en: 'Bashundhara R/A', fee: 90 },
  { bn: 'খিলগাঁও / মালিবাগ (Khilgaon / Malibagh)', en: 'Khilgaon / Malibagh', fee: 70 },
];
