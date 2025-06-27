import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TenderHeader from '../components/tenders/TenderHeader';
import TenderContent from '../components/tenders/TenderContent';
import AIAssistantPanel from '../components/ai/AIAssistantPanel';
import { tenderService } from '../services/tenderService';
import { Tender } from '../types';

/**
 * Detailed view of a single tender with AI assistance
 */
const TenderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTender = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const tenderData = await tenderService.getTenderById(id);
        
        // Transform the database data to match our Tender type
        const transformedTender: Tender = {
          id: tenderData.id,
          title: tenderData.title,
          description: tenderData.description,
          organization: tenderData.organization,
          location: tenderData.location,
          budget: Number(tenderData.budget),
          deadline: new Date(tenderData.deadline),
          publishedDate: new Date(tenderData.published_date),
          status: tenderData.status as 'open' | 'closing_soon' | 'closed',
          category: tenderData.category,
          bidCount: tenderData.bid_count,
          documents: tenderData.documents?.map(doc => ({
            id: doc.id,
            name: doc.name,
            type: doc.type,
            size: doc.size,
            url: doc.url,
            uploadDate: new Date(doc.upload_date)
          })) || [],
          requirements: tenderData.tender_requirements?.map(req => req.requirement) || [],
          contactInfo: tenderData.tender_contacts?.[0] ? {
            name: tenderData.tender_contacts[0].name,
            email: tenderData.tender_contacts[0].email,
            phone: tenderData.tender_contacts[0].phone
          } : {
            name: 'Contact Person',
            email: 'contact@organization.com',
            phone: '+1-000-000-0000'
          }
        };
        
        setTender(transformedTender);
      } catch (err) {
        console.error('Error fetching tender:', err);
        setError('Failed to load tender details');
      } finally {
        setLoading(false);
      }
    };

    fetchTender();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-200 rounded-lg h-64"></div>
              <div className="bg-gray-200 rounded-lg h-96"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-200 rounded-lg h-96"></div>
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