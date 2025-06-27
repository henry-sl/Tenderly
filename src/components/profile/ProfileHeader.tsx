import React, { useState } from 'react';
import { Building, Edit2, Save, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Company } from '../../types';

interface ProfileHeaderProps {
  company: Company;
  onUpdateCompany: (company: Company) => Promise<void>;
}

/**
 * Company profile header with key information and edit capabilities
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ company, onUpdateCompany }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState(company);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await onUpdateCompany(editedCompany);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving company:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedCompany(company);
    setIsEditing(false);
    setSaveError(null);
  };

  const getComplianceStatus = () => {
    const activeCerts = company.certifications.filter(cert => 
      !cert.expiryDate || cert.expiryDate > new Date()
    );
    return activeCerts.length >= 2 ? 'compliant' : 'attention';
  };

  const complianceStatus = getComplianceStatus();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Status banner */}
      <div className={`px-6 py-3 ${
        complianceStatus === 'compliant' 
          ? 'bg-green-50 border-b border-green-200' 
          : 'bg-yellow-50 border-b border-yellow-200'
      }`}>
        <div className="flex items-center">
          {complianceStatus === 'compliant' ? (
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
          )}
          <span className={`text-sm font-medium ${
            complianceStatus === 'compliant' ? 'text-green-800' : 'text-yellow-800'
          }`}>
            {complianceStatus === 'compliant' 
              ? 'Profile Complete - All certifications current'
              : 'Action Required - Update certifications or documents'
            }
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Save error message */}
        {saveError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-red-600">{saveError}</p>
          </div>
        )}

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedCompany.name}
                  onChange={(e) => setEditedCompany({...editedCompany, name: e.target.value})}
                  className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
              )}
              <p className="text-gray-600">Registration: {company.registrationNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="inline-flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Company details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            {isEditing ? (
              <select
                value={editedCompany.industry}
                onChange={(e) => setEditedCompany({...editedCompany, industry: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Information Technology">Information Technology</option>
                <option value="Construction">Construction</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Energy">Energy</option>
                <option value="Transportation">Transportation</option>
                <option value="Consulting">Consulting</option>
                <option value="Finance">Finance</option>
                <option value="Retail">Retail</option>
              </select>
            ) : (
              <p className="text-gray-900">{company.industry}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employees</label>
            {isEditing ? (
              <input
                type="number"
                value={editedCompany.employees}
                onChange={(e) => setEditedCompany({...editedCompany, employees: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            ) : (
              <p className="text-gray-900">{company.employees} employees</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Established</label>
            <p className="text-gray-900">{company.established.getFullYear()}</p>
          </div>
        </div>

        {/* Contact information */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedCompany.email}
                  onChange={(e) => setEditedCompany({...editedCompany, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{company.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedCompany.phone}
                  onChange={(e) => setEditedCompany({...editedCompany, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{company.phone}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <textarea
                value={editedCompany.address}
                onChange={(e) => setEditedCompany({...editedCompany, address: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{company.address}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            {isEditing ? (
              <input
                type="url"
                value={editedCompany.website || ''}
                onChange={(e) => setEditedCompany({...editedCompany, website: e.target.value || undefined})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourcompany.com"
              />
            ) : (
              <p className="text-gray-900">{company.website || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;