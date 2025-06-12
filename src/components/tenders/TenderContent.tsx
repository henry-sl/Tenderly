import React, { useState } from 'react';
import { FileText, Download, Mail, Phone, User } from 'lucide-react';
import { Tender } from '../../types';

interface TenderContentProps {
  tender: Tender;
}

/**
 * Main content area for tender details including requirements and documents
 */
const TenderContent: React.FC<TenderContentProps> = ({ tender }) => {
  const [activeTab, setActiveTab] = useState('requirements');

  const tabs = [
    { id: 'requirements', label: 'Requirements', count: tender.requirements.length },
    { id: 'documents', label: 'Documents', count: tender.documents.length },
    { id: 'contact', label: 'Contact Information' }
  ];

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tender details tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'requirements' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tender Requirements
            </h3>
            <div className="space-y-3">
              {tender.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{requirement}</p>
                </div>
              ))}
            </div>
            
            {tender.requirements.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No specific requirements listed for this tender.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tender Documents
            </h3>
            <div className="space-y-3">
              {tender.documents.map((document) => (
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
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              ))}
            </div>
            
            {tender.documents.length === 0 && (
              <div className="text-center py-8">
                <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500">No documents available for this tender.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Contact Person</p>
                    <p className="text-gray-600">{tender.contactInfo.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a 
                      href={`mailto:${tender.contactInfo.email}`} 
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {tender.contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Phone className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a 
                      href={`tel:${tender.contactInfo.phone}`} 
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {tender.contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenderContent;