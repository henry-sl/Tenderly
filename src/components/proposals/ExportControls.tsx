import React, { useState } from 'react';
import { Download, FileText, File, ChevronDown } from 'lucide-react';

/**
 * Export controls for proposal documents with multiple format options
 */
const ExportControls: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const exportOptions = [
    { id: 'pdf', label: 'Export as PDF', icon: FileText, description: 'Professional format for submission' },
    { id: 'docx', label: 'Export as DOCX', icon: File, description: 'Editable Microsoft Word format' },
    { id: 'html', label: 'Export as HTML', icon: File, description: 'Web-friendly format' }
  ];

  const handleExport = (format: string) => {
    // Simulate export process
    console.log(`Exporting as ${format}`);
    setShowDropdown(false);
    // In a real app, this would trigger the export functionality
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {exportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleExport(option.id)}
                className="w-full flex items-start px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-gray-100 rounded-lg mr-3">
                  <option.icon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-200 px-4 py-3">
            <p className="text-xs text-gray-500">
              All exports include proposal content, formatting, and metadata
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportControls;