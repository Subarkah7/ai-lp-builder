import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../data/themes';

const ThemeSelector: React.FC = () => {
  const { selectedTheme, setSelectedTheme } = useTheme();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Theme
      </label>
      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setSelectedTheme(theme)}
            className={`
              p-3 border rounded-lg text-left transition duration-200
              ${selectedTheme.id === theme.id 
                ? `border-2 border-blue-500 ring-2 ring-blue-200` 
                : `border-gray-200 hover:border-gray-300`
              }
            `}
          >
            <div className="flex items-center mb-2">
              <span 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: theme.primaryColor }}
              ></span>
              <span className="font-medium">{theme.name}</span>
            </div>
            <div className="flex space-x-1">
              <span 
                className="w-6 h-2 rounded-full" 
                style={{ backgroundColor: theme.primaryColor }}
              ></span>
              <span 
                className="w-4 h-2 rounded-full" 
                style={{ backgroundColor: theme.secondaryColor }}
              ></span>
              <span 
                className="w-3 h-2 rounded-full" 
                style={{ backgroundColor: theme.accentColor }}
              ></span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;