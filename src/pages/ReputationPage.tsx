import React from 'react';
import AttestationList from '../components/reputation/AttestationList';
import ReputationOverview from '../components/reputation/ReputationOverview';
import { mockAttestations } from '../data/mockData';

/**
 * Reputation page displaying blockchain attestations and company reputation
 */
const ReputationPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Reputation</h1>
        <p className="mt-2 text-gray-600">
          Your blockchain-verified reputation and performance attestations
        </p>
      </div>

      <ReputationOverview attestations={mockAttestations} />
      <AttestationList attestations={mockAttestations} />
    </div>
  );
};

export default ReputationPage;