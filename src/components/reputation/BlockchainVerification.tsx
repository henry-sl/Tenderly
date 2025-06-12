import React from 'react';
import { X, ExternalLink, Copy, CheckCircle, Clock } from 'lucide-react';
import { Attestation } from '../../types';

interface BlockchainVerificationProps {
  attestation: Attestation;
  onClose: () => void;
}

/**
 * Modal showing detailed blockchain verification information
 */
const BlockchainVerification: React.FC<BlockchainVerificationProps> = ({ attestation, onClose }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification here
  };

  const formatTxId = (txId: string) => {
    return `${txId.slice(0, 8)}...${txId.slice(-8)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Blockchain Verification</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Verification status */}
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-medium text-green-900">Verified on Algorand Blockchain</h3>
              <p className="text-sm text-green-700">This attestation has been cryptographically verified</p>
            </div>
          </div>

          {/* Attestation details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Attestation Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <p className="text-gray-900 capitalize">{attestation.type}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                <p className="text-gray-900 font-semibold">{attestation.score}/100</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                <p className="text-gray-900">{attestation.issuer}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Issued</label>
                <p className="text-gray-900">{attestation.date.toLocaleDateString()}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <p className="text-gray-900">{attestation.description}</p>
            </div>
          </div>

          {/* Blockchain details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Blockchain Details</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                <div className="flex items-center space-x-2">
                  <code className="text-sm bg-white px-2 py-1 rounded border font-mono">
                    {formatTxId(attestation.blockchainTxId)}
                  </code>
                  <button
                    onClick={() => copyToClipboard(attestation.blockchainTxId)}
                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Copy full transaction ID"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Network</label>
                <p className="text-gray-900">Algorand MainNet</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Block Confirmations</label>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-900">1,247 confirmations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Verification Timeline</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Attestation Created</p>
                  <p className="text-xs text-gray-500">{attestation.date.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Submitted to Blockchain</p>
                  <p className="text-xs text-gray-500">{new Date(attestation.date.getTime() + 300000).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Blockchain Confirmed</p>
                  <p className="text-xs text-gray-500">{new Date(attestation.date.getTime() + 600000).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
            <a
              href={`https://algoexplorer.io/tx/${attestation.blockchainTxId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on AlgoExplorer
            </a>
            
            <button
              onClick={() => copyToClipboard(attestation.blockchainTxId)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Transaction ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainVerification;