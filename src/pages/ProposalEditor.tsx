import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditorContainer from '../components/proposals/EditorContainer';
import { proposalService } from '../services/proposalService';
import { Proposal } from '../types';

/**
 * Proposal editor page with autosave and export capabilities
 */
const ProposalEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const proposalData = await proposalService.getProposalById(id);
        
        // Transform the database data to match our Proposal type
        const transformedProposal: Proposal = {
          id: proposalData.id,
          tenderId: proposalData.tender_id,
          title: proposalData.title,
          content: proposalData.content,
          status: proposalData.status as 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected',
          submittedDate: proposalData.submitted_date ? new Date(proposalData.submitted_date) : undefined,
          lastModified: new Date(proposalData.updated_at),
          documents: proposalData.documents?.map(doc => ({
            id: doc.id,
            name: doc.name,
            type: doc.type,
            size: doc.size,
            url: doc.url,
            uploadDate: new Date(doc.upload_date)
          })) || []
        };
        
        setProposal(transformedProposal);
      } catch (err) {
        console.error('Error fetching proposal:', err);
        setError('Failed to load proposal');
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="bg-gray-200 rounded-lg h-96"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
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

  if (!proposal) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-600">Proposal not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Proposal Editor</h1>
        <p className="mt-2 text-gray-600">
          Create and edit your tender proposals with AI assistance
        </p>
      </div>

      <EditorContainer proposal={proposal} />
    </div>
  );
};

export default ProposalEditor;