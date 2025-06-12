import React from 'react';
import EditorContainer from '../components/proposals/EditorContainer';
import { mockProposals } from '../data/mockData';

/**
 * Proposal editor page with autosave and export capabilities
 */
const ProposalEditor: React.FC = () => {
  // In a real app, you'd get the proposal ID from the URL params
  const proposal = mockProposals[0];

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