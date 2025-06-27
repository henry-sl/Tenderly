import React from 'react';
import { Proposal } from '../../types';

interface ContentAreaProps {
  content: string;
  onChange: (content: string) => void;
  proposal: Proposal;
}

/**
 * Main content editing area for proposal content
 */
const ContentArea: React.FC<ContentAreaProps> = ({ content, onChange, proposal }) => {
  return (
    <div className="flex h-[600px]">
      {/* Content editor */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">
            Proposal Content
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Write your complete proposal content below. Use the toolbar above for formatting options.
          </p>
        </div>
        
        <div className="flex-1 p-6">
          <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 leading-relaxed"
            placeholder="Write your proposal content here...

You can include:
• Executive Summary
• Company Overview  
• Technical Approach
• Project Timeline
• Budget & Pricing
• Team & Qualifications
• References
• Any other relevant information"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentArea;