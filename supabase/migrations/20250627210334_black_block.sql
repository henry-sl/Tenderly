/*
  # Add sample tender data

  1. Sample Data
    - Insert sample tenders with requirements and contacts
    - Provides realistic test data for the application

  2. Data Structure
    - Tenders with various categories and statuses
    - Associated requirements and contact information
    - Realistic deadlines and budgets
*/

-- Insert sample tenders
INSERT INTO tenders (title, description, organization, location, budget, deadline, category, status, bid_count) VALUES
('Smart City Infrastructure Development', 'Comprehensive smart city infrastructure project including IoT sensors, traffic management systems, and digital citizen services platform. The project aims to modernize urban infrastructure and improve quality of life for residents.', 'City of San Francisco', 'San Francisco, CA', 2500000, '2025-03-15 23:59:59', 'Technology', 'open', 23),
('Hospital Management System Upgrade', 'Complete overhaul of existing hospital management system including patient records, appointment scheduling, billing, and integration with medical devices.', 'Regional Medical Center', 'Austin, TX', 850000, '2025-02-28 23:59:59', 'Healthcare', 'closing_soon', 15),
('Renewable Energy Consulting Services', 'Strategic consulting for transitioning municipal energy systems to renewable sources. Includes feasibility studies, implementation planning, and ROI analysis.', 'Green Valley Municipality', 'Denver, CO', 125000, '2025-04-30 23:59:59', 'Energy', 'open', 8),
('Educational Technology Platform', 'Development of comprehensive e-learning platform for K-12 education with interactive content, assessment tools, and parent/teacher dashboards.', 'State Department of Education', 'Columbus, OH', 1200000, '2025-05-15 23:59:59', 'Education', 'open', 31),
('Transportation Management System', 'Implementation of intelligent transportation management system for optimizing traffic flow and reducing congestion in metropolitan areas.', 'Metro Transit Authority', 'Seattle, WA', 1800000, '2025-06-01 23:59:59', 'Transportation', 'open', 12),
('Cybersecurity Assessment Services', 'Comprehensive cybersecurity assessment and penetration testing services for government agencies and critical infrastructure.', 'Department of Homeland Security', 'Washington, DC', 450000, '2025-03-30 23:59:59', 'Technology', 'open', 19);

-- Insert tender requirements for Smart City Infrastructure
INSERT INTO tender_requirements (tender_id, requirement, order_index) 
SELECT t.id, req.requirement, req.order_index
FROM tenders t
CROSS JOIN (
  VALUES 
    ('Minimum 5 years experience in smart city projects', 1),
    ('ISO 27001 certification required', 2),
    ('Local business registration preferred', 3),
    ('Previous government contract experience', 4),
    ('Proven track record with IoT implementations', 5)
) AS req(requirement, order_index)
WHERE t.title = 'Smart City Infrastructure Development';

-- Insert tender requirements for Hospital Management System
INSERT INTO tender_requirements (tender_id, requirement, order_index) 
SELECT t.id, req.requirement, req.order_index
FROM tenders t
CROSS JOIN (
  VALUES 
    ('HIPAA compliance certification required', 1),
    ('Healthcare IT experience mandatory', 2),
    ('Integration with Epic systems preferred', 3),
    ('24/7 support availability', 4)
) AS req(requirement, order_index)
WHERE t.title = 'Hospital Management System Upgrade';

-- Insert tender requirements for Renewable Energy
INSERT INTO tender_requirements (tender_id, requirement, order_index) 
SELECT t.id, req.requirement, req.order_index
FROM tenders t
CROSS JOIN (
  VALUES 
    ('Professional engineering license required', 1),
    ('Renewable energy expertise mandatory', 2),
    ('Municipal consulting experience', 3),
    ('Environmental impact assessment capability', 4)
) AS req(requirement, order_index)
WHERE t.title = 'Renewable Energy Consulting Services';

-- Insert tender requirements for Educational Technology
INSERT INTO tender_requirements (tender_id, requirement, order_index) 
SELECT t.id, req.requirement, req.order_index
FROM tenders t
CROSS JOIN (
  VALUES 
    ('EdTech development experience required', 1),
    ('COPPA compliance knowledge mandatory', 2),
    ('Accessibility standards (WCAG 2.1 AA)', 3),
    ('Scalable cloud architecture experience', 4),
    ('K-12 education sector experience', 5)
) AS req(requirement, order_index)
WHERE t.title = 'Educational Technology Platform';

-- Insert tender contacts
INSERT INTO tender_contacts (tender_id, name, email, phone)
SELECT t.id, contact.name, contact.email, contact.phone
FROM tenders t
CROSS JOIN (
  VALUES 
    ('Smart City Infrastructure Development', 'John Smith', 'j.smith@sf.gov', '+1-415-555-0123'),
    ('Hospital Management System Upgrade', 'Dr. Sarah Johnson', 'procurement@regionalmed.com', '+1-512-555-0456'),
    ('Renewable Energy Consulting Services', 'Mike Rodriguez', 'energy@greenvalley.gov', '+1-303-555-0789'),
    ('Educational Technology Platform', 'Lisa Chen', 'procurement@education.oh.gov', '+1-614-555-0321'),
    ('Transportation Management System', 'David Park', 'contracts@metro-transit.gov', '+1-206-555-0654'),
    ('Cybersecurity Assessment Services', 'Jennifer Williams', 'procurement@dhs.gov', '+1-202-555-0987')
) AS contact(tender_title, name, email, phone)
WHERE t.title = contact.tender_title;

-- Insert sample attestations
INSERT INTO attestations (type, issuer, recipient, description, score, date, blockchain_tx_id, verified) VALUES
('completion', 'City of Los Angeles', 'TechSolutions Ltd', 'Successfully completed traffic management system implementation ahead of schedule with excellent quality standards', 95, '2024-09-15 10:30:00', '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p', true),
('quality', 'State of California', 'TechSolutions Ltd', 'Delivered exceptional quality on digital services platform with zero critical bugs and outstanding user satisfaction', 92, '2024-11-20 14:15:00', '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q', true),
('compliance', 'Federal Compliance Authority', 'TechSolutions Ltd', 'Demonstrated full compliance with federal security standards and data protection regulations', 98, '2024-12-01 09:45:00', '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r', true),
('reputation', 'Municipal Technology Council', 'TechSolutions Ltd', 'Recognized for outstanding contribution to smart city initiatives and innovative technology solutions', 94, '2024-10-10 16:20:00', '0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s', true);