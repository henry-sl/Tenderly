import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Plus } from 'lucide-react';
import { Document } from '../../types';

interface DocumentSectionProps {
  documents: Document[];
}

/**
 * Section for managing company documents with upload capabilities
 */
const DocumentSection: React.FC<DocumentSectionProps> = ({ documents }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file upload logic here
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Company Documents</h3>
      </div>

      {/* File upload area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors mb-6 ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Upload className="h-6 w-6 text-gray-400" />
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h4>
        <p className="text-gray-500 mb-4">
          Drag and drop files here, or click to browse
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Choose Files
        </button>
        <p className="text-xs text-gray-400 mt-2">
          Supported formats: PDF, DOC, DOCX, PNG, JPG (Max 10MB each)
        </p>
      </div>

      {/* Document list */}
      {documents.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h4>
          <p className="text-gray-500">
            Upload company documents like licenses, insurance certificates, and compliance papers
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((document) => (
            <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{document.name}</h4>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(document.size)} • Uploaded {document.uploadDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document categories */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Recommended Documents</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Business Registration Certificate</li>
          <li>• Tax Compliance Certificate</li>
          <li>• Insurance Certificates</li>
          <li>• Professional Licenses</li>
          <li>• Financial Statements</li>
          <li>• Quality Management Certificates</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentSection;