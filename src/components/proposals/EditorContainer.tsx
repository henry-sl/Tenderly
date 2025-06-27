import React, { useState, useEffect, useCallback } from 'react';
import ToolbarSection from './ToolbarSection';
import ContentArea from './ContentArea';
import AutosaveIndicator from './AutosaveIndicator';
import ExportControls from './ExportControls';
import VersionHistoryModal from './VersionHistoryModal';
import { proposalService } from '../../services/proposalService';
import { useAuth } from '../../hooks/useAuth';
import { useEditorHistory } from '../../hooks/useEditorHistory';
import { Proposal } from '../../types';

interface EditorContainerProps {
  proposal: Proposal;
}

/**
 * Main container for the proposal editor with toolbar and content areas
 */
const EditorContainer: React.FC<EditorContainerProps> = ({ proposal }) => {
  const { user } = useAuth();
  const [content, setContent] = useState(proposal.content);
  const [title, setTitle] = useState(proposal.title);
  const [lastSaved, setLastSaved] = useState(new Date(proposal.lastModified));
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // Initialize editor history
  const {
    addState,
    undo,
    redo,
    getCurrentState,
    canUndo,
    canRedo,
    initializeHistory
  } = useEditorHistory({
    maxStates: 50,
    debounceMs: 1000
  });

  // Initialize history with current proposal content
  useEffect(() => {
    initializeHistory(proposal.content, proposal.title);
  }, [proposal.id, initializeHistory]);

  // Update local state when proposal prop changes
  useEffect(() => {
    setContent(proposal.content);
    setTitle(proposal.title);
    setLastSaved(new Date(proposal.lastModified));
  }, [proposal]);

  // Add state to history when content or title changes
  useEffect(() => {
    if (content !== proposal.content || title !== proposal.title) {
      addState(content, title);
    }
  }, [content, title, addState, proposal.content, proposal.title]);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveError(null);
    
    try {
      // Update the main proposal
      await proposalService.updateProposal(proposal.id, {
        title,
        content
      });

      // Save version to history
      await proposalService.saveProposalVersion(
        proposal.id,
        content,
        title,
        user.id
      );

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

  const handleUndo = useCallback(() => {
    undo();
    const state = getCurrentState();
    if (state) {
      setContent(state.content);
      setTitle(state.title);
    }
  }, [undo, getCurrentState]);

  const handleRedo = useCallback(() => {
    redo();
    const state = getCurrentState();
    if (state) {
      setContent(state.content);
      setTitle(state.title);
    }
  }, [redo, getCurrentState]);

  const handleRestoreVersion = async (versionId: string) => {
    if (!user) return;

    try {
      const restoredProposal = await proposalService.restoreProposalVersion(
        proposal.id,
        versionId,
        user.id
      );

      // Update local state with restored content
      setContent(restoredProposal.content);
      setTitle(restoredProposal.title);
      setLastSaved(new Date());

      // Add restored state to history
      addState(restoredProposal.content, restoredProposal.title);
    } catch (error) {
      console.error('Error restoring version:', error);
      setSaveError('Failed to restore version');
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
            <AutosaveIndicator 
              lastSaved={lastSaved} 
              isSaving={isSaving} 
              error={saveError}
            />
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
      <ToolbarSection 
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        onShowVersionHistory={() => setShowVersionHistory(true)}
      />

      {/* Content area */}
      <ContentArea 
        content={content} 
        onChange={handleContentChange}
        proposal={proposal}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        proposalId={proposal.id}
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        onRestore={handleRestoreVersion}
      />
    </div>
  );
};

export default EditorContainer;