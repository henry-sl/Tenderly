import React from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileContent from '../components/profile/ProfileContent';
import { mockCompany } from '../data/mockData';

/**
 * Company profile page with editable sections and compliance tracking
 */
const CompanyProfile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        <p className="mt-2 text-gray-600">
          Manage your company information and compliance documents
        </p>
      </div>

      <ProfileHeader company={mockCompany} />
      <ProfileContent company={mockCompany} />
    </div>
  );
};

export default CompanyProfile;