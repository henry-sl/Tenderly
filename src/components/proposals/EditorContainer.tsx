import React, { useState, useEffect } from 'react';
import ToolbarSection from './ToolbarSection';
import ContentArea from './ContentArea';
import AutosaveIndicator from './AutosaveIndicator';
import ExportControls from './ExportControls';
import { proposalService } from '../../services/proposalService';
import { Proposal } from '../../types';

interface EditorContainerProps {
  proposal: Proposal;
}

/**
 * Main container for the proposal editor with toolbar and content areas
 */
const EditorContainer: React.FC<EditorContainerProps> = ({ proposal }) => {
  const [content, setContent] = useState(proposal.content);
  const [title, setTitle] = useState(proposal.title);
  const [lastSaved, setLastSaved] = useState(new Date(proposal.lastModified));
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Update local state when proposal prop changes
  useEffect(() => {
    setContent(proposal.content);
    setTitle(proposal.title);
    setLastSaved(new Date(proposal.lastModified));
  }, [proposal]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      await proposalService.updateProposal(proposal.id, {
        title,
        content
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving proposal:', error);
      setSaveError('Failed to save proposal');
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // Clear any previous save errors when user starts typing
    if (saveError) {
      setSaveError(null);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    // Clear any previous save errors when user starts typing
    if (saveError) {
      setSaveError(null);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header with title and controls */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-xl font-semibold text-gray-900 bg-transparent border-none outline-none w-full focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              placeholder="Proposal title..."
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <AutosaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
            <ExportControls />
          </div>
        </div>
        
        {saveError && (
          <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {saveError}
          </div>
        )}
      </div>

      {/* Toolbar */}
      <ToolbarSection onSave={handleSave} />

      {/* Content area */}
      <ContentArea 
        content={content} 
        onChange={handleContentChange}
        proposal={proposal}
      />
    </div>
  );
};

export default EditorContainer;