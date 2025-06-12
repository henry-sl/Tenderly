import React, { useState } from 'react';
import { Shield, ExternalLink, Calendar, User, CheckCircle, AlertCircle } from 'lucide-react';
import BlockchainVerification from './BlockchainVerification';
import { Attestation } from '../../types';

interface AttestationCardProps {
  attestation: Attestation;
}

/**
 * Individual attestation card with blockchain verification details
 */
const AttestationCard: React.FC<AttestationCardProps> = ({ attestation }) => {
  const [showVerification, setShowVerification] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'completion':
        return '✅';
      case 'quality':
        return '⭐';
      case 'compliance':
        return '📋';
      case 'reputation':
        return '🏆';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'completion':
        return 'bg-green-100 text-green-800';
      case 'quality':
        return 'bg-blue-100 text-blue-800';
      case 'compliance':
        return 'bg-purple-100 text-purple-800';
      case 'reputation':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getTypeIcon(attestation.type)}</div>
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(attestation.type)}`}>
              {attestation.type.charAt(0).toUpperCase() + attestation.type.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${getScoreColor(attestation.score)}`}>
            {attestation.score}
          </div>
          <div className="text-sm text-gray-500">Score</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-900 mb-4 leading-relaxed">
        {attestation.description}
      </p>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <User className="h-4 w-4 mr-2" />
          <span>Issued by: <span className="font-medium">{attestation.issuer}</span></span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Date: {formatDate(attestation.date)}</span>
        </div>
      </div>

      {/* Verification status */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center">
          {attestation.verified ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Blockchain Verified</span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-600">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Pending Verification</span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setShowVerification(true)}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Shield className="h-4 w-4 mr-1" />
          View Details
        </button>
      </div>

      {/* Blockchain verification modal */}
      {showVerification && (
        <BlockchainVerification
          attestation={attestation}
          onClose={() => setShowVerification(false)}
        />
      )}
    </div>
  );
};

export default AttestationCard;