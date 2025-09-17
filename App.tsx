import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import JournalEntry from './components/JournalEntry';
import MeditationHub from './components/MeditationHub';
import MotivationCenter from './components/MotivationCenter';
import PrivacySettings from './components/PrivacySettings';
import { User, MessageCircle, BookOpen, Brain, Heart, Shield } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user] = useState({
    name: 'Alex',
    avatar: '👩‍🎓',
    currentMood: 'neutral',
    streakDays: 7
  });

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Brain, color: 'bg-purple-500' },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle, color: 'bg-blue-500' },
    { id: 'journal', label: 'Journal', icon: BookOpen, color: 'bg-indigo-500' },
    { id: 'meditation', label: 'Meditation', icon: User, color: 'bg-green-500' },
    { id: 'motivation', label: 'Motivation', icon: Heart, color: 'bg-orange-500' },
    { id: 'privacy', label: 'Privacy', icon: Shield, color: 'bg-gray-500' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setActiveSection} />;
      case 'chat':
        return <ChatInterface user={user} />;
      case 'journal':
        return <JournalEntry user={user} />;
      case 'meditation':
        return <MeditationHub user={user} />;
      case 'motivation':
        return <MotivationCenter user={user} />;
      case 'privacy':
        return <PrivacySettings user={user} />;
      default:
        return <Dashboard user={user} onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                🧠
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  The Mindful Mentor
                </h1>
                <p className="text-gray-600 text-sm">Your AI Mental Health Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-semibold text-gray-800">Hello, {user.name}!</p>
                <p className="text-sm text-gray-600">{user.streakDays} day streak 🔥</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xl">
                {user.avatar}
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {navigation.map((nav) => {
              const Icon = nav.icon;
              const isActive = activeSection === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveSection(nav.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? `${nav.color} text-white shadow-lg transform scale-105`
                      : 'bg-white/70 text-gray-700 hover:bg-white/90 hover:scale-105'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{nav.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="transition-all duration-300">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

export default App;