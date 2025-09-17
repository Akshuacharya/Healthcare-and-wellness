import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw, Star, Target, Zap, TrendingUp, BookOpen, Award } from 'lucide-react';

interface MotivationCenterProps {
  user: {
    name: string;
    avatar: string;
    currentMood: string;
    streakDays: number;
  };
}

interface Quote {
  text: string;
  author: string;
  category: string;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  category: string;
  color: string;
}

const MotivationCenter: React.FC<MotivationCenterProps> = ({ user }) => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);

  const quotes: Quote[] = [
    {
      text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
      author: "A.A. Milne",
      category: "Self-Belief"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Passion"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Perseverance"
    },
    {
      text: "Your mental health is everything – prioritize it. Make the time like your life depends on it, because it does.",
      author: "Mel Robbins",
      category: "Mental Health"
    },
    {
      text: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde",
      category: "Authenticity"
    },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
      category: "Resilience"
    },
    {
      text: "You don't have to control your thoughts. You just have to stop letting them control you.",
      author: "Dan Millman",
      category: "Mindfulness"
    },
    {
      text: "Every small positive change you make in your life adds up to bigger changes.",
      author: "Anonymous",
      category: "Progress"
    }
  ];

  const dailyAffirmations = [
    "I am worthy of love, happiness, and success",
    "I choose to focus on what I can control",
    "I am growing stronger with each challenge I face",
    "My mental health is a priority, and I deserve care",
    "I trust my ability to handle whatever comes my way",
    "I am making progress, even if it's not visible yet",
    "I deserve compassion, especially from myself",
    "Every day is a new opportunity to grow"
  ];

  const sampleGoals: Goal[] = [
    {
      id: '1',
      title: 'Daily Meditation',
      progress: 7,
      target: 30,
      category: 'Wellness',
      color: 'from-green-400 to-teal-400'
    },
    {
      id: '2',
      title: 'Journal Entries',
      progress: 12,
      target: 30,
      category: 'Self-Care',
      color: 'from-blue-400 to-purple-400'
    },
    {
      id: '3',
      title: 'Study Sessions',
      progress: 8,
      target: 20,
      category: 'Academic',
      color: 'from-orange-400 to-red-400'
    },
    {
      id: '4',
      title: 'Positive Interactions',
      progress: 15,
      target: 25,
      category: 'Social',
      color: 'from-pink-400 to-purple-400'
    }
  ];

  const studentAchievements = [
    "🎯 Completed first week of daily meditation",
    "📝 Maintained journal writing streak for 7 days",
    "🌟 Reached out for support when needed",
    "💪 Practiced self-compassion during difficult times",
    "🧘 Used breathing techniques during stress",
    "📚 Balanced study time with self-care",
    "🤝 Connected with friends for emotional support",
    "🌱 Recognized personal growth patterns"
  ];

  useEffect(() => {
    // Set random quote on load
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Set sample goals
    setGoals(sampleGoals);
    
    // Set daily affirmations (randomized)
    const shuffledAffirmations = [...dailyAffirmations].sort(() => Math.random() - 0.5);
    setAffirmations(shuffledAffirmations.slice(0, 4));
    
    // Set achievements
    setAchievements(studentAchievements.slice(0, 6));
  }, []);

  const getNewQuote = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(newQuote);
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-blue-600';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center">
            <Heart className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Motivation Center</h2>
            <p className="text-gray-600">Daily inspiration and encouragement for your wellness journey</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
        <h3 className="text-xl font-bold text-orange-800 mb-2">
          Good job today, {user.name}! 🌟
        </h3>
        <p className="text-orange-700">
          You're on a {user.streakDays}-day wellness streak! Every step you take towards caring for your mental health matters.
        </p>
      </div>

      {/* Daily Quote */}
      {currentQuote && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-white" size={24} />
            </div>
            <blockquote className="text-xl text-gray-800 font-medium leading-relaxed mb-4">
              "{currentQuote.text}"
            </blockquote>
            <cite className="text-gray-600 text-sm">
              — {currentQuote.author}
            </cite>
            <div className="mt-2">
              <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                {currentQuote.category}
              </span>
            </div>
          </div>
          <button
            onClick={getNewQuote}
            className="flex items-center space-x-2 mx-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            <RefreshCw size={16} />
            <span>New Quote</span>
          </button>
        </div>
      )}

      {/* Daily Affirmations */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Zap className="mr-2 text-yellow-500" />
          Daily Affirmations
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {affirmations.map((affirmation, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200"
            >
              <p className="text-yellow-800 font-medium text-center">
                {affirmation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="mr-2 text-blue-500" />
          Your Progress
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {goals.map((goal) => {
            const progressPercentage = Math.min((goal.progress / goal.target) * 100, 100);
            return (
              <div
                key={goal.id}
                className="bg-white/50 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                  <span className={`text-sm font-bold ${getProgressColor(goal.progress, goal.target)}`}>
                    {goal.progress}/{goal.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${goal.color} transition-all duration-300`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{goal.category}</span>
                  <span>{Math.round(progressPercentage)}% complete</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Award className="mr-2 text-purple-500" />
          Recent Achievements
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
            >
              <p className="text-purple-800 text-sm font-medium">
                {achievement}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips for Students */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
          <BookOpen className="mr-2" size={20} />
          Wellness Tips for Students
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="text-blue-700 text-sm">
            • Take breaks every 25-30 minutes while studying
          </div>
          <div className="text-blue-700 text-sm">
            • Practice the 20-20-20 rule for eye health
          </div>
          <div className="text-blue-700 text-sm">
            • Keep a consistent sleep schedule
          </div>
          <div className="text-blue-700 text-sm">
            • Stay hydrated and eat nutritious meals
          </div>
          <div className="text-blue-700 text-sm">
            • Connect with friends and family regularly
          </div>
          <div className="text-blue-700 text-sm">
            • Celebrate small victories and progress
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationCenter;