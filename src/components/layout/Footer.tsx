import React from 'react';

/**
 * Application footer with links and company information
 */
const Footer: React.FC = () => {
  return (
    <footer 
      className="bg-white border-t border-gray-200 py-6"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="px-4 lg:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © 2025 TenderHub. All rights reserved.
          </div>
          
          <nav className="flex space-x-6" aria-label="Footer navigation">
            <a 
              href="/privacy" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="/support" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Support
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;