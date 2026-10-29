import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Sparkles, 
  Utensils, 
  Heart, 
  Soup, 
  Coffee, 
  PlusCircle, 
  Plus, 
  X,
  SlidersHorizontal 
} from 'lucide-react';
import { MenuItem } from '../types';
import { CATEGORIES } from '../data/initialMenu';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from './ProductCard';
import { CustomizeModal } from './CustomizeModal';

export const MenuSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { menuItems, isOwnerModeOpen, addMenuItem, updateMenuItem } = useSettings();
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterBestsellerOnly, setFilterBestsellerOnly] = useState(false);

  // Modal states
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);

  // New item draft form state
  const [newItemDraft, setNewItemDraft] = useState<Partial<MenuItem>>({
    nameBn: '',
    nameEn: '',
    descriptionBn: '',
    descriptionEn: '',
    price: 130,
    category: 'fuchka',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    piecesCount: '১০ পিস (10 Pcs)',
    prepTime: '৮-১০ মিনিট',
    rating: 4.8,
    reviewCount: 45,
    spiceRating: 2,
    tags: ['নতুন'],
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Soup': return <Soup className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'PlusCircle': return <PlusCircle className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Spicy filter
      if (filterSpicyOnly && item.spiceRating < 3) {
        return false;
      }
      // Bestseller filter
      if (filterBestsellerOnly && !item.isBestseller) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.nameBn.toLowerCase().includes(query) || item.nameEn.toLowerCase().includes(query);
        const matchesDesc = item.descriptionBn.toLowerCase().includes(query) || item.descriptionEn.toLowerCase().includes(query);
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesTags;
      }
      return true;
    });
  }, [menuItems, activeCategory, filterSpicyOnly, filterBestsellerOnly, searchQuery]);

  const handleQuickAdd = (item: MenuItem) => {
    // Default options
    addToCart(
      item,
      {
        spiceLevel: item.spiceRating >= 3 ? 'spicy' : 'medium',
        tokOption: 'sweet_sour',
        extraEgg: false,
        extraPuri: false,
      },
      1
    );
  };

  const handleSaveNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemDraft.nameBn || !newItemDraft.nameEn || !newItemDraft.price) {
      alert('Please fill out dish names and price.');
      return;
    }
    const created: MenuItem = {
      id: `item-${Date.now()}`,
      nameBn: newItemDraft.nameBn || 'নতুন পদ',
      nameEn: newItemDraft.nameEn || 'New Dish',
      descriptionBn: newItemDraft.descriptionBn || '',
      descriptionEn: newItemDraft.descriptionEn || '',
      price: Number(newItemDraft.price) || 120,
      image: newItemDraft.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      category: newItemDraft.category || 'fuchka',
      rating: 4.9,
      reviewCount: 10,
      spiceRating: Number(newItemDraft.spiceRating) || 2,
      piecesCount: newItemDraft.piecesCount || '১০ পিস',
      prepTime: newItemDraft.prepTime || '১০ মিনিট',
      isNew: true,
      tags: ['স্পেশাল'],
    };
    addMenuItem(created);
    setIsAddingNewItem(false);
  };

  const handleSaveEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateMenuItem(editingItem);
    setEditingItem(null);
  };

  return (
    <section id="menu" className="py-16 bg-[#faf7f2] border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
            <Utensils className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'খাঁটি দেশি মেন্যু' : 'Authentic Street Menu'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {t.menu.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 font-normal">
            {t.menu.subtitle}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.menu.searchPlaceholder}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-hidden transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Toggle Filters & Owner Action */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setFilterBestsellerOnly(!filterBestsellerOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all shrink-0 cursor-pointer ${
                  filterBestsellerOnly
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'বেস্টসেলার আইটেম' : 'Bestsellers Only'}</span>
              </button>

              <button
                onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all shrink-0 cursor-pointer ${
                  filterSpicyOnly
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-red-300'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'নাগা ও স্পাইসি' : 'Extra Spicy Only'}</span>
              </button>

              {/* Owner Add Item Button */}
              {isOwnerModeOpen && (
                <button
                  onClick={() => setIsAddingNewItem(true)}
                  className="px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700 shrink-0 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.menu.addNewItem}</span>
                </button>
              )}
            </div>

          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const label = language === 'bn' ? cat.nameBn : cat.nameEn;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                      : 'bg-white text-stone-700 border border-stone-200/90 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-amber-600'}>
                    {getCategoryIcon(cat.icon)}
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-amber-200 p-8 max-w-md mx-auto">
            <Utensils className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="font-bold text-stone-800 text-lg mb-1">{t.menu.noItemsFound}</h3>
            <p className="text-xs text-stone-500 mb-4">
              {language === 'bn' ? 'ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।' : 'Try resetting your search query or category filters.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterSpicyOnly(false);
                setFilterBestsellerOnly(false);
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-700 transition-colors"
            >
              {language === 'bn' ? 'সব মেন্যু দেখুন' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onCustomize={(dish) => setCustomizingItem(dish)}
                onQuickAdd={handleQuickAdd}
                onEdit={(dish) => setEditingItem(dish)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Customize & Add Modal */}
      <CustomizeModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={addToCart}
      />

      {/* Owner Edit Dish Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <h3 className="font-extrabold text-stone-900 text-base">
                মেন্যু আইটেম এডিট করুন
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditItem} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">নাম (বাংলা)</label>
                <input
                  type="text"
                  value={editingItem.nameBn}
                  onChange={(e) => setEditingItem({ ...editingItem, nameBn: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">নাম (English)</label>
                <input
                  type="text"
                  value={editingItem.nameEn}
                  onChange={(e) => setEditingItem({ ...editingItem, nameEn: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">মূল্য (BDT ৳)</label>
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden font-bold text-amber-700"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">পরিমাণ / পিস</label>
                  <input
                    type="text"
                    value={editingItem.piecesCount}
                    onChange={(e) => setEditingItem({ ...editingItem, piecesCount: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">ছবির URL</label>
                <input
                  type="url"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">বর্ণনা (বাংলা)</label>
                <textarea
                  value={editingItem.descriptionBn}
                  onChange={(e) => setEditingItem({ ...editingItem, descriptionBn: e.target.value })}
                  rows={2}
                  className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-1.5 rounded-lg border text-stone-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Owner Add New Dish Modal */}
      {isAddingNewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <h3 className="font-extrabold text-stone-900 text-base">
                নতুন ফুচকা বা চটপটি পদ যোগ করুন
              </h3>
              <button
                onClick={() => setIsAddingNewItem(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewItem} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">পদের নাম (বাংলা) *</label>
                <input
                  type="text"
                  placeholder="যেমন: স্পেশাল বাটার ফুচকা"
                  value={newItemDraft.nameBn}
                  onChange={(e) => setNewItemDraft({ ...newItemDraft, nameBn: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Dish Name (English) *</label>
                <input
                  type="text"
                  placeholder="e.g. Special Butter Fuchka"
                  value={newItemDraft.nameEn}
                  onChange={(e) => setNewItemDraft({ ...newItemDraft, nameEn: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">মূল্য (BDT ৳) *</label>
                  <input
                    type="number"
                    value={newItemDraft.price}
                    onChange={(e) => setNewItemDraft({ ...newItemDraft, price: Number(e.target.value) })}
                    className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">ক্যাটাগরি</label>
                  <select
                    value={newItemDraft.category}
                    onChange={(e) => setNewItemDraft({ ...newItemDraft, category: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                  >
                    <option value="fuchka">স্পেশাল ফুচকা</option>
                    <option value="doi">দই ফুচকা</option>
                    <option value="spicy">নাগা ও স্পাইসি</option>
                    <option value="chotpoti">চটপটি</option>
                    <option value="drinks">পানীয় ও বোরহানি</option>
                    <option value="addons">এড-অনস</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">ছবির URL</label>
                <input
                  type="url"
                  value={newItemDraft.image}
                  onChange={(e) => setNewItemDraft({ ...newItemDraft, image: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">বর্ণনা (বাংলা)</label>
                <textarea
                  placeholder="সংক্ষেপে খাবারের বর্ণনা লিখুন..."
                  value={newItemDraft.descriptionBn}
                  onChange={(e) => setNewItemDraft({ ...newItemDraft, descriptionBn: e.target.value })}
                  rows={2}
                  className="w-full p-2 border rounded-lg focus:border-amber-500 outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddingNewItem(false)}
                  className="px-3 py-1.5 rounded-lg border text-stone-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  আইটেম যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
