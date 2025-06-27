/*
  # Add Sample Proposals for Testing

  1. Sample Data
    - Creates a sample user in auth.users
    - Creates a sample company linked to that user
    - Creates sample proposals for existing tenders
  
  2. Security
    - Respects existing RLS policies
    - Links data properly through foreign key relationships
*/

-- First, insert a sample user into auth.users if it doesn't exist
DO $$
DECLARE
    sample_user_id uuid := '550e8400-e29b-41d4-a716-446655440000';
    sample_company_id uuid;
    smart_city_tender_id uuid;
    hospital_tender_id uuid;
BEGIN
    -- Insert sample user into auth.users if it doesn't exist
    INSERT INTO auth.users (
        id,
        instance_id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
        sample_user_id,
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        'sample@techsolutions.com',
        '$2a$10$placeholder.encrypted.password.hash.for.sample.user',
        NOW(),
        NOW(),
        NOW(),
        '{"provider": "email", "providers": ["email"]}',
        '{"name": "Sample User"}',
        false,
        '',
        '',
        '',
        ''
    ) ON CONFLICT (id) DO NOTHING;

    -- Create sample company linked to the sample user
    INSERT INTO companies (
        user_id,
        name,
        registration_number,
        address,
        phone,
        email,
        industry,
        employees,
        established
    ) VALUES (
        sample_user_id,
        'Sample Tech Solutions',
        'STS-2024-001',
        '456 Tech Avenue, Innovation District, San Francisco, CA 94107',
        '+1-415-555-1234',
        'info@sampletechsolutions.com',
        'Information Technology',
        75,
        '2020-01-15'
    ) ON CONFLICT (registration_number) DO NOTHING
    RETURNING id INTO sample_company_id;

    -- If company already exists, get its ID
    IF sample_company_id IS NULL THEN
        SELECT id INTO sample_company_id 
        FROM companies 
        WHERE registration_number = 'STS-2024-001';
    END IF;

    -- Get tender IDs for linking proposals
    SELECT id INTO smart_city_tender_id 
    FROM tenders 
    WHERE title = 'Smart City Infrastructure Development'
    LIMIT 1;

    SELECT id INTO hospital_tender_id 
    FROM tenders 
    WHERE title = 'Hospital Management System Upgrade'
    LIMIT 1;

    -- Insert sample proposals only if we have the required data
    IF sample_company_id IS NOT NULL AND smart_city_tender_id IS NOT NULL THEN
        INSERT INTO proposals (
            tender_id,
            company_id,
            title,
            content,
            status
        ) VALUES (
            smart_city_tender_id,
            sample_company_id,
            'Smart City Infrastructure Implementation Proposal',
            'EXECUTIVE SUMMARY

Sample Tech Solutions is pleased to submit this comprehensive proposal for the Smart City Infrastructure Development project. With over 4 years of experience in smart city implementations and a proven track record of successful IoT deployments, we are uniquely positioned to deliver exceptional results for the City of San Francisco.

Our proposed solution leverages cutting-edge technologies including:
• Advanced IoT sensor networks for real-time data collection
• AI-powered traffic management systems
• Secure cloud-based data analytics platform
• Citizen-facing mobile and web applications
• Comprehensive cybersecurity framework

COMPANY OVERVIEW

Founded in 2020, Sample Tech Solutions has rapidly established itself as a leader in smart city technology solutions. Our team of 75 dedicated professionals brings together expertise in:
• IoT systems architecture and deployment
• Data analytics and machine learning
• Cybersecurity and compliance
• User experience design
• Project management

Key achievements include:
• 15+ successful smart city projects completed
• ISO 27001 certification for information security
• 99.9% system uptime across all deployments
• $50M+ in infrastructure projects delivered

TECHNICAL APPROACH

Our technical approach is built on four core pillars:

1. SCALABLE ARCHITECTURE
We propose a microservices-based architecture that can scale horizontally to accommodate future growth. Our cloud-native approach ensures high availability and disaster recovery capabilities.

2. INTEROPERABILITY
Our solution is designed to integrate seamlessly with existing city systems and future technologies. We use open standards and APIs to ensure long-term compatibility.

3. SECURITY FIRST
Security is embedded in every layer of our solution, from device-level encryption to network security and data protection. We follow NIST cybersecurity frameworks and maintain SOC 2 compliance.

4. USER-CENTRIC DESIGN
All citizen-facing interfaces are designed with accessibility and usability in mind, ensuring broad adoption and positive user experience.

PROJECT TIMELINE

Phase 1: Planning & Design (Months 1-3)
• Requirements analysis and system design
• Infrastructure planning and procurement
• Team mobilization and training

Phase 2: Core Infrastructure (Months 4-8)
• IoT sensor network deployment
• Cloud platform setup and configuration
• Basic traffic management system implementation

Phase 3: Advanced Features (Months 9-12)
• AI analytics implementation
• Citizen services platform development
• Mobile application deployment

Phase 4: Testing & Launch (Months 13-15)
• System integration testing
• User acceptance testing
• Phased rollout and go-live support

BUDGET & PRICING

Our competitive pricing structure is designed to deliver maximum value:

Infrastructure & Hardware: $1,200,000
Software Development: $800,000
Implementation Services: $300,000
Training & Support: $150,000
Project Management: $50,000

Total Project Cost: $2,500,000

This includes all hardware, software, implementation, training, and 12 months of support and maintenance.

TEAM & QUALIFICATIONS

Our project team includes:
• Sarah Chen, Project Director (10+ years smart city experience)
• Michael Rodriguez, Technical Lead (IoT specialist, 8 years experience)
• Dr. Lisa Wang, Data Science Lead (PhD in Computer Science, AI expert)
• James Thompson, Security Architect (CISSP certified, 12 years experience)

REFERENCES

Recent successful projects include:
• City of Oakland Traffic Management System (2023)
• San Jose Smart Parking Initiative (2022)
• Fremont Environmental Monitoring Network (2024)

We are confident that our experience, technical expertise, and commitment to excellence make us the ideal partner for this transformative project.',
            'draft'
        ) ON CONFLICT DO NOTHING;
    END IF;

    -- Insert second proposal if hospital tender exists
    IF sample_company_id IS NOT NULL AND hospital_tender_id IS NOT NULL THEN
        INSERT INTO proposals (
            tender_id,
            company_id,
            title,
            content,
            status
        ) VALUES (
            hospital_tender_id,
            sample_company_id,
            'Healthcare IT System Modernization Proposal',
            'EXECUTIVE SUMMARY

Sample Tech Solutions proposes a comprehensive modernization of the Regional Medical Center''s hospital management system. Our HIPAA-compliant solution will streamline operations, improve patient care, and enhance data security while ensuring seamless integration with existing Epic systems.

TECHNICAL SOLUTION

Our proposed system includes:
• Modern web-based patient management interface
• Real-time appointment scheduling system
• Integrated billing and insurance processing
• Electronic health records (EHR) optimization
• Mobile applications for staff and patients
• Advanced reporting and analytics dashboard

IMPLEMENTATION APPROACH

Phase 1: Assessment & Planning (Months 1-2)
• Current system analysis
• Data migration planning
• Staff training program design

Phase 2: Core System Development (Months 3-6)
• Patient management system development
• Epic integration implementation
• Security framework deployment

Phase 3: Testing & Deployment (Months 7-8)
• User acceptance testing
• Staff training delivery
• Phased system rollout

COMPLIANCE & SECURITY

Our solution ensures full HIPAA compliance with:
• End-to-end encryption
• Role-based access controls
• Comprehensive audit logging
• Regular security assessments

BUDGET

Total project cost: $850,000
Includes development, implementation, training, and 6 months support.',
            'draft'
        ) ON CONFLICT DO NOTHING;
    END IF;

END $$;