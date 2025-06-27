/*
  # Insert Sample Proposals

  1. New Data
    - Creates sample proposals linked to existing tenders and companies
    - Ensures proper foreign key relationships
    - Provides realistic proposal content for testing

  2. Security
    - Respects existing RLS policies
    - Uses proper user associations

  3. Data Integrity
    - Checks for existing data before insertion
    - Uses proper UUID format for all IDs
    - Maintains referential integrity
*/

-- Insert sample proposals with proper UUIDs and relationships
DO $$
DECLARE
    sample_company_id uuid;
    smart_city_tender_id uuid;
    hospital_tender_id uuid;
    energy_tender_id uuid;
    education_tender_id uuid;
BEGIN
    -- Get the first available company (assuming at least one exists)
    SELECT id INTO sample_company_id 
    FROM companies 
    LIMIT 1;

    -- Get tender IDs for linking proposals
    SELECT id INTO smart_city_tender_id 
    FROM tenders 
    WHERE title = 'Smart City Infrastructure Development'
    LIMIT 1;

    SELECT id INTO hospital_tender_id 
    FROM tenders 
    WHERE title = 'Hospital Management System Upgrade'
    LIMIT 1;

    SELECT id INTO energy_tender_id 
    FROM tenders 
    WHERE title = 'Renewable Energy Consulting Services'
    LIMIT 1;

    SELECT id INTO education_tender_id 
    FROM tenders 
    WHERE title = 'Educational Technology Platform'
    LIMIT 1;

    -- Only proceed if we have a company and tenders
    IF sample_company_id IS NOT NULL THEN
        
        -- Insert Smart City Infrastructure Proposal
        IF smart_city_tender_id IS NOT NULL THEN
            INSERT INTO proposals (
                id,
                tender_id,
                company_id,
                title,
                content,
                status
            ) VALUES (
                '550e8400-e29b-41d4-a716-446655440200',
                smart_city_tender_id,
                sample_company_id,
                'Smart City Infrastructure Implementation Proposal',
                'EXECUTIVE SUMMARY

We are pleased to submit this comprehensive proposal for the Smart City Infrastructure Development project. With extensive experience in smart city implementations and a proven track record of successful IoT deployments, we are uniquely positioned to deliver exceptional results for the City of San Francisco.

Our proposed solution leverages cutting-edge technologies including:
• Advanced IoT sensor networks for real-time data collection
• AI-powered traffic management systems
• Secure cloud-based data analytics platform
• Citizen-facing mobile and web applications
• Comprehensive cybersecurity framework

COMPANY OVERVIEW

Our company has established itself as a leader in smart city technology solutions. Our dedicated team brings together expertise in:
• IoT systems architecture and deployment
• Data analytics and machine learning
• Cybersecurity and compliance
• User experience design
• Project management

Key achievements include:
• 15+ successful smart city projects completed
• ISO 27001 certification for information security
• 99.9% system uptime across all deployments
• Significant infrastructure projects delivered

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

Our project team includes experienced professionals with:
• 10+ years smart city experience
• IoT specialist with 8+ years experience
• Data Science expertise with AI focus
• Security Architecture with industry certifications

REFERENCES

Recent successful projects include:
• Municipal Traffic Management Systems
• Smart Parking Initiatives
• Environmental Monitoring Networks

We are confident that our experience, technical expertise, and commitment to excellence make us the ideal partner for this transformative project.',
                'draft'
            ) ON CONFLICT (id) DO NOTHING;
        END IF;

        -- Insert Hospital Management System Proposal
        IF hospital_tender_id IS NOT NULL THEN
            INSERT INTO proposals (
                id,
                tender_id,
                company_id,
                title,
                content,
                status
            ) VALUES (
                '550e8400-e29b-41d4-a716-446655440201',
                hospital_tender_id,
                sample_company_id,
                'Healthcare IT System Modernization Proposal',
                'EXECUTIVE SUMMARY

We propose a comprehensive modernization of the Regional Medical Center''s hospital management system. Our HIPAA-compliant solution will streamline operations, improve patient care, and enhance data security while ensuring seamless integration with existing Epic systems.

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

TECHNICAL SPECIFICATIONS

• Cloud-based architecture with 99.9% uptime SLA
• Real-time data synchronization
• Mobile-responsive design
• API-first architecture for future integrations
• Automated backup and disaster recovery

TRAINING & SUPPORT

• Comprehensive staff training program
• 24/7 technical support during transition
• User documentation and video tutorials
• Ongoing maintenance and updates

BUDGET

Total project cost: $850,000
Includes development, implementation, training, and 6 months support.

TIMELINE

Project completion within 8 months from contract signing.',
                'draft'
            ) ON CONFLICT (id) DO NOTHING;
        END IF;

        -- Insert Renewable Energy Proposal
        IF energy_tender_id IS NOT NULL THEN
            INSERT INTO proposals (
                id,
                tender_id,
                company_id,
                title,
                content,
                status
            ) VALUES (
                '550e8400-e29b-41d4-a716-446655440202',
                energy_tender_id,
                sample_company_id,
                'Municipal Renewable Energy Transition Strategy',
                'EXECUTIVE SUMMARY

We present a comprehensive renewable energy consulting proposal for Green Valley Municipality''s transition to sustainable energy systems. Our approach combines technical expertise, financial analysis, and implementation planning to ensure a successful and cost-effective transition.

CONSULTING SERVICES

Our consulting package includes:
• Comprehensive energy audit and assessment
• Renewable energy feasibility studies
• Financial modeling and ROI analysis
• Implementation roadmap development
• Regulatory compliance guidance
• Stakeholder engagement strategy

TECHNICAL APPROACH

1. ENERGY ASSESSMENT
• Current energy consumption analysis
• Peak demand profiling
• Infrastructure evaluation
• Grid integration assessment

2. RENEWABLE OPTIONS ANALYSIS
• Solar photovoltaic potential
• Wind energy feasibility
• Energy storage solutions
• Smart grid integration

3. FINANCIAL MODELING
• Capital expenditure analysis
• Operating cost projections
• Incentive and rebate optimization
• Financing options evaluation

IMPLEMENTATION ROADMAP

Phase 1: Assessment (Months 1-2)
• Site surveys and data collection
• Stakeholder interviews
• Regulatory review

Phase 2: Analysis (Months 3-4)
• Technical feasibility studies
• Financial modeling
• Risk assessment

Phase 3: Planning (Months 5-6)
• Implementation strategy development
• Procurement recommendations
• Timeline and milestone planning

DELIVERABLES

• Comprehensive assessment report
• Financial analysis and projections
• Implementation roadmap
• Procurement specifications
• Regulatory compliance checklist
• Executive presentation materials

TEAM QUALIFICATIONS

• Professional Engineers with renewable energy expertise
• Financial analysts with municipal project experience
• Regulatory specialists
• Project management professionals

BUDGET

Total consulting fee: $125,000
Includes all assessments, analysis, and deliverables.',
                'draft'
            ) ON CONFLICT (id) DO NOTHING;
        END IF;

        -- Insert Educational Technology Proposal
        IF education_tender_id IS NOT NULL THEN
            INSERT INTO proposals (
                id,
                tender_id,
                company_id,
                title,
                content,
                status
            ) VALUES (
                '550e8400-e29b-41d4-a716-446655440203',
                education_tender_id,
                sample_company_id,
                'K-12 Educational Technology Platform Development',
                'EXECUTIVE SUMMARY

We propose the development of a comprehensive e-learning platform specifically designed for K-12 education. Our solution will provide interactive content, robust assessment tools, and intuitive dashboards for parents and teachers, all while maintaining the highest standards of student privacy and accessibility.

PLATFORM FEATURES

Student Learning Environment:
• Interactive multimedia lessons
• Adaptive learning pathways
• Gamification elements
• Collaborative tools
• Progress tracking

Teacher Dashboard:
• Lesson planning tools
• Student progress analytics
• Assessment creation and grading
• Communication tools
• Resource library

Parent Portal:
• Student progress visibility
• Assignment notifications
• Teacher communication
• Calendar integration
• Resource access

Administrative Tools:
• User management
• Reporting and analytics
• Curriculum management
• System configuration
• Data export capabilities

TECHNICAL SPECIFICATIONS

• Cloud-native architecture
• Mobile-responsive design
• WCAG 2.1 AA accessibility compliance
• COPPA and FERPA compliance
• Multi-language support
• Offline capability
• API integrations

DEVELOPMENT APPROACH

Phase 1: Foundation (Months 1-3)
• Platform architecture setup
• Core user management
• Basic content delivery system

Phase 2: Core Features (Months 4-8)
• Interactive content tools
• Assessment engine
• Communication systems

Phase 3: Advanced Features (Months 9-11)
• Analytics and reporting
• Advanced integrations
• Mobile applications

Phase 4: Testing & Launch (Months 12)
• User acceptance testing
• Performance optimization
• Training and rollout

COMPLIANCE & SECURITY

• COPPA compliance for student privacy
• FERPA compliance for educational records
• SOC 2 Type II certification
• End-to-end encryption
• Regular security audits

ACCESSIBILITY

• WCAG 2.1 AA compliance
• Screen reader compatibility
• Keyboard navigation support
• High contrast modes
• Multiple language support

TRAINING & SUPPORT

• Comprehensive teacher training program
• Administrator certification
• Student orientation materials
• 24/7 technical support
• Regular webinars and updates

BUDGET

Total project cost: $1,200,000

Development: $800,000
Testing & QA: $150,000
Training: $100,000
Support (Year 1): $150,000

TIMELINE

12-month development cycle with phased rollout beginning in month 10.',
                'submitted'
            ) ON CONFLICT (id) DO NOTHING;
        END IF;

    END IF;

END $$;