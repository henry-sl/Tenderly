import React, { useState } from 'react';
import { Search, BookOpen, Video, FileText } from 'lucide-react';

/**
 * Search component for help content with quick links
 */
const HelpSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickLinks = [
    {
      icon: BookOpen,
      title: 'Getting Started Guide',
      description: 'Learn the basics of using TenderHub',
      href: '#getting-started'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      href: '#tutorials'
    },
    {
      icon: FileText,
      title: 'API Documentation',
      description: 'Technical documentation for developers',
      href: '#api-docs'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Help Articles</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles, guides, or tutorials..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <link.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{link.title}</h4>
                <p className="text-sm text-gray-600">{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpSearch;