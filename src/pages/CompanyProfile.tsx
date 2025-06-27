import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileContent from '../components/profile/ProfileContent';
import { useAuth } from '../hooks/useAuth';
import { companyService } from '../services/companyService';
import { Company, CertificationFormData } from '../types';

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

  const handleUpdateCompany = async (updatedCompany: Company): Promise<void> => {
    try {
      // Prepare the update data with only the fields that can be updated
      const updateData = {
        name: updatedCompany.name,
        address: updatedCompany.address,
        phone: updatedCompany.phone,
        email: updatedCompany.email,
        website: updatedCompany.website || null,
        industry: updatedCompany.industry,
        employees: updatedCompany.employees,
        established: updatedCompany.established.toISOString().split('T')[0] // Convert to YYYY-MM-DD format
      };

      // Call the service to update the company in Supabase
      const updatedData = await companyService.updateCompany(updatedCompany.id, updateData);

      // Update the local state with the new data, preserving certifications and documents
      setCompany(prevCompany => {
        if (!prevCompany) return null;
        
        return {
          ...prevCompany,
          name: updatedData.name,
          address: updatedData.address,
          phone: updatedData.phone,
          email: updatedData.email,
          website: updatedData.website || undefined,
          industry: updatedData.industry,
          employees: updatedData.employees,
          established: new Date(updatedData.established),
          // Preserve existing certifications and documents
          certifications: prevCompany.certifications,
          documents: prevCompany.documents
        };
      });
    } catch (error) {
      console.error('Error updating company:', error);
      throw new Error('Failed to update company information. Please try again.');
    }
  };

  const handleAddCertification = async (formData: CertificationFormData, file?: File): Promise<void> => {
    if (!company) return;

    try {
      const certificationData = {
        company_id: company.id,
        name: formData.name,
        issued_by: formData.issuedBy,
        issue_date: formData.issueDate,
        expiry_date: formData.expiryDate || null
      };

      const newCertification = await companyService.addCertification(certificationData, file);

      // Update local state
      setCompany(prevCompany => {
        if (!prevCompany) return null;
        
        const transformedCertification = {
          id: newCertification.id,
          name: newCertification.name,
          issuedBy: newCertification.issued_by,
          issueDate: new Date(newCertification.issue_date),
          expiryDate: newCertification.expiry_date ? new Date(newCertification.expiry_date) : undefined,
          documentUrl: newCertification.document_url || undefined
        };

        return {
          ...prevCompany,
          certifications: [...prevCompany.certifications, transformedCertification]
        };
      });
    } catch (error) {
      console.error('Error adding certification:', error);
      throw new Error('Failed to add certification. Please try again.');
    }
  };

  const handleDeleteCertification = async (id: string): Promise<void> => {
    try {
      await companyService.deleteCertification(id);

      // Update local state
      setCompany(prevCompany => {
        if (!prevCompany) return null;
        
        return {
          ...prevCompany,
          certifications: prevCompany.certifications.filter(cert => cert.id !== id)
        };
      });
    } catch (error) {
      console.error('Error deleting certification:', error);
      throw new Error('Failed to delete certification. Please try again.');
    }
  };

  const handleAddDocument = async (file: File): Promise<void> => {
    if (!company) return;

    try {
      const documentData = {
        name: file.name,
        type: file.type,
        size: file.size,
        company_id: company.id
      };

      const newDocument = await companyService.addDocument(documentData, file);

      // Update local state
      setCompany(prevCompany => {
        if (!prevCompany) return null;
        
        const transformedDocument = {
          id: newDocument.id,
          name: newDocument.name,
          type: newDocument.type,
          size: newDocument.size,
          url: newDocument.url,
          uploadDate: new Date(newDocument.upload_date)
        };

        return {
          ...prevCompany,
          documents: [...prevCompany.documents, transformedDocument]
        };
      });
    } catch (error) {
      console.error('Error adding document:', error);
      throw new Error('Failed to upload document. Please try again.');
    }
  };

  const handleDeleteDocument = async (id: string): Promise<void> => {
    try {
      await companyService.deleteDocument(id);

      // Update local state
      setCompany(prevCompany => {
        if (!prevCompany) return null;
        
        return {
          ...prevCompany,
          documents: prevCompany.documents.filter(doc => doc.id !== id)
        };
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      throw new Error('Failed to delete document. Please try again.');
    }
  };

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

      <ProfileHeader company={company} onUpdateCompany={handleUpdateCompany} />
      <ProfileContent 
        company={company}
        onAddCertification={handleAddCertification}
        onDeleteCertification={handleDeleteCertification}
        onAddDocument={handleAddDocument}
        onDeleteDocument={handleDeleteDocument}
      />
    </div>
  );
};

export default CompanyProfile;