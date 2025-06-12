import React from 'react';
import { Shield, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { Attestation } from '../../types';

interface ReputationOverviewProps {
  attestations: Attestation[];
}

/**
 * Overview section showing reputation metrics and summary
 */
const ReputationOverview: React.FC<ReputationOverviewProps> = ({ attestations }) => {
  const averageScore = attestations.reduce((sum, att) => sum + att.score, 0) / attestations.length;
  const verifiedCount = attestations.filter(att => att.verified).length;
  const recentAttestations = attestations.filter(att => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return att.date > threeMonthsAgo;
  }).length;

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 95) return 'bg-green-100';
    if (score >= 85) return 'bg-blue-100';
    if (score >= 75) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Reputation Score</h2>
            <p className="text-blue-100">Blockchain-verified performance metrics</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">{averageScore.toFixed(1)}</div>
            <div className="text-blue-100">out of 100</div>
          </div>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`mx-auto w-12 h-12 ${getScoreBackground(averageScore)} rounded-full flex items-center justify-center mb-3`}>
              <Award className={`h-6 w-6 ${getScoreColor(averageScore)}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>

          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{verifiedCount}</div>
            <div className="text-sm text-gray-600">Verified Attestations</div>
          </div>

          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{recentAttestations}</div>
            <div className="text-sm text-gray-600">Recent (3 months)</div>
          </div>

          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Blockchain Verified</div>
          </div>
        </div>

        {/* Performance breakdown */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['completion', 'quality', 'compliance', 'reputation'].map((type) => {
              const typeAttestations = attestations.filter(att => att.type === type);
              const typeScore = typeAttestations.length > 0 
                ? typeAttestations.reduce((sum, att) => sum + att.score, 0) / typeAttestations.length 
                : 0;
              
              return (
                <div key={type} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
                    <span className={`text-sm font-bold ${getScoreColor(typeScore)}`}>
                      {typeScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        typeScore >= 95 ? 'bg-green-500' :
                        typeScore >= 85 ? 'bg-blue-500' :
                        typeScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${typeScore}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReputationOverview;