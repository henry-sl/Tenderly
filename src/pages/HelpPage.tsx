import React from 'react';
import FAQAccordion from '../components/help/FAQAccordion';
import HelpSearch from '../components/help/HelpSearch';
import ContactSupport from '../components/help/ContactSupport';

/**
 * Help page with FAQ, search, and support contact
 */
const HelpPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Help & Support</h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions or get in touch with our support team
        </p>
      </div>

      <HelpSearch />
      <FAQAccordion />
      <ContactSupport />
    </div>
  );
};

export default HelpPage;