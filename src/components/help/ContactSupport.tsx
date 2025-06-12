import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';

/**
 * Contact support section with multiple contact methods
 */
const ContactSupport: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support request submitted:', formData);
    // Reset form
    setFormData({ subject: '', message: '', priority: 'medium' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@tenderhub.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team during business hours',
      contact: '+1-800-TENDER-1',
      action: 'Call Now'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with support agents in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Contact Support</h2>
        <p className="text-gray-600 mt-1">
          Can't find what you're looking for? Our support team is here to help.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact methods */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Get in Touch</h3>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <method.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{method.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                    <p className="text-sm font-medium text-gray-900 mb-2">{method.contact}</p>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      {method.action} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support form */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Account issue</option>
                  <option value="high">High - Urgent technical problem</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe your issue in detail..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Before contacting support:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check our FAQ section above for quick answers</li>
            <li>• Make sure you're using the latest version of your browser</li>
            <li>• Have your account information ready when contacting us</li>
            <li>• Include screenshots if you're experiencing visual issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;