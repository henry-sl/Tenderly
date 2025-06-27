import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Save,
  Undo,
  Redo,
  Bot,
  FileText,
  History
} from 'lucide-react';

interface ToolbarSectionProps {
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onShowVersionHistory: () => void;
}

/**
 * Toolbar with formatting controls, undo/redo, and version history
 */
const ToolbarSection: React.FC<ToolbarSectionProps> = ({ 
  onSave, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  onShowVersionHistory
}) => {
  return (
    <div className="px-6 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {/* Text formatting */}
          <div className="flex items-center space-x-1 border-r border-gray-200 pr-3 mr-3">
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </button>
          </div>

          {/* Lists and formatting */}
          <div className="flex items-center space-x-1 border-r border-gray-200 pr-3 mr-3">
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </button>
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center space-x-1 border-r border-gray-200 pr-3 mr-3">
            <button 
              onClick={onUndo}
              disabled={!canUndo}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button 
              onClick={onRedo}
              disabled={!canRedo}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </button>
          </div>

          {/* Version History */}
          <div className="flex items-center space-x-1">
            <button 
              onClick={onShowVersionHistory}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              title="Version History"
            >
              <History className="h-4 w-4 mr-2" />
              Versions
            </button>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Bot className="h-4 w-4 mr-2" />
            AI Assist
          </button>
          
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </button>
          
          <button 
            onClick={onSave}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolbarSection;