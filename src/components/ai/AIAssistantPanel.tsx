import React, { useState } from 'react';
import { Bot, Sparkles, FileText, Lightbulb, MessageCircle, Send, Loader2 } from 'lucide-react';

interface AIAssistantPanelProps {
  tenderId: string;
}

/**
 * AI Assistant panel for tender analysis and proposal generation
 */
const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ tenderId }) => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: '1',
      type: 'ai' as const,
      message: 'Hello! I\'m here to help you with this tender. I can analyze requirements, suggest proposal strategies, and answer questions.',
      timestamp: new Date()
    }
  ]);

  const aiSuggestions = [
    {
      icon: Lightbulb,
      title: 'Key Strengths to Highlight',
      description: 'Emphasize your smart city experience and ISO certifications',
      action: 'View Details'
    },
    {
      icon: FileText,
      title: 'Proposal Template',
      description: 'Generate a customized proposal template for this tender',
      action: 'Generate'
    },
    {
      icon: Sparkles,
      title: 'Competitive Analysis',
      description: 'Analyze market positioning and competitor strategies',
      action: 'Analyze'
    }
  ];

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      message: chatMessage,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        message: 'Based on the tender requirements, I recommend focusing on your smart city expertise and highlighting your ISO 27001 certification. Would you like me to help draft specific sections of your proposal?',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 h-fit sticky top-6">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-sm text-gray-500">Tender analysis & proposal help</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'suggestions'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Suggestions
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'chat'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Chat
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">AI Recommendations</h4>
            
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <suggestion.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 text-sm mb-1">
                      {suggestion.title}
                    </h5>
                    <p className="text-sm text-gray-600 mb-3">
                      {suggestion.description}
                    </p>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      {suggestion.action} →
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium">
                Generate Full Proposal Draft
              </button>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="space-y-4">
            {/* Chat history */}
            <div className="h-64 overflow-y-auto space-y-3 bg-gray-50 rounded-lg p-3">
              {chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-600">AI Assistant</span>
                      </div>
                    )}
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about this tender..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !chatMessage.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPanel;