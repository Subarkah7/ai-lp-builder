import React, { useState } from 'react';
import { Monitor, Smartphone, Code, Copy, Eye, Check } from 'lucide-react';
import InputForm from './InputForm';
import Preview from './Preview';
import CodeExport from './CodeExport';
import { LandingPageData } from '../types';
import { generateLandingPage } from '../services/ai';

const Builder: React.FC = () => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'editor' | 'code'>('editor');
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{ html: string; css: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [landingPageData, setLandingPageData] = useState<LandingPageData>({
    productName: 'Nama Produk',
    shortDescription: 'Deskripsi produk Anda di sini. Jelaskan apa yang membuat produk Anda istimewa.',
    advantages: ['Fitur 1: Jelaskan fitur utama', 'Fitur 2: Jelaskan fitur lainnya', 'Fitur 3: Satu fitur penting lainnya'],
    price: 'Rp 999.000',
    ctaLink: '#',
    ctaText: 'Mulai Sekarang',
    theme: 'professional',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937'
    }
  });

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      const result = await generateLandingPage(landingPageData);
      setGeneratedCode(result);
      setActiveTab('code');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedCode) return;
    
    const fullCode = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${landingPageData.productName}</title>
  <style>
${generatedCode.css}
  </style>
</head>
<body>
${generatedCode.html}
</body>
</html>`;

    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Panel - Editor */}
      <div className="w-full lg:w-1/3 xl:w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">AI Landing Page Builder</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('editor')}
              className={`p-2 rounded-md ${activeTab === 'editor' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Eye size={18} />
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`p-2 rounded-md ${activeTab === 'code' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Code size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          {activeTab === 'editor' ? (
            <div className="p-4">
              <InputForm 
                landingPageData={landingPageData} 
                setLandingPageData={setLandingPageData} 
              />
              <button
                onClick={handleGenerateCode}
                disabled={isGenerating}
                className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Sedang Membuat...' : 'Buat Landing Page'}
              </button>
            </div>
          ) : (
            <div className="p-4 relative">
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={handleCopyCode}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-300"
                  title="Salin kode"
                  disabled={!generatedCode}
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
              <CodeExport generatedCode={generatedCode} />
            </div>
          )}
        </div>
      </div>
      
      {/* Right Panel - Preview */}
      <div className="w-full lg:w-2/3 xl:w-3/4 bg-gray-100 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-gray-700 font-medium">Preview</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md ${viewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Tampilan desktop"
            >
              <Monitor size={18} />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md ${viewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Tampilan mobile"
            >
              <Smartphone size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <Preview 
            landingPageData={landingPageData} 
            viewMode={viewMode}
            generatedCode={generatedCode}
          />
        </div>
      </div>
    </div>
  );
};

export default Builder;