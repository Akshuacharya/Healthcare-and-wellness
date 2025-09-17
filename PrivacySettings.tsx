import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Download, Trash2, AlertTriangle, Check } from 'lucide-react';

interface PrivacySettingsProps {
  user: {
    name: string;
    avatar: string;
    currentMood: string;
    streakDays: number;
  };
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ user }) => {
  const [dataEncryption, setDataEncryption] = useState(true);
  const [anonymizedAnalytics, setAnonymizedAnalytics] = useState(true);
  const [localDataStorage, setLocalDataStorage] = useState(true);
  const [aiProcessing, setAiProcessing] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const privacyFeatures = [
    {
      title: "End-to-End Encryption",
      description: "Your journal entries and personal data are encrypted using AES-256 encryption",
      icon: "🔐",
      status: "Active",
      color: "text-green-600"
    },
    {
      title: "Local Data Storage",
      description: "Your sensitive data is stored locally on your device, not in the cloud",
      icon: "💾",
      status: "Enabled",
      color: "text-blue-600"
    },
    {
      title: "Anonymous Analytics",
      description: "We collect anonymized usage data to improve the app without identifying you",
      icon: "📊",
      status: "Anonymized",
      color: "text-purple-600"
    },
    {
      title: "Zero Data Selling",
      description: "We never sell, rent, or share your personal data with third parties",
      icon: "🚫",
      status: "Guaranteed",
      color: "text-red-600"
    }
  ];

  const dataCategories = [
    {
      category: "Journal Entries",
      description: "Your personal thoughts and reflections",
      encrypted: true,
      local: true,
      shared: false
    },
    {
      category: "Mood Data",
      description: "Your daily mood ratings and patterns",
      encrypted: true,
      local: true,
      shared: false
    },
    {
      category: "Chat History",
      description: "Conversations with the AI companion",
      encrypted: true,
      local: true,
      shared: false
    },
    {
      category: "Usage Analytics",
      description: "App usage patterns (anonymized)",
      encrypted: false,
      local: false,
      shared: true
    }
  ];

  const handleDataExport = () => {
    // Simulate data export
    alert('Your data export has been prepared. In a real app, this would download a secure file with your data.');
  };

  const handleDataDeletion = () => {
    if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      alert('Data deletion initiated. In a real app, all your personal data would be permanently removed.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-700 rounded-xl flex items-center justify-center">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Privacy & Security</h2>
            <p className="text-gray-600">Your data protection and privacy controls</p>
          </div>
        </div>
      </div>

      {/* Privacy Overview */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
          <Shield className="mr-2" size={20} />
          Your Privacy is Protected
        </h3>
        <p className="text-green-700 mb-4">
          The Mindful Mentor is designed with privacy-first principles. Your personal information and mental health data are kept secure and private.
        </p>
        <div className="grid md:grid-cols-4 gap-4">
          {privacyFeatures.map((feature, index) => (
            <div key={index} className="bg-white/60 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">{feature.title}</h4>
              <p className={`text-xs font-medium ${feature.color}`}>{feature.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Privacy Controls</h3>
        
        <div className="space-y-6">
          {/* Data Encryption */}
          <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">Data Encryption</h4>
              <p className="text-sm text-gray-600">Encrypt all personal data with military-grade security</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${dataEncryption ? 'text-green-600' : 'text-gray-500'}`}>
                {dataEncryption ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={() => setDataEncryption(!dataEncryption)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  dataEncryption ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    dataEncryption ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Anonymous Analytics */}
          <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">Anonymous Analytics</h4>
              <p className="text-sm text-gray-600">Help improve the app with anonymized usage data</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${anonymizedAnalytics ? 'text-blue-600' : 'text-gray-500'}`}>
                {anonymizedAnalytics ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={() => setAnonymizedAnalytics(!anonymizedAnalytics)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  anonymizedAnalytics ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    anonymizedAnalytics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Local Storage */}
          <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">Local Data Storage</h4>
              <p className="text-sm text-gray-600">Store sensitive data locally on your device</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${localDataStorage ? 'text-purple-600' : 'text-gray-500'}`}>
                {localDataStorage ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={() => setLocalDataStorage(!localDataStorage)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localDataStorage ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localDataStorage ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* AI Processing */}
          <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">AI Analysis</h4>
              <p className="text-sm text-gray-600">Allow AI to provide personalized insights and recommendations</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${aiProcessing ? 'text-indigo-600' : 'text-gray-500'}`}>
                {aiProcessing ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={() => setAiProcessing(!aiProcessing)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  aiProcessing ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    aiProcessing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Categories */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Your Data</h3>
          <button
            onClick={() => setShowSensitiveData(!showSensitiveData)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
          >
            {showSensitiveData ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{showSensitiveData ? 'Hide' : 'Show'} Details</span>
          </button>
        </div>

        <div className="space-y-4">
          {dataCategories.map((data, index) => (
            <div key={index} className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{data.category}</h4>
                <div className="flex space-x-2">
                  {data.encrypted && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      🔒 Encrypted
                    </span>
                  )}
                  {data.local && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      💾 Local
                    </span>
                  )}
                  {data.shared && (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      📊 Anonymous
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600">{data.description}</p>
              
              {showSensitiveData && (
                <div className="mt-3 text-xs text-gray-500">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-1">
                      {data.encrypted ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <AlertTriangle size={12} className="text-orange-500" />
                      )}
                      <span>Encryption: {data.encrypted ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {data.local ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <AlertTriangle size={12} className="text-orange-500" />
                      )}
                      <span>Local: {data.local ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!data.shared ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <AlertTriangle size={12} className="text-orange-500" />
                      )}
                      <span>Private: {!data.shared ? 'Yes' : 'Anonymous'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Data Management</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={handleDataExport}
            className="flex items-center justify-center space-x-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-blue-700 border border-blue-200 transition-colors"
          >
            <Download size={20} />
            <span>Export My Data</span>
          </button>
          
          <button
            onClick={handleDataDeletion}
            className="flex items-center justify-center space-x-2 p-4 bg-red-50 hover:bg-red-100 rounded-xl text-red-700 border border-red-200 transition-colors"
          >
            <Trash2 size={20} />
            <span>Delete All Data</span>
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Important Privacy Notice</h4>
              <p className="text-yellow-700 text-sm">
                This app is designed for wellness support and is not a replacement for professional mental health care. 
                If you're experiencing a mental health crisis, please contact a mental health professional or crisis helpline immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Privacy Questions?</h3>
        <p className="text-gray-700 text-sm mb-4">
          If you have questions about how your data is handled or need support with privacy settings, we're here to help.
        </p>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 text-sm border">
            Privacy Policy
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;