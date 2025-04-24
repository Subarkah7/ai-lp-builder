import React, { useEffect, useRef } from 'react';
import { LandingPageData } from '../types';

interface PreviewProps {
  landingPageData: LandingPageData;
  viewMode: 'desktop' | 'mobile';
  generatedCode: { html: string; css: string } | null;
}

const Preview: React.FC<PreviewProps> = ({ landingPageData, viewMode, generatedCode }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const containerClass = viewMode === 'desktop' 
    ? 'w-full'
    : 'w-[375px]';

  useEffect(() => {
    if (iframeRef.current && generatedCode) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>${generatedCode.css}</style>
            </head>
            <body>${generatedCode.html}</body>
          </html>
        `);
        doc.close();
      }
    }
  }, [generatedCode]);

  if (!generatedCode) {
    return (
      <div className={`${containerClass} h-[600px] bg-white flex items-center justify-center text-gray-500`}>
        Klik "Generate Landing Page" untuk melihat preview
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      className={`${containerClass} h-[600px] bg-white shadow-lg transition-all duration-300`}
      title="Landing Page Preview"
    />
  );
}

export default Preview;