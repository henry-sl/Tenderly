import React, { useState } from 'react';
import ToolbarSection from './ToolbarSection';
import ContentArea from './ContentArea';
import AutosaveIndicator from './AutosaveIndicator';
import ExportControls from './ExportControls';
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
  const [lastSaved, setLastSaved] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
    }, 1000);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // Trigger autosave after a delay
    setTimeout(handleSave, 2000);
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
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold text-gray-900 bg-transparent border-none outline-none w-full focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              placeholder="Proposal title..."
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <AutosaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
            <ExportControls />
          </div>
        </div>
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