import React, { useState } from 'react';
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Company } from '../../types';
import { calculateProfileCompletion, getCompletionMessage, getMissingCriteria } from '../../utils/profileUtils';

interface ProfileCompletionBarProps {
  company: Company;
}

/**
 * Profile completion progress bar with detailed breakdown
 */
const ProfileCompletionBar: React.FC<ProfileCompletionBarProps> = ({ company }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const percentage = calculateProfileCompletion(company);
  const message = getCompletionMessage(percentage);
  const missingCriteria = getMissingCriteria(company);

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getBackgroundColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-50 border-green-200';
    if (percentage >= 80) return 'bg-blue-50 border-blue-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    if (percentage >= 40) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const getTextColor = (percentage: number) => {
    if (percentage === 100) return 'text-green-800';
    if (percentage >= 80) return 'text-blue-800';
    if (percentage >= 60) return 'text-yellow-800';
    if (percentage >= 40) return 'text-orange-800';
    return 'text-red-800';
  };

  const getIconColor = (percentage: number) => {
    if (percentage === 100) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className={`rounded-lg border p-6 transition-all duration-200 ${getBackgroundColor(percentage)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {/* Circular progress indicator */}
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 flex items-center justify-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${getProgressColor(percentage)}`}
                style={{
                  background: `conic-gradient(${getProgressColor(percentage).replace('bg-', '')} ${percentage * 3.6}deg, #e5e7eb 0deg)`
                }}
              >
                <span className="text-white text-sm font-bold">{percentage}%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold ${getTextColor(percentage)}`}>
              Profile Completion
            </h3>
            <p className={`text-sm ${getTextColor(percentage)}`}>
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {percentage === 100 ? (
            <CheckCircle className={`h-6 w-6 ${getIconColor(percentage)}`} />
          ) : (
            <AlertCircle className={`h-6 w-6 ${getIconColor(percentage)}`} />
          )}
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`p-2 rounded-lg hover:bg-white/50 transition-colors ${getTextColor(percentage)}`}
            aria-label={showDetails ? 'Hide details' : 'Show details'}
          >
            {showDetails ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${getProgressColor(percentage)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Detailed breakdown */}
      {showDetails && (
        <div className="space-y-4 pt-4 border-t border-white/30">
          {percentage < 100 && (
            <div>
              <h4 className={`font-medium mb-2 ${getTextColor(percentage)}`}>
                Complete these items to improve your profile:
              </h4>
              <ul className="space-y-1">
                {missingCriteria.map((criterion, index) => (
                  <li key={index} className={`text-sm flex items-center ${getTextColor(percentage)}`}>
                    <div className="w-1.5 h-1.5 bg-current rounded-full mr-2 flex-shrink-0" />
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {percentage === 100 && (
            <div className={`text-sm ${getTextColor(percentage)}`}>
              <p className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Your profile meets all completion criteria and is ready to attract opportunities!
              </p>
            </div>
          )}

          <div className={`text-xs ${getTextColor(percentage)} opacity-75`}>
            <p>
              Profile completion is based on: company details, registration number, established year, 
              contact information, certifications, and uploaded documents.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionBar;