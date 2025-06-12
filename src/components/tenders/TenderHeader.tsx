import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Building, Clock, Users, Bookmark, Share2, Download } from 'lucide-react';
import { Tender } from '../../types';

interface TenderHeaderProps {
  tender: Tender;
}

/**
 * Header section for tender details with key information and actions
 */
const TenderHeader: React.FC<TenderHeaderProps> = ({ tender }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closing_soon':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (deadline: Date) => {
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const daysRemaining = getDaysRemaining(tender.deadline);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Status Banner */}
      {daysRemaining <= 7 && daysRemaining > 0 && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800">
              Deadline approaching - {daysRemaining} days remaining
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header with title and actions */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
          <div className="flex-1 mb-4 sm:mb-0">
            <div className="flex items-center space-x-3 mb-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(tender.status)}`}>
                {tender.status === 'open' ? 'Open for Bids' : 
                 tender.status === 'closing_soon' ? 'Closing Soon' : 'Closed'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {tender.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {tender.title}
            </h1>
            
            <p className="text-lg text-gray-600">
              {tender.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'bg-blue-50 border-blue-200 text-blue-600' 
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <button className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Download RFP
            </button>
          </div>
        </div>

        {/* Key information grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Organization</p>
              <p className="text-sm text-gray-600">{tender.organization}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Budget</p>
              <p className="text-sm text-gray-600">{formatCurrency(tender.budget)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Deadline</p>
              <p className="text-sm text-gray-600">{formatDate(tender.deadline)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Bids Submitted</p>
              <p className="text-sm text-gray-600">{tender.bidCount} bids</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{tender.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderHeader;