import React, { useState } from 'react';
import { Proposal } from '../../types';

interface ContentAreaProps {
  content: string;
  onChange: (content: string) => void;
  proposal: Proposal;
}

/**
 * Main content editing area with rich text capabilities
 */
const ContentArea: React.FC<ContentAreaProps> = ({ content, onChange, proposal }) => {
  const [activeSection, setActiveSection] = useState('executive-summary');

  const sections = [
    { id: 'executive-summary', label: 'Executive Summary' },
    { id: 'company-overview', label: 'Company Overview' },
    { id: 'technical-approach', label: 'Technical Approach' },
    { id: 'project-timeline', label: 'Project Timeline' },
    { id: 'budget-pricing', label: 'Budget & Pricing' },
    { id: 'team-qualifications', label: 'Team & Qualifications' },
    { id: 'references', label: 'References' },
    { id: 'appendices', label: 'Appendices' }
  ];

  const sampleContent = {
    'executive-summary': 'Our company is uniquely positioned to deliver exceptional results for this project. With over 5 years of experience in smart city infrastructure and a proven track record of successful implementations, we offer innovative solutions that align perfectly with your requirements.\n\nKey highlights of our proposal:\n• Comprehensive smart city expertise\n• ISO 27001 certified security practices\n• Local presence and government experience\n• Cost-effective implementation approach',
    'company-overview': 'TechSolutions Ltd is a leading technology company specializing in smart city infrastructure development. Founded in 2019, we have grown to become a trusted partner for municipalities and government agencies across the region.\n\nOur expertise includes:\n• IoT sensor networks and data analytics\n• Traffic management systems\n• Digital citizen services platforms\n• Cybersecurity and compliance',
    'technical-approach': 'Our technical approach leverages cutting-edge technologies and industry best practices to deliver a robust, scalable smart city infrastructure solution.\n\n1. System Architecture\n   - Cloud-native microservices architecture\n   - Real-time data processing capabilities\n   - API-first integration approach\n\n2. Implementation Methodology\n   - Agile development with bi-weekly sprints\n   - Continuous integration and deployment\n   - Comprehensive testing at each phase',
  };

  const getCurrentContent = () => {
    return sampleContent[activeSection as keyof typeof sampleContent] || 'Content for this section will be added here...';
  };

  return (
    <div className="flex h-[600px]">
      {/* Section navigation */}
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Proposal Sections</h3>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content editor */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">
            {sections.find(s => s.id === activeSection)?.label}
          </h2>
        </div>
        
        <div className="flex-1 p-6">
          <textarea
            value={getCurrentContent()}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 leading-relaxed"
            placeholder={`Write your ${sections.find(s => s.id === activeSection)?.label.toLowerCase()} here...`}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentArea;