import { Tender, Company, Proposal, Attestation } from '../types';

export const mockTenders: Tender[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Smart City Infrastructure Development',
    description: 'Comprehensive smart city infrastructure project including IoT sensors, traffic management systems, and digital citizen services platform. The project aims to modernize urban infrastructure and improve quality of life for residents.',
    organization: 'City of San Francisco',
    location: 'San Francisco, CA',
    budget: 2500000,
    deadline: new Date('2025-03-15'),
    publishedDate: new Date('2025-01-01'),
    status: 'open',
    category: 'Technology',
    bidCount: 23,
    documents: [
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        name: 'Technical Specifications.pdf',
        type: 'application/pdf',
        size: 2456789,
        url: '/documents/tech-specs.pdf',
        uploadDate: new Date('2025-01-01')
      }
    ],
    requirements: [
      'Minimum 5 years experience in smart city projects',
      'ISO 27001 certification required',
      'Local business registration preferred',
      'Previous government contract experience'
    ],
    contactInfo: {
      name: 'John Smith',
      email: 'j.smith@sf.gov',
      phone: '+1-415-555-0123'
    }
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Hospital Management System Upgrade',
    description: 'Complete overhaul of existing hospital management system including patient records, appointment scheduling, billing, and integration with medical devices.',
    organization: 'Regional Medical Center',
    location: 'Austin, TX',
    budget: 850000,
    deadline: new Date('2025-02-28'),
    publishedDate: new Date('2024-12-15'),
    status: 'closing_soon',
    category: 'Healthcare',
    bidCount: 15,
    documents: [],
    requirements: [
      'HIPAA compliance certification',
      'Healthcare IT experience required',
      'Integration with Epic systems preferred'
    ],
    contactInfo: {
      name: 'Dr. Sarah Johnson',
      email: 'procurement@regionalmed.com',
      phone: '+1-512-555-0456'
    }
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Renewable Energy Consulting Services',
    description: 'Strategic consulting for transitioning municipal energy systems to renewable sources. Includes feasibility studies, implementation planning, and ROI analysis.',
    organization: 'Green Valley Municipality',
    location: 'Denver, CO',
    budget: 125000,
    deadline: new Date('2025-04-30'),
    publishedDate: new Date('2025-01-10'),
    status: 'open',
    category: 'Energy',
    bidCount: 8,
    documents: [],
    requirements: [
      'Renewable energy expertise',
      'Municipal consulting experience',
      'Professional engineering license'
    ],
    contactInfo: {
      name: 'Mike Rodriguez',
      email: 'energy@greenvalley.gov',
      phone: '+1-303-555-0789'
    }
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'Educational Technology Platform',
    description: 'Development of comprehensive e-learning platform for K-12 education with interactive content, assessment tools, and parent/teacher dashboards.',
    organization: 'State Department of Education',
    location: 'Columbus, OH',
    budget: 1200000,
    deadline: new Date('2025-05-15'),
    publishedDate: new Date('2025-01-05'),
    status: 'open',
    category: 'Education',
    bidCount: 31,
    documents: [],
    requirements: [
      'EdTech development experience',
      'COPPA compliance knowledge',
      'Accessibility standards (WCAG 2.1 AA)',
      'Scalable cloud architecture'
    ],
    contactInfo: {
      name: 'Lisa Chen',
      email: 'procurement@education.oh.gov',
      phone: '+1-614-555-0321'
    }
  }
];

export const mockCompany: Company = {
  id: '550e8400-e29b-41d4-a716-446655440100',
  name: 'TechSolutions Ltd',
  registrationNumber: 'TS-2019-001234',
  address: '123 Innovation Street, Tech District, San Francisco, CA 94105',
  phone: '+1-415-555-9876',
  email: 'info@techsolutions.com',
  website: 'https://techsolutions.com',
  industry: 'Information Technology',
  employees: 150,
  established: new Date('2019-03-15'),
  certifications: [
    {
      id: '550e8400-e29b-41d4-a716-446655440110',
      name: 'ISO 27001:2013',
      issuedBy: 'BSI Group',
      issueDate: new Date('2023-06-01'),
      expiryDate: new Date('2026-06-01'),
      documentUrl: '/certificates/iso27001.pdf'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440111',
      name: 'SOC 2 Type II',
      issuedBy: 'AICPA',
      issueDate: new Date('2024-01-15'),
      expiryDate: new Date('2025-01-15'),
      documentUrl: '/certificates/soc2.pdf'
    }
  ],
  documents: []
};

export const mockProposals: Proposal[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440200',
    tenderId: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Smart City Infrastructure Proposal',
    content: 'Our comprehensive proposal for the Smart City Infrastructure Development project...',
    status: 'draft',
    lastModified: new Date('2025-01-15'),
    documents: []
  }
];

export const mockAttestations: Attestation[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440300',
    type: 'completion',
    issuer: 'City of Los Angeles',
    recipient: 'TechSolutions Ltd',
    description: 'Successfully completed traffic management system implementation',
    score: 95,
    date: new Date('2024-09-15'),
    blockchainTxId: '0x1a2b3c4d5e6f7g8h9i0j',
    verified: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440301',
    type: 'quality',
    issuer: 'State of California',
    recipient: 'TechSolutions Ltd',
    description: 'Excellent delivery quality on digital services platform',
    score: 92,
    date: new Date('2024-11-20'),
    blockchainTxId: '0x2b3c4d5e6f7g8h9i0j1k',
    verified: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440302',
    type: 'compliance',
    issuer: 'Federal Compliance Authority',
    recipient: 'TechSolutions Ltd',
    description: 'Full compliance with federal security standards',
    score: 98,
    date: new Date('2024-12-01'),
    blockchainTxId: '0x3c4d5e6f7g8h9i0j1k2l',
    verified: true
  }
];