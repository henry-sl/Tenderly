import React from 'react';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface AutosaveIndicatorProps {
  lastSaved: Date;
  isSaving: boolean;
  error?: string | null;
}

/**
 * Indicator showing autosave status and last saved time
 */
const AutosaveIndicator: React.FC<AutosaveIndicatorProps> = ({ lastSaved, isSaving, error }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isSaving) {
    return (
      <div className="flex items-center text-sm text-gray-600">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Saving...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-sm text-red-600">
        <AlertCircle className="h-4 w-4 mr-2" />
        Save failed
      </div>
    );
  }

  return (
    <div className="flex items-center text-sm text-gray-600">
      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
      <span>Saved at {formatTime(lastSaved)}</span>
    </div>
  );
};

export default AutosaveIndicator;