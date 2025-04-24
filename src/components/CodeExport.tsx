import React from 'react';

interface CodeExportProps {
  generatedCode: { html: string; css: string } | null;
}

const CodeExport: React.FC<CodeExportProps> = ({ generatedCode }) => {
  if (!generatedCode) {
    return (
      <div className="bg-gray-900 text-gray-100 rounded-lg p-8 text-center">
        Generate a landing page to see the code
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 text-gray-100 rounded-lg overflow-hidden">
        <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-2 text-xs text-gray-400 font-mono">HTML</span>
        </div>
        <pre className="p-4 text-sm overflow-auto max-h-[300px]">
          {generatedCode.html}
        </pre>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg overflow-hidden">
        <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-2 text-xs text-gray-400 font-mono">CSS</span>
        </div>
        <pre className="p-4 text-sm overflow-auto max-h-[300px]">
          {generatedCode.css}
        </pre>
      </div>
    </div>
  );
};

export default CodeExport;