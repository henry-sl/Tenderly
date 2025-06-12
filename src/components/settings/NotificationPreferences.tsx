import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Save } from 'lucide-react';

/**
 * Notification preferences settings component
 */
const NotificationPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: {
      newTenders: true,
      proposalUpdates: true,
      deadlineReminders: true,
      marketingEmails: false
    },
    pushNotifications: {
      newTenders: true,
      proposalUpdates: true,
      deadlineReminders: true,
      systemUpdates: false
    },
    smsNotifications: {
      urgentUpdates: true,
      deadlineReminders: false
    }
  });

  const handleEmailChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: value
      }
    }));
  };

  const handlePushChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      pushNotifications: {
        ...prev.pushNotifications,
        [key]: value
      }
    }));
  };

  const handleSmsChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      smsNotifications: {
        ...prev.smsNotifications,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Save preferences
    console.log('Saving preferences:', preferences);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <p className="text-gray-600 mb-6">
          Choose how you want to be notified about tender opportunities and updates.
        </p>
      </div>

      {/* Email Notifications */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Mail className="h-5 w-5 text-blue-600" />
          <h4 className="text-md font-medium text-gray-900">Email Notifications</h4>
        </div>
        
        <div className="space-y-3 ml-7">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.emailNotifications.newTenders}
              onChange={(e) => handleEmailChange('newTenders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">New tender opportunities matching your criteria</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.emailNotifications.proposalUpdates}
              onChange={(e) => handleEmailChange('proposalUpdates', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Proposal status updates</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.emailNotifications.deadlineReminders}
              onChange={(e) => handleEmailChange('deadlineReminders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Deadline reminders</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.emailNotifications.marketingEmails}
              onChange={(e) => handleEmailChange('marketingEmails', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Marketing emails and product updates</span>
          </label>
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="h-5 w-5 text-green-600" />
          <h4 className="text-md font-medium text-gray-900">Push Notifications</h4>
        </div>
        
        <div className="space-y-3 ml-7">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.pushNotifications.newTenders}
              onChange={(e) => handlePushChange('newTenders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">New tender opportunities</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.pushNotifications.proposalUpdates}
              onChange={(e) => handlePushChange('proposalUpdates', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Proposal status changes</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.pushNotifications.deadlineReminders}
              onChange={(e) => handlePushChange('deadlineReminders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Deadline reminders</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.pushNotifications.systemUpdates}
              onChange={(e) => handlePushChange('systemUpdates', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">System maintenance and updates</span>
          </label>
        </div>
      </div>

      {/* SMS Notifications */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Smartphone className="h-5 w-5 text-orange-600" />
          <h4 className="text-md font-medium text-gray-900">SMS Notifications</h4>
        </div>
        
        <div className="space-y-3 ml-7">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.smsNotifications.urgentUpdates}
              onChange={(e) => handleSmsChange('urgentUpdates', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Urgent proposal updates</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.smsNotifications.deadlineReminders}
              onChange={(e) => handleSmsChange('deadlineReminders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">24-hour deadline reminders</span>
          </label>
        </div>
      </div>

      {/* Save button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;