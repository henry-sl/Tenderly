import React, { useState } from 'react';
import TenderList from '../components/tenders/TenderList';
import SearchFilters from '../components/tenders/SearchFilters';
import { mockTenders } from '../data/mockData';

/**
 * Main tender feed page with search and filtering capabilities
 */
const TenderFeed: React.FC = () => {
  const [filteredTenders, setFilteredTenders] = useState(mockTenders);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    budgetRange: '',
    deadline: '',
    category: '',
    status: ''
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const applyFilters = (query: string, currentFilters: typeof filters) => {
    let filtered = mockTenders;

    // Apply search query
    if (query) {
      filtered = filtered.filter(tender =>
        tender.title.toLowerCase().includes(query.toLowerCase()) ||
        tender.description.toLowerCase().includes(query.toLowerCase()) ||
        tender.organization.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply filters
    if (currentFilters.location) {
      filtered = filtered.filter(tender => 
        tender.location.toLowerCase().includes(currentFilters.location.toLowerCase())
      );
    }

    if (currentFilters.budgetRange) {
      const [min, max] = currentFilters.budgetRange.split('-').map(Number);
      filtered = filtered.filter(tender => {
        const budget = tender.budget;
        return budget >= min && (max ? budget <= max : true);
      });
    }

    if (currentFilters.category) {
      filtered = filtered.filter(tender => tender.category === currentFilters.category);
    }

    if (currentFilters.status) {
      filtered = filtered.filter(tender => tender.status === currentFilters.status);
    }

    setFilteredTenders(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Available Tenders</h1>
            <p className="mt-2 text-gray-600">
              Discover and bid on government and private sector opportunities
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {filteredTenders.length} tenders found
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <SearchFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>
        
        <div className="lg:col-span-3">
          <TenderList tenders={filteredTenders} />
        </div>
      </div>
    </div>
  );
};

export default TenderFeed;