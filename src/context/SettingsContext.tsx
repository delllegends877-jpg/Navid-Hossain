import React, { createContext, useContext, useState, useEffect } from 'react';
import { RestaurantSettings, MenuItem } from '../types';
import { DEFAULT_SETTINGS } from '../data/defaultSettings';
import { INITIAL_MENU } from '../data/initialMenu';

interface SettingsContextType {
  settings: RestaurantSettings;
  updateSettings: (newSettings: Partial<RestaurantSettings>) => void;
  resetSettings: () => void;
  menuItems: MenuItem[];
  updateMenuItem: (item: MenuItem) => void;
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  resetMenu: () => void;
  isOwnerModeOpen: boolean;
  setIsOwnerModeOpen: (isOpen: boolean) => void;
  isHostingGuideOpen: boolean;
  setIsHostingGuideOpen: (isOpen: boolean) => void;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (isOpen: boolean) => void;
  isTermsOpen: boolean;
  setIsTermsOpen: (isOpen: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<RestaurantSettings>(() => {
    try {
      const saved = localStorage.getItem('fuchka_house_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('fuchka_house_menu');
      return saved ? JSON.parse(saved) : INITIAL_MENU;
    } catch {
      return INITIAL_MENU;
    }
  });

  const [isOwnerModeOpen, setIsOwnerModeOpen] = useState(false);
  const [isHostingGuideOpen, setIsHostingGuideOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('fuchka_house_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('fuchka_house_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  const updateSettings = (newSettings: Partial<RestaurantSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('fuchka_house_settings');
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const addMenuItem = (newItem: MenuItem) => {
    setMenuItems(prev => [newItem, ...prev]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const resetMenu = () => {
    setMenuItems(INITIAL_MENU);
    localStorage.removeItem('fuchka_house_menu');
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        menuItems,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        resetMenu,
        isOwnerModeOpen,
        setIsOwnerModeOpen,
        isHostingGuideOpen,
        setIsHostingGuideOpen,
        isPrivacyOpen,
        setIsPrivacyOpen,
        isTermsOpen,
        setIsTermsOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
