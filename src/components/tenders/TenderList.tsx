import React from 'react';
import TenderCard from './TenderCard';
import { Tender } from '../../types';

interface TenderListProps {
  tenders: Tender[];
}

/**
 * List component that renders tender cards with proper accessibility
 */
const TenderList: React.FC<TenderListProps> = ({ tenders }) => {
  if (tenders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-2xl">📋</span>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tenders found</h3>
          <p className="text-gray-500">
            Adjust your search criteria or filters to find relevant opportunities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div role="region" aria-label="Tender results">
      <div className="space-y-4">
        {tenders.map((tender) => (
          <TenderCard key={tender.id} tender={tender} />
        ))}
      </div>
    </div>
  );
};

export default TenderList;