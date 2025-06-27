import React, { useState } from 'react';
import { Shield, Key, Smartphone, AlertTriangle, Save, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * Security settings component for password and 2FA management
 */
const SecuritySettings: React.FC = () => {
  const { updatePassword } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeLoading(true);
    setPasswordChangeMessage(null);

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordChangeMessage({ type: 'error', text: 'Please fill in all fields' });
      setPasswordChangeLoading(false);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordChangeMessage({ type: 'error', text: 'New passwords do not match' });
      setPasswordChangeLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordChangeMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      setPasswordChangeLoading(false);
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordChangeMessage({ type: 'error', text: 'New password must be different from current password' });
      setPasswordChangeLoading(false);
      return;
    }

    try {
      const { error } = await updatePassword(passwordForm.newPassword);
      
      if (error) {
        setPasswordChangeMessage({ type: 'error', text: error.message });
      } else {
        setPasswordChangeMessage({ 
          type: 'success', 
          text: 'Password updated successfully!' 
        });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordForm(false);
      }
    } catch (error) {
      setPasswordChangeMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setPasswordChangeLoading(false);
    }
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // In a real app, this would trigger the 2FA setup/disable process
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        <p className="text-gray-600 mb-6">
          Manage your account security and authentication preferences.
        </p>
      </div>

      {/* Password Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Key className="h-5 w-5 text-blue-600" />
          <h4 className="text-md font-medium text-gray-900">Password</h4>
        </div>
        
        <p className="text-gray-600 mb-4">
          Last changed: December 15, 2024
        </p>

        {passwordChangeMessage && (
          <div className={`mb-4 p-3 rounded-lg flex items-start ${
            passwordChangeMessage.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {passwordChangeMessage.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            )}
            <p className={`text-sm ${
              passwordChangeMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {passwordChangeMessage.text}
            </p>
          </div>
        )}
        
        {!showPasswordForm ? (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 6 characters long
              </p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                disabled={passwordChangeLoading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {passwordChangeLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Password
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordChangeMessage(null);
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Smartphone className="h-5 w-5 text-green-600" />
            <h4 className="text-md font-medium text-gray-900">Two-Factor Authentication</h4>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={handleTwoFactorToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <p className="text-gray-600 mb-4">
          {twoFactorEnabled 
            ? 'Two-factor authentication is enabled. Your account has an extra layer of security.'
            : 'Add an extra layer of security to your account by enabling two-factor authentication.'
          }
        </p>
        
        {twoFactorEnabled && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                2FA is active using your mobile app
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Security Recommendations */}
      <div className="border border-yellow-200 rounded-lg p-6 bg-yellow-50">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <h4 className="text-md font-medium text-yellow-800">Security Recommendations</h4>
        </div>
        
        <ul className="text-sm text-yellow-700 space-y-2">
          <li>• Use a strong, unique password for your TenderHub account</li>
          <li>• Enable two-factor authentication for enhanced security</li>
          <li>• Regularly review your account activity and login history</li>
          <li>• Never share your login credentials with others</li>
          <li>• Log out from shared or public computers</li>
        </ul>
      </div>

      {/* Session Management */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Active Sessions</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Current Session</p>
              <p className="text-sm text-gray-600">Chrome on macOS • San Francisco, CA</p>
              <p className="text-xs text-gray-500">Last active: Now</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Current
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Mobile Session</p>
              <p className="text-sm text-gray-600">Safari on iOS • San Francisco, CA</p>
              <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
            </div>
            <button className="text-sm text-red-600 hover:text-red-700 transition-colors">
              Revoke
            </button>
          </div>
        </div>
        
        <button className="mt-4 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
          Sign out of all other sessions
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;