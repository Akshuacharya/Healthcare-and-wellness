import React from 'react';
import { MessageCircle, BookOpen, Lightbulb, User, Heart, TrendingUp, Calendar, Target } from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    avatar: string;
    currentMood: string;
    streakDays: number;
  };
  onNavigate: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const quickActions = [
    {
      id: 'chat',
      title: 'Chat with AI',
      subtitle: 'Hi! How can I support you today?',
      icon: '🤖',
      color: 'from-blue-400 to-purple-400',
      action: () => onNavigate('chat')
    },
    {
      id: 'journal',
      title: 'Journal',
      subtitle: 'How are you feeling?',
      icon: '📝',
      color: 'from-indigo-400 to-pink-400',
      action: () => onNavigate('journal')
    }
  ];

  const aiSuggestions = [
    {
      title: 'Tips for dealing with stress',
      description: 'Based on your recent entries',
      icon: '💡',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      title: 'Breathing exercise',
      description: 'Perfect for your current mood',
      icon: '🫁',
      color: 'from-teal-400 to-blue-400'
    }
  ];

  const wellnessAreas = [
    {
      title: 'Meditation',
      subtitle: 'Find your inner peace',
      icon: '🧘‍♀️',
      color: 'from-green-400 to-teal-400',
      action: () => onNavigate('meditation')
    },
    {
      title: 'Motivation',
      subtitle: 'Daily inspiration',
      icon: '☀️',
      color: 'from-orange-400 to-red-400',
      action: () => onNavigate('motivation')
    }
  ];

  const moodData = [
    { day: 'Mon', mood: 7 },
    { day: 'Tue', mood: 6 },
    { day: 'Wed', mood: 8 },
    { day: 'Thu', mood: 5 },
    { day: 'Fri', mood: 7 },
    { day: 'Sat', mood: 9 },
    { day: 'Sun', mood: 8 }
  ];

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'bg-green-400';
    if (mood >= 6) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name}! 🌟</h2>
        <p className="text-gray-600 text-lg">Ready to take care of your mental wellness today?</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {quickActions.map((action) => (
          <div
            key={action.id}
            onClick={action.action}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center text-2xl`}>
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{action.title}</h3>
                <p className="text-gray-600">{action.subtitle}</p>
              </div>
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                ✓
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Suggestions */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Lightbulb className="mr-2 text-yellow-500" />
          AI Suggestions
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {aiSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${suggestion.color} rounded-xl flex items-center justify-center text-xl`}>
                  {suggestion.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="mr-2 text-blue-500" />
          Weekly Mood Tracker
        </h3>
        <div className="flex justify-between items-end h-32">
          {moodData.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className={`w-8 rounded-t-lg ${getMoodColor(data.mood)}`}
                style={{ height: `${(data.mood / 10) * 100}px` }}
              />
              <span className="text-sm text-gray-600">{data.day}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span>Great (8-10)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span>Good (6-7)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span>Challenging (1-5)</span>
          </div>
        </div>
      </div>

      {/* Wellness Areas */}
      <div className="grid md:grid-cols-2 gap-6">
        {wellnessAreas.map((area, index) => (
          <div
            key={index}
            onClick={area.action}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <div className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-r ${area.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4`}>
                {area.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{area.title}</h3>
              <p className="text-gray-600">{area.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;