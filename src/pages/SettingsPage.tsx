import React from 'react';
import SettingsForm from '../components/settings/SettingsForm';

/**
 * Settings page for user preferences and account management
 */
const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account preferences and notification settings
        </p>
      </div>

      <SettingsForm />
    </div>
  );
};

export default SettingsPage;