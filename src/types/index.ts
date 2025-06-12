export interface Tender {
  id: string;
  title: string;
  description: string;
  organization: string;
  location: string;
  budget: number;
  deadline: Date;
  publishedDate: Date;
  status: 'open' | 'closing_soon' | 'closed';
  category: string;
  bidCount: number;
  documents: Document[];
  requirements: string[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadDate: Date;
}

export interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  industry: string;
  employees: number;
  established: Date;
  certifications: Certification[];
  documents: Document[];
}

export interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  issueDate: Date;
  expiryDate?: Date;
  documentUrl?: string;
}

export interface Proposal {
  id: string;
  tenderId: string;
  title: string;
  content: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  submittedDate?: Date;
  lastModified: Date;
  documents: Document[];
}

export interface Attestation {
  id: string;
  type: 'completion' | 'quality' | 'compliance' | 'reputation';
  issuer: string;
  recipient: string;
  description: string;
  score: number;
  date: Date;
  blockchainTxId: string;
  verified: boolean;
}