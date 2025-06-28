/**
 * Utility functions for profile completion calculations
 */
import { Company } from '../types';

export interface ProfileCompletionCriteria {
  companyName: boolean;
  registrationNumber: boolean;
  address: boolean;
  phone: boolean;
  website: boolean;
  industry: boolean;
  establishedYear: boolean;
  hasCertifications: boolean;
  hasDocuments: boolean;
}

/**
 * Calculate profile completion percentage based on company data
 */
export const calculateProfileCompletion = (company: Company): number => {
  const criteria: ProfileCompletionCriteria = {
    // Company name is not default/placeholder
    companyName: company.name !== 'New Company' && 
                 company.name !== 'TechSolutions Ltd' && 
                 company.name.trim().length > 0,
    
    // Registration number is not default/placeholder
    registrationNumber: !company.registrationNumber.startsWith('REG-') && 
                       company.registrationNumber.trim().length > 0,
    
    // Address is not default/placeholder
    address: company.address !== 'Please update your company address' && 
             company.address.trim().length > 0,
    
    // Phone is not default/placeholder
    phone: company.phone !== 'Please update your phone number' && 
           company.phone.trim().length > 0,
    
    // Website is provided (optional but counts toward completion)
    website: !!company.website && company.website.trim().length > 0,
    
    // Industry is not default
    industry: company.industry !== 'Technology' || 
              (company.industry === 'Technology' && 
               (company.name !== 'New Company' && !company.name.includes('Company'))),
    
    // Established year is not current year (indicating it was set intentionally)
    establishedYear: company.established.getFullYear() !== new Date().getFullYear(),
    
    // Has at least one certification
    hasCertifications: company.certifications.length > 0,
    
    // Has at least one document
    hasDocuments: company.documents.length > 0
  };

  // Count completed criteria
  const completedCount = Object.values(criteria).filter(Boolean).length;
  const totalCriteria = Object.keys(criteria).length;
  
  // Calculate percentage and round to nearest integer
  return Math.round((completedCount / totalCriteria) * 100);
};

/**
 * Get completion status message based on percentage
 */
export const getCompletionMessage = (percentage: number): string => {
  if (percentage === 100) {
    return 'Excellent! Your profile is comprehensive.';
  } else if (percentage >= 80) {
    return 'Great! Your profile is nearly complete.';
  } else if (percentage >= 60) {
    return 'Good progress! A few more details will strengthen your profile.';
  } else if (percentage >= 40) {
    return 'Getting there! Complete more sections to improve your profile.';
  } else if (percentage >= 20) {
    return 'Just started! Add more information to build your profile.';
  } else {
    return 'Let\'s get started! Complete your profile to attract more opportunities.';
  }
};

/**
 * Get missing criteria for profile completion
 */
export const getMissingCriteria = (company: Company): string[] => {
  const missing: string[] = [];
  
  if (company.name === 'New Company' || company.name === 'TechSolutions Ltd' || company.name.trim().length === 0) {
    missing.push('Update company name');
  }
  
  if (company.registrationNumber.startsWith('REG-') || company.registrationNumber.trim().length === 0) {
    missing.push('Add registration number');
  }
  
  if (company.address === 'Please update your company address' || company.address.trim().length === 0) {
    missing.push('Update company address');
  }
  
  if (company.phone === 'Please update your phone number' || company.phone.trim().length === 0) {
    missing.push('Update phone number');
  }
  
  if (!company.website || company.website.trim().length === 0) {
    missing.push('Add company website');
  }
  
  if (company.industry === 'Technology' && (company.name === 'New Company' || company.name.includes('Company'))) {
    missing.push('Select appropriate industry');
  }
  
  if (company.established.getFullYear() === new Date().getFullYear()) {
    missing.push('Set established year');
  }
  
  if (company.certifications.length === 0) {
    missing.push('Add certifications');
  }
  
  if (company.documents.length === 0) {
    missing.push('Upload documents');
  }
  
  return missing;
};