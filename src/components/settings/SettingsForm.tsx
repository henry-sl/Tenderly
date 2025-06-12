import React, { useState } from 'react';
import NotificationPreferences from './NotificationPreferences';
import SecuritySettings from './SecuritySettings';
import ContactUpdate from './ContactUpdate';

/**
 * Main settings form with tabbed sections
 */
const SettingsForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState('notifications');

  const tabs = [
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'contact', label: 'Contact Info' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Settings sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'notifications' && <NotificationPreferences />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'contact' && <ContactUpdate />}
      </div>
    </div>
  );
};

export default SettingsForm;