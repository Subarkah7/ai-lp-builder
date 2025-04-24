import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Builder from './components/Builder';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50">
        <Builder />
      </div>
    </ThemeProvider>
  );
}

export default App;