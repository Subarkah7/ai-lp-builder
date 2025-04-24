import React, { useState } from 'react';
import { LandingPageData, FormErrors } from '../types';
import { PlusCircle, Trash2 } from 'lucide-react';

interface InputFormProps {
  landingPageData: LandingPageData;
  setLandingPageData: React.Dispatch<React.SetStateAction<LandingPageData>>;
}

const InputForm: React.FC<InputFormProps> = ({ landingPageData, setLandingPageData }) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'productName':
        return value.trim() ? undefined : 'Nama produk wajib diisi';
      case 'shortDescription':
        return value.trim() ? undefined : 'Deskripsi wajib diisi';
      case 'price':
        return value.trim() ? undefined : 'Harga wajib diisi';
      case 'ctaLink':
        return value.trim() ? undefined : 'Link CTA wajib diisi';
      case 'ctaText':
        return value.trim() ? undefined : 'Teks tombol CTA wajib diisi';
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setLandingPageData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (colorType: keyof LandingPageData['colors'], value: string) => {
    setLandingPageData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  const handleAdvantageChange = (index: number, value: string) => {
    const newAdvantages = [...landingPageData.advantages];
    newAdvantages[index] = value;
    setLandingPageData(prev => ({ ...prev, advantages: newAdvantages }));
  };

  const addAdvantage = () => {
    setLandingPageData(prev => ({
      ...prev,
      advantages: [...prev.advantages, 'Keunggulan baru']
    }));
  };

  const removeAdvantage = (index: number) => {
    const newAdvantages = landingPageData.advantages.filter((_, i) => i !== index);
    setLandingPageData(prev => ({ ...prev, advantages: newAdvantages }));
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="space-y-1">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          Nama Produk
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={landingPageData.productName}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.productName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
          Deskripsi Singkat
        </label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          rows={3}
          value={landingPageData.shortDescription}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.shortDescription ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.shortDescription && <p className="text-red-500 text-xs mt-1">{errors.shortDescription}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            Keunggulan Produk
          </label>
          <button 
            type="button"
            onClick={addAdvantage}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <PlusCircle size={16} className="mr-1" /> Tambah
          </button>
        </div>

        <div className="space-y-3">
          {landingPageData.advantages.map((advantage, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={advantage}
                onChange={(e) => handleAdvantageChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => removeAdvantage(index)}
                className="p-2 text-gray-400 hover:text-red-500"
                disabled={landingPageData.advantages.length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Harga
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={landingPageData.price}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="ctaLink" className="block text-sm font-medium text-gray-700">
          Link Tombol CTA
        </label>
        <input
          type="text"
          id="ctaLink"
          name="ctaLink"
          value={landingPageData.ctaLink}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.ctaLink ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          placeholder="https://example.com"
        />
        {errors.ctaLink && <p className="text-red-500 text-xs mt-1">{errors.ctaLink}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700">
          Teks Tombol CTA
        </label>
        <input
          type="text"
          id="ctaText"
          name="ctaText"
          value={landingPageData.ctaText}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.ctaText ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.ctaText && <p className="text-red-500 text-xs mt-1">{errors.ctaText}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Tema Desain
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setLandingPageData(prev => ({ ...prev, theme: e.target.value }))}
          defaultValue="professional"
        >
          <option value="professional">Profesional</option>
          <option value="simple">Simpel</option>
          <option value="creative">Kreatif</option>
          <option value="modern">Modern</option>
        </select>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Kombinasi Warna
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Warna Utama</label>
            <input
              type="color"
              value={landingPageData.colors.primary}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Warna Sekunder</label>
            <input
              type="color"
              value={landingPageData.colors.secondary}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Warna Aksen</label>
            <input
              type="color"
              value={landingPageData.colors.accent}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Warna Background</label>
            <input
              type="color"
              value={landingPageData.colors.background}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Warna Teks</label>
            <input
              type="color"
              value={landingPageData.colors.text}
              onChange={(e) => handleColorChange('text', e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;