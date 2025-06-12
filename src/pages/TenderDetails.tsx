import React from 'react';
import { useParams } from 'react-router-dom';
import TenderHeader from '../components/tenders/TenderHeader';
import TenderContent from '../components/tenders/TenderContent';
import AIAssistantPanel from '../components/ai/AIAssistantPanel';
import { mockTenders } from '../data/mockData';

/**
 * Detailed view of a single tender with AI assistance
 */
const TenderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tender = mockTenders.find(t => t.id === id);

  if (!tender) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Tender Not Found</h1>
        <p className="text-gray-600">The tender you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <TenderHeader tender={tender} />
          <TenderContent tender={tender} />
        </div>
        
        <div className="lg:col-span-1">
          <AIAssistantPanel tenderId={tender.id} />
        </div>
      </div>
    </div>
  );
};

export default TenderDetails;