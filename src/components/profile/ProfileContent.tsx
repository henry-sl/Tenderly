import React, { useState } from 'react';
import CertificationSection from './CertificationSection';
import DocumentSection from './DocumentSection';
import { Company } from '../../types';

interface ProfileContentProps {
  company: Company;
}

/**
 * Main content area for company profile with tabbed sections
 */
const ProfileContent: React.FC<ProfileContentProps> = ({ company }) => {
  const [activeTab, setActiveTab] = useState('certifications');

  const tabs = [
    { id: 'certifications', label: 'Certifications', count: company.certifications.length },
    { id: 'documents', label: 'Documents', count: company.documents.length }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Profile sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'certifications' && (
          <CertificationSection certifications={company.certifications} />
        )}
        
        {activeTab === 'documents' && (
          <DocumentSection documents={company.documents} />
        )}
      </div>
    </div>
  );
};

export default ProfileContent;