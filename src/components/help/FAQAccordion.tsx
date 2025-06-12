import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * FAQ accordion component with categorized questions
 */
const FAQAccordion: React.FC = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqCategories = [
    {
      title: 'Getting Started',
      items: [
        {
          id: 'account-setup',
          question: 'How do I set up my company account?',
          answer: 'To set up your company account, click on the "Sign Up" button and follow the registration process. You\'ll need to provide your company details, registration documents, and verify your email address. Once approved, you can start browsing and bidding on tenders.'
        },
        {
          id: 'profile-completion',
          question: 'What information do I need to complete my profile?',
          answer: 'A complete profile includes company registration details, contact information, industry certifications, insurance documents, and previous project references. Having a complete profile increases your chances of winning tenders.'
        }
      ]
    },
    {
      title: 'Bidding Process',
      items: [
        {
          id: 'submit-proposal',
          question: 'How do I submit a proposal for a tender?',
          answer: 'Navigate to the tender details page, review all requirements and documents, then click "Submit Proposal". You can use our AI assistant to help draft your proposal or upload your own documents. Make sure to submit before the deadline.'
        },
        {
          id: 'proposal-status',
          question: 'How can I track my proposal status?',
          answer: 'You can track all your proposals in the "My Proposals" section of your dashboard. You\'ll receive email notifications for status updates, and the system will show whether your proposal is under review, shortlisted, or awarded.'
        }
      ]
    },
    {
      title: 'AI Assistant',
      items: [
        {
          id: 'ai-features',
          question: 'What can the AI assistant help me with?',
          answer: 'Our AI assistant can analyze tender requirements, suggest proposal strategies, help draft content, identify key strengths to highlight, and provide competitive analysis. It learns from successful proposals to improve recommendations.'
        },
        {
          id: 'ai-accuracy',
          question: 'How accurate are the AI recommendations?',
          answer: 'Our AI is trained on thousands of successful proposals and tender outcomes. While recommendations are highly relevant, we always recommend reviewing and customizing the content to match your company\'s specific strengths and approach.'
        }
      ]
    },
    {
      title: 'Reputation System',
      items: [
        {
          id: 'blockchain-verification',
          question: 'How does blockchain verification work?',
          answer: 'All performance attestations are recorded on the Algorand blockchain, making them tamper-proof and verifiable. When you complete a project, the client can issue an attestation that becomes part of your permanent reputation record.'
        },
        {
          id: 'reputation-score',
          question: 'How is my reputation score calculated?',
          answer: 'Your reputation score is calculated based on verified attestations from completed projects, including factors like delivery quality, timeline adherence, compliance, and client satisfaction. All scores are weighted by project value and recency.'
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
      </div>

      <div className="p-6">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8 last:mb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{category.title}</h3>
            
            <div className="space-y-2">
              {category.items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={openItems.includes(item.id)}
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    {openItems.includes(item.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {openItems.includes(item.id) && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;