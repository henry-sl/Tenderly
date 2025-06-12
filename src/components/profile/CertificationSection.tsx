import React, { useState } from 'react';
import { Award, Plus, Calendar, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { Certification } from '../../types';

interface CertificationSectionProps {
  certifications: Certification[];
}

/**
 * Section for managing company certifications with status indicators
 */
const CertificationSection: React.FC<CertificationSectionProps> = ({ certifications }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const getCertificationStatus = (cert: Certification) => {
    if (!cert.expiryDate) return 'permanent';
    
    const now = new Date();
    const expiry = cert.expiryDate;
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 30) return 'expiring';
    return 'valid';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expiring':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'permanent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'valid':
        return 'Valid';
      case 'expiring':
        return 'Expiring Soon';
      case 'expired':
        return 'Expired';
      case 'permanent':
        return 'No Expiry';
      default:
        return 'Unknown';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Award className="h-6 w-6 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No certifications added</h4>
          <p className="text-gray-500 mb-4">Add your company certifications to improve tender eligibility</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Certification
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certifications.map((cert) => {
            const status = getCertificationStatus(cert);
            return (
              <div key={cert.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                      <p className="text-sm text-gray-600">Issued by {cert.issuedBy}</p>
                    </div>
                  </div>
                  
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                    {status === 'valid' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {status === 'expiring' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {status === 'expired' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {getStatusLabel(status)}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Issued: {cert.issueDate.toLocaleDateString()}</span>
                  </div>
                  
                  {cert.expiryDate && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Expires: {cert.expiryDate.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {cert.documentUrl && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a
                      href={cert.documentUrl}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add certification form modal would go here */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Certification</h3>
            <p className="text-gray-600 mb-4">Feature coming soon - certification management form</p>
            <button
              onClick={() => setShowAddForm(false)}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationSection;