import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileContent from '../components/profile/ProfileContent';
import { useAuth } from '../hooks/useAuth';
import { companyService } from '../services/companyService';
import { Company } from '../types';

/**
 * Company profile page with editable sections and compliance tracking
 */
const CompanyProfile: React.FC = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const companyData = await companyService.getCompanyByUserId(user.id);
        
        if (companyData) {
          // Transform the database data to match our Company type
          const transformedCompany: Company = {
            id: companyData.id,
            name: companyData.name,
            registrationNumber: companyData.registration_number,
            address: companyData.address,
            phone: companyData.phone,
            email: companyData.email,
            website: companyData.website || undefined,
            industry: companyData.industry,
            employees: companyData.employees,
            established: new Date(companyData.established),
            certifications: companyData.certifications?.map(cert => ({
              id: cert.id,
              name: cert.name,
              issuedBy: cert.issued_by,
              issueDate: new Date(cert.issue_date),
              expiryDate: cert.expiry_date ? new Date(cert.expiry_date) : undefined,
              documentUrl: cert.document_url || undefined
            })) || [],
            documents: companyData.documents?.map(doc => ({
              id: doc.id,
              name: doc.name,
              type: doc.type,
              size: doc.size,
              url: doc.url,
              uploadDate: new Date(doc.upload_date)
            })) || []
          };
          
          setCompany(transformedCompany);
        }
      } catch (err) {
        console.error('Error fetching company:', err);
        setError('Failed to load company information');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="bg-gray-200 rounded-lg h-64 mb-6"></div>
          <div className="bg-gray-200 rounded-lg h-96"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-600">No company profile found. Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        <p className="mt-2 text-gray-600">
          Manage your company information and compliance documents
        </p>
      </div>

      <ProfileHeader company={company} />
      <ProfileContent company={company} />
    </div>
  );
};

export default CompanyProfile;