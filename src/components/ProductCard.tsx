import React from 'react';
import { Star, Flame, Clock, Plus, Sliders, Trash2, Edit3 } from 'lucide-react';
import { MenuItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';

interface ProductCardProps {
  item: MenuItem;
  onCustomize: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onEdit?: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  item, 
  onCustomize, 
  onQuickAdd,
  onEdit 
}) => {
  const { language, t } = useLanguage();
  const { settings, isOwnerModeOpen, deleteMenuItem } = useSettings();

  const name = language === 'bn' ? item.nameBn : item.nameEn;
  const description = language === 'bn' ? item.descriptionBn : item.descriptionEn;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-amber-200/80 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={`${name} - Fuchka House Bangladesh`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          {item.isBestseller && (
            <span className="bg-amber-500 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
              {t.menu.bestseller}
            </span>
          )}
          {item.isNew && (
            <span className="bg-emerald-600 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
              {language === 'bn' ? 'নতুন' : 'NEW'}
            </span>
          )}
        </div>

        {/* Spice Level Indicator on Image */}
        {item.spiceRating > 0 && (
          <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-full flex items-center gap-0.5 text-xs font-bold shadow-xs">
            {[...Array(item.spiceRating)].map((_, idx) => (
              <Flame key={idx} className="w-3 h-3 text-red-500 fill-red-500" />
            ))}
          </div>
        )}

        {/* Bottom Pcs / Serving count pill */}
        <div className="absolute bottom-2.5 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-lg text-[11px] font-bold text-stone-800 shadow-2xs flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>{item.piecesCount}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <div className="flex items-center gap-1 font-semibold text-amber-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{item.rating}</span>
              <span className="text-stone-400">({item.reviewCount})</span>
            </div>
            <span className="text-[11px] text-stone-400">
              {item.prepTime}
            </span>
          </div>

          {/* Dish Title */}
          <h3 className="font-extrabold text-lg sm:text-xl text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1 mb-1.5">
            {name}
          </h3>

          {/* Dish Description */}
          <p className="text-xs sm:text-sm text-stone-600 font-normal line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div>
          <div className="flex items-baseline justify-between pt-3 border-t border-amber-100 mb-3">
            <div>
              <span className="text-xs text-stone-500 font-medium">{t.menu.price}:</span>
              <div className="text-2xl font-black text-amber-600 leading-tight">
                {settings.currency}{item.price}
              </div>
            </div>

            {/* Quick Add or Customize Button */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onCustomize(item)}
                className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer hover:shadow-xs"
                title="Customize spice and tamarind tok"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'bn' ? 'স্বাদ পছন্দ' : 'Options'}</span>
              </button>

              <button
                onClick={() => onQuickAdd(item)}
                className="p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-transform active:scale-90 cursor-pointer"
                title={t.menu.quickAdd}
                aria-label={`Quick add ${name} to cart`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Owner Mode Tools */}
          {isOwnerModeOpen && (
            <div className="mt-2 pt-2 border-t border-dashed border-red-200 flex items-center justify-between text-xs bg-red-50/50 p-2 rounded-lg">
              <span className="text-[11px] font-bold text-stone-600">আইটেম কন্ট্রোল:</span>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(item)}
                    className="text-stone-700 hover:text-amber-700 flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{t.menu.editItem}</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${name}"?`)) {
                      deleteMenuItem(item.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.menu.deleteItem}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
