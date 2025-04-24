import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Theme, themes } from '../data/themes';

interface ThemeContextType {
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};