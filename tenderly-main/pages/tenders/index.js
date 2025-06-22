// pages/tenders/index.js
// This page displays a list of available tenders
// It includes search and filtering functionality

import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../lib/api';
import TenderCard from '../../components/TenderCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function TenderFeed() {
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Fetch tenders data from the API
  const { data: tenders, error, isLoading } = useSWR('/api/tenders', fetcher);

  // Available tender categories for filtering
  const categories = [
    'All Categories',
    'Construction',
    'IT Services',
    'Consulting',
    'Healthcare',
    'Education',
    'Transportation',
  ];

  // Filter tenders based on search term and selected category
  const filteredTenders = tenders?.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || 
                           tender.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">Failed to load tenders. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Tenders</h1>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search input */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search tenders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
          
          {/* Category filter dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All Categories' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tender Grid */}
      {isLoading ? (
        // Loading state - skeleton cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card">
              <div className="skeleton h-6 w-3/4 mb-3"></div>
              <div className="skeleton h-4 w-1/2 mb-2"></div>
              <div className="skeleton h-4 w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredTenders.length > 0 ? (
        // Render tender cards when data is available
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenders.map(tender => (
            <TenderCard key={tender.id} tender={tender} />
          ))}
        </div>
      ) : (
        // No results message
        <div className="text-center py-12">
          <p className="text-gray-500">No tenders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}