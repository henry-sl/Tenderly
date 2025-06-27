import React, { useState, useEffect } from 'react';
import { X, Clock, User, RotateCcw, FileText, AlertCircle } from 'lucide-react';
import { proposalService } from '../../services/proposalService';
import { ProposalVersion } from '../../types';

interface VersionHistoryModalProps {
  proposalId: string;
  isOpen: boolean;
  onClose: () => void;
  onRestore: (versionId: string) => void;
}

/**
 * Modal component for viewing and managing proposal version history
 */
const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  proposalId,
  isOpen,
  onClose,
  onRestore
}) => {
  const [versions, setVersions] = useState<ProposalVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restoringVersionId, setRestoringVersionId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && proposalId) {
      fetchVersions();
    }
  }, [isOpen, proposalId]);

  const fetchVersions = async () => {
    try {
      setLoading(true);
      setError(null);
      const versionsData = await proposalService.getProposalVersions(proposalId);
      
      const transformedVersions: ProposalVersion[] = versionsData.map(version => ({
        id: version.id,
        proposalId: version.proposal_id,
        content: version.content,
        title: version.title,
        versionNumber: version.version_number,
        createdAt: new Date(version.created_at),
        createdBy: version.created_by || 'Unknown'
      }));
      
      setVersions(transformedVersions);
    } catch (err) {
      console.error('Error fetching versions:', err);
      setError('Failed to load version history');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (versionId: string) => {
    try {
      setRestoringVersionId(versionId);
      await onRestore(versionId);
      onClose();
    } catch (err) {
      console.error('Error restoring version:', err);
      setError('Failed to restore version');
    } finally {
      setRestoringVersionId(null);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getContentPreview = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Version History</h2>
            <p className="text-sm text-gray-600 mt-1">
              View and restore previous versions of your proposal
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading versions...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && versions.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No versions found</h3>
              <p className="text-gray-500">
                Versions will appear here as you save changes to your proposal.
              </p>
            </div>
          )}

          {!loading && !error && versions.length > 0 && (
            <div className="space-y-4">
              {versions.map((version, index) => (
                <div
                  key={version.id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Version {version.versionNumber}
                        </span>
                        {index === 0 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Latest
                          </span>
                        )}
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {version.title || 'Untitled Proposal'}
                      </h4>
                      
                      <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatDate(version.createdAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>Auto-saved</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {getContentPreview(version.content)}
                      </p>
                    </div>
                    
                    <div className="ml-4 flex-shrink-0">
                      {index !== 0 && (
                        <button
                          onClick={() => handleRestore(version.id)}
                          disabled={restoringVersionId === version.id}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {restoringVersionId === version.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                              Restoring...
                            </>
                          ) : (
                            <>
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Restore
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {version.content && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                        View full content
                      </summary>
                      <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                          {version.content}
                        </pre>
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Versions are automatically created when you save your proposal
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistoryModal;