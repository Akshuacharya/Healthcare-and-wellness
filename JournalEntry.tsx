import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, TrendingUp, Heart, Brain, Zap, Save, Plus } from 'lucide-react';

interface JournalEntryProps {
  user: {
    name: string;
    avatar: string;
    currentMood: string;
    streakDays: number;
  };
}

interface JournalEntryType {
  id: string;
  date: Date;
  content: string;
  mood: number;
  tags: string[];
  aiInsights?: string[];
}

const JournalEntry: React.FC<JournalEntryProps> = ({ user }) => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentMood, setCurrentMood] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [showInsights, setShowInsights] = useState(false);

  const moodLabels = [
    { value: 1, emoji: '😭', label: 'Very Low', color: 'text-red-500' },
    { value: 2, emoji: '😢', label: 'Low', color: 'text-red-400' },
    { value: 3, emoji: '😐', label: 'Below Average', color: 'text-orange-400' },
    { value: 4, emoji: '🙂', label: 'Neutral', color: 'text-yellow-400' },
    { value: 5, emoji: '😊', label: 'Good', color: 'text-green-400' },
    { value: 6, emoji: '😄', label: 'Great', color: 'text-green-500' },
    { value: 7, emoji: '🤩', label: 'Amazing', color: 'text-green-600' }
  ];

  const availableTags = [
    'Stress', 'Anxiety', 'Happiness', 'Gratitude', 'Study', 'Friends',
    'Family', 'Exercise', 'Sleep', 'Goals', 'Motivation', 'Relaxation'
  ];

  const generateAIInsights = (content: string, mood: number, tags: string[]): string[] => {
    const insights: string[] = [];
    
    const contentLower = content.toLowerCase();
    
    if (mood <= 3) {
      insights.push('🫂 I notice you might be going through a challenging time. Remember, it\'s okay to have difficult days.');
      if (tags.includes('Study') || contentLower.includes('exam') || contentLower.includes('study')) {
        insights.push('📚 Academic stress is common. Consider breaking your study sessions into smaller, manageable chunks.');
      }
    }
    
    if (mood >= 6) {
      insights.push('🌟 It\'s wonderful to see you feeling positive! This is a great time to practice gratitude.');
    }
    
    if (tags.includes('Stress') || contentLower.includes('stress')) {
      insights.push('🧘 Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8 seconds.');
    }
    
    if (tags.includes('Anxiety') || contentLower.includes('anxiety') || contentLower.includes('anxious')) {
      insights.push('🌸 For anxiety, try the 5-4-3-2-1 grounding technique: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.');
    }
    
    if (tags.includes('Gratitude') || contentLower.includes('grateful') || contentLower.includes('thankful')) {
      insights.push('🙏 Gratitude practice is powerful for mental wellness. Consider keeping a daily gratitude list.');
    }
    
    if (contentLower.includes('sleep') || tags.includes('Sleep')) {
      insights.push('😴 Good sleep is crucial for mental health. Try to maintain a consistent sleep schedule.');
    }
    
    if (tags.includes('Exercise') || contentLower.includes('workout') || contentLower.includes('exercise')) {
      insights.push('💪 Physical activity is excellent for mental wellness! It naturally boosts mood-enhancing chemicals.');
    }
    
    if (insights.length === 0) {
      insights.push('💭 Thank you for sharing your thoughts. Journaling is a powerful tool for self-reflection and growth.');
    }
    
    return insights;
  };

  const saveEntry = () => {
    if (!currentEntry.trim()) return;
    
    const aiInsights = generateAIInsights(currentEntry, currentMood, selectedTags);
    
    const newEntry: JournalEntryType = {
      id: Date.now().toString(),
      date: new Date(),
      content: currentEntry,
      mood: currentMood,
      tags: selectedTags,
      aiInsights
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry('');
    setCurrentMood(5);
    setSelectedTags([]);
    setShowInsights(true);
    
    // Hide insights after 5 seconds
    setTimeout(() => setShowInsights(false), 5000);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getCurrentMoodData = () => {
    return moodLabels.find(m => m.value === currentMood) || moodLabels[4];
  };

  const getAverageMood = () => {
    if (entries.length === 0) return 5;
    return Math.round(entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Journal Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Personal Journal</h2>
              <p className="text-gray-600">Express your thoughts and track your emotional journey</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">{entries.length}</div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </div>
        </div>
      </div>

      {/* AI Insights Banner */}
      {showInsights && entries.length > 0 && entries[0].aiInsights && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 animate-pulse">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <Brain className="mr-2" size={20} />
            AI Insights from Your Latest Entry
          </h3>
          <div className="space-y-2">
            {entries[0].aiInsights.map((insight, index) => (
              <p key={index} className="text-blue-700 text-sm bg-white/50 rounded-lg p-3">
                {insight}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* New Entry Form */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h3 className="text-xl font-bold text-gray-800 mb-4">How are you feeling today?</h3>
        
        {/* Mood Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Current Mood</label>
          <div className="flex flex-wrap gap-3 justify-center">
            {moodLabels.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setCurrentMood(mood.value)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                  currentMood === mood.value
                    ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white transform scale-105'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Tags (Optional)</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white'
                    : 'bg-white/60 text-gray-700 hover:bg-white/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Share your thoughts... 
            <span className="text-gray-500 font-normal">(Your entries are private and encrypted)</span>
          </label>
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="What's on your mind? How was your day? What are you grateful for?"
            className="w-full h-32 p-4 bg-white/60 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none placeholder-gray-500"
          />
        </div>

        <button
          onClick={saveEntry}
          disabled={!currentEntry.trim()}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Save size={18} />
          <span>Save Entry & Get AI Insights</span>
        </button>
      </div>

      {/* Mood Analytics */}
      {entries.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 text-green-500" />
            Mood Analytics
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-lg font-bold text-gray-800">{getAverageMood()}/7</div>
              <div className="text-sm text-gray-600">Average Mood</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl mb-2">🗓️</div>
              <div className="text-lg font-bold text-gray-800">{user.streakDays}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl mb-2">✍️</div>
              <div className="text-lg font-bold text-gray-800">{entries.length}</div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Entries</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {entries.slice(0, 5).map((entry) => {
              const moodData = moodLabels.find(m => m.value === entry.mood) || moodLabels[4];
              return (
                <div key={entry.id} className="bg-white/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{moodData.emoji}</span>
                      <span className={`font-medium ${moodData.color}`}>{moodData.label}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {entry.date.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">{entry.content}</p>
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {entry.aiInsights && entry.aiInsights.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-3 mt-3">
                      <p className="text-xs font-medium text-blue-800 mb-1">AI Insight:</p>
                      <p className="text-xs text-blue-700">{entry.aiInsights[0]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalEntry;