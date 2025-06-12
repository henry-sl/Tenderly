import React, { useState } from 'react';
import AttestationCard from './AttestationCard';
import { Attestation } from '../../types';

interface AttestationListProps {
  attestations: Attestation[];
}

/**
 * List of attestation cards with filtering and sorting
 */
const AttestationList: React.FC<AttestationListProps> = ({ attestations }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredAttestations = attestations.filter(attestation => {
    if (filter === 'all') return true;
    return attestation.type === filter;
  });

  const sortedAttestations = [...filteredAttestations].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.date.getTime() - a.date.getTime();
      case 'score':
        return b.score - a.score;
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  const filterOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'completion', label: 'Project Completion' },
    { value: 'quality', label: 'Quality' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'reputation', label: 'Reputation' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date (Newest)' },
    { value: 'score', label: 'Score (Highest)' },
    { value: 'type', label: 'Type' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
            Blockchain Attestations
          </h2>
          
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by type
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {sortedAttestations.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-gray-400 text-2xl">🏆</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No attestations found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'No attestations have been recorded yet.'
                : `No ${filter} attestations found. Try adjusting your filter.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedAttestations.map((attestation) => (
              <AttestationCard key={attestation.id} attestation={attestation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttestationList;