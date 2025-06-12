import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Building, Clock, Users } from 'lucide-react';
import { Tender } from '../../types';

interface TenderCardProps {
  tender: Tender;
}

/**
 * Individual tender card component with status indicators and key information
 */
const TenderCard: React.FC<TenderCardProps> = ({ tender }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closing_soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'closing_soon':
        return 'Closing Soon';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
    <article className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md">
      <Link to={`/tenders/${tender.id}`} className="block p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tender.status)}`}>
                {getStatusLabel(tender.status)}
              </span>
              {daysRemaining <= 7 && daysRemaining > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <Clock className="h-3 w-3 mr-1" />
                  {daysRemaining} days left
                </span>
              )}
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {tender.title}
            </h2>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {tender.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Building className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{tender.organization}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{tender.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium">{formatCurrency(tender.budget)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Due {formatDate(tender.deadline)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{tender.bidCount} bids</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {tender.category}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default TenderCard;