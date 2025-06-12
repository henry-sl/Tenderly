import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  searchQuery: string;
  filters: {
    location: string;
    budgetRange: string;
    deadline: string;
    category: string;
    status: string;
  };
}

/**
 * Search and filter component for tender listings
 */
const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onFilterChange,
  searchQuery,
  filters
}) => {
  const handleFilterUpdate = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      budgetRange: '',
      deadline: '',
      category: '',
      status: ''
    };
    onFilterChange(clearedFilters);
    onSearch('');
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchQuery !== '';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Keywords
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="search"
              id="search"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search tenders..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={filters.location}
            onChange={(e) => handleFilterUpdate('location', e.target.value)}
            placeholder="Enter city or region"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Budget Range */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            value={filters.budgetRange}
            onChange={(e) => handleFilterUpdate('budgetRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any budget</option>
            <option value="0-50000">Under $50K</option>
            <option value="50000-100000">$50K - $100K</option>
            <option value="100000-500000">$100K - $500K</option>
            <option value="500000-1000000">$500K - $1M</option>
            <option value="1000000-999999999">Over $1M</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterUpdate('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All categories</option>
            <option value="Technology">Technology</option>
            <option value="Construction">Construction</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Transportation">Transportation</option>
            <option value="Energy">Energy</option>
            <option value="Consulting">Consulting</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterUpdate('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All statuses</option>
            <option value="open">Open</option>
            <option value="closing_soon">Closing Soon</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;