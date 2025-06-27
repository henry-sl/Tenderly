import React, { useState, useEffect } from 'react';
import TenderList from '../components/tenders/TenderList';
import SearchFilters from '../components/tenders/SearchFilters';
import { tenderService } from '../services/tenderService';
import { Tender } from '../types';

/**
 * Main tender feed page with search and filtering capabilities
 */
const TenderFeed: React.FC = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [filteredTenders, setFilteredTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    budgetRange: '',
    deadline: '',
    category: '',
    status: ''
  });

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        setLoading(true);
        const tendersData = await tenderService.getTenders();
        
        // Transform the database data to match our Tender type
        const transformedTenders: Tender[] = tendersData.map(tender => ({
          id: tender.id,
          title: tender.title,
          description: tender.description,
          organization: tender.organization,
          location: tender.location,
          budget: Number(tender.budget),
          deadline: new Date(tender.deadline),
          publishedDate: new Date(tender.published_date),
          status: tender.status as 'open' | 'closing_soon' | 'closed',
          category: tender.category,
          bidCount: tender.bid_count,
          documents: tender.documents?.map(doc => ({
            id: doc.id,
            name: doc.name,
            type: doc.type,
            size: doc.size,
            url: doc.url,
            uploadDate: new Date(doc.upload_date)
          })) || [],
          requirements: tender.tender_requirements?.map(req => req.requirement) || [],
          contactInfo: tender.tender_contacts?.[0] ? {
            name: tender.tender_contacts[0].name,
            email: tender.tender_contacts[0].email,
            phone: tender.tender_contacts[0].phone
          } : {
            name: 'Contact Person',
            email: 'contact@organization.com',
            phone: '+1-000-000-0000'
          }
        }));
        
        setTenders(transformedTenders);
        setFilteredTenders(transformedTenders);
      } catch (err) {
        console.error('Error fetching tenders:', err);
        setError('Failed to load tenders');
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const applyFilters = (query: string, currentFilters: typeof filters) => {
    let filtered = tenders;

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div className="lg:col-span-3 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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