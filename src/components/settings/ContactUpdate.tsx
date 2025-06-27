import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * Contact information update component
 */
const ContactUpdate: React.FC = () => {
  const { user, updateEmail } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    phone: '+1-415-555-9876',
    address: '123 Innovation Street, Tech District, San Francisco, CA 94105',
    website: 'https://techsolutions.com',
    linkedIn: 'https://linkedin.com/company/techsolutions'
  });

  // Email change specific state
  const [emailChangeData, setEmailChangeData] = useState({
    newEmail: '',
    currentPassword: ''
  });
  const [emailChangeLoading, setEmailChangeLoading] = useState(false);
  const [emailChangeMessage, setEmailChangeMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission for general contact info
    console.log('Contact info updated:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailChangeLoading(true);
    setEmailChangeMessage(null);

    // Trim whitespace from email to prevent validation issues
    const trimmedEmail = emailChangeData.newEmail.trim();

    if (!trimmedEmail) {
      setEmailChangeMessage({ type: 'error', text: 'Please enter a new email address' });
      setEmailChangeLoading(false);
      return;
    }

    // Client-side email validation
    if (!validateEmail(trimmedEmail)) {
      setEmailChangeMessage({ 
        type: 'error', 
        text: 'Please enter a valid email address (e.g., user@example.com)' 
      });
      setEmailChangeLoading(false);
      return;
    }

    if (trimmedEmail === user?.email) {
      setEmailChangeMessage({ type: 'error', text: 'New email must be different from current email' });
      setEmailChangeLoading(false);
      return;
    }

    try {
      // Call updateEmail with only the new email address
      const { error } = await updateEmail(trimmedEmail);
      
      if (error) {
        setEmailChangeMessage({ type: 'error', text: error.message });
      } else {
        setEmailChangeMessage({ 
          type: 'success', 
          text: 'Email update initiated. Please check both your old and new email addresses for confirmation links.' 
        });
        setEmailChangeData({ newEmail: '', currentPassword: '' });
      }
    } catch (error) {
      setEmailChangeMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setEmailChangeLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <p className="text-gray-600 mb-6">
          Update your contact details and ensure your information is current.
        </p>
      </div>

      {/* Email Change Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          Change Email Address
        </h4>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Current email: <span className="font-medium">{user?.email}</span>
          </p>
        </div>

        {emailChangeMessage && (
          <div className={`mb-4 p-3 rounded-lg flex items-start ${
            emailChangeMessage.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {emailChangeMessage.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            )}
            <p className={`text-sm ${
              emailChangeMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {emailChangeMessage.text}
            </p>
          </div>
        )}

        <form onSubmit={handleChangeEmail} className="space-y-4">
          <div>
            <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 mb-2">
              New Email Address
            </label>
            <input
              type="email"
              id="newEmail"
              value={emailChangeData.newEmail}
              onChange={(e) => setEmailChangeData(prev => ({ ...prev, newEmail: e.target.value.trim() }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new email address (e.g., user@example.com)"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be a valid email format (e.g., user@example.com)
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-700">
              <strong>Note:</strong> Supabase will send confirmation emails to both your current and new email addresses. 
              You'll need to confirm the change from both emails to complete the update.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={emailChangeLoading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {emailChangeLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Email
              </>
            )}
          </button>
        </form>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Personal Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="displayEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address (Display)
              </label>
              <input
                type="email"
                id="displayEmail"
                value={user?.email || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                disabled
              />
              <p className="mt-1 text-xs text-gray-500">
                Use the "Change Email Address" section above to update your email
              </p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Contact Details
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Address
          </h4>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Business Address
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your complete business address"
              required
            />
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">Social & Professional Links</h4>
          
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn Profile
            </label>
            <input
              type="url"
              id="linkedin"
              value={formData.linkedIn}
              onChange={(e) => handleChange('linkedIn', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>

        {/* Email Preferences */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-md font-medium text-gray-900 mb-3">Email Preferences</h4>
          
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                Allow clients to contact me directly via email
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                Show my contact information in public company profile
              </span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUpdate;