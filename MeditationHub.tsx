import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, User, Headphones, Brain, Heart } from 'lucide-react';

interface MeditationHubProps {
  user: {
    name: string;
    avatar: string;
    currentMood: string;
    streakDays: number;
  };
}

interface MeditationSession {
  id: string;
  title: string;
  duration: number;
  type: 'breathing' | 'mindfulness' | 'body-scan' | 'loving-kindness';
  description: string;
  icon: string;
  color: string;
  instructions: string[];
}

const MeditationHub: React.FC<MeditationHubProps> = ({ user }) => {
  const [activeSession, setActiveSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const meditationSessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Calm Breathing',
      duration: 300, // 5 minutes
      type: 'breathing',
      description: 'Simple breathing exercise to reduce stress and anxiety',
      icon: '🫁',
      color: 'from-blue-400 to-cyan-400',
      instructions: [
        'Find a comfortable seated position',
        'Close your eyes or soften your gaze',
        'Breathe in slowly for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale slowly for 6 counts',
        'Repeat this cycle mindfully',
        'Focus only on your breath',
        'Let thoughts pass without judgment'
      ]
    },
    {
      id: '2',
      title: 'Mindful Awareness',
      duration: 600, // 10 minutes
      type: 'mindfulness',
      description: 'Present moment awareness meditation for clarity',
      icon: '🧘‍♀️',
      color: 'from-green-400 to-teal-400',
      instructions: [
        'Sit comfortably with spine straight',
        'Notice your body\'s position',
        'Bring awareness to your breath',
        'Observe thoughts without attachment',
        'Notice sounds around you',
        'Feel sensations in your body',
        'Return to breath when mind wanders',
        'Rest in present moment awareness'
      ]
    },
    {
      id: '3',
      title: 'Body Scan Relaxation',
      duration: 900, // 15 minutes
      type: 'body-scan',
      description: 'Progressive relaxation from head to toe',
      icon: '🌊',
      color: 'from-purple-400 to-pink-400',
      instructions: [
        'Lie down comfortably',
        'Close your eyes and relax',
        'Start at the top of your head',
        'Notice tension and let it go',
        'Move slowly down your body',
        'Relax each muscle group',
        'Breathe into areas of tension',
        'End at your toes, fully relaxed'
      ]
    },
    {
      id: '4',
      title: 'Loving Kindness',
      duration: 480, // 8 minutes
      type: 'loving-kindness',
      description: 'Cultivate compassion for self and others',
      icon: '💖',
      color: 'from-rose-400 to-orange-400',
      instructions: [
        'Sit comfortably and breathe naturally',
        'Bring yourself to mind lovingly',
        'Say: "May I be happy and peaceful"',
        'Feel genuine care for yourself',
        'Think of someone you love',
        'Send them the same loving wishes',
        'Extend to neutral people',
        'Include all beings everywhere'
      ]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && activeSession) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= activeSession.duration) {
            setIsPlaying(false);
            return activeSession.duration;
          }
          return prev + 1;
        });
        
        // Progress through instructions
        if (activeSession) {
          const stepDuration = activeSession.duration / activeSession.instructions.length;
          const newStep = Math.floor(currentTime / stepDuration);
          if (newStep !== currentStep && newStep < activeSession.instructions.length) {
            setCurrentStep(newStep);
          }
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, activeSession, currentTime, currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!activeSession) return 0;
    return (currentTime / activeSession.duration) * 100;
  };

  const handleSessionStart = (session: MeditationSession) => {
    setActiveSession(session);
    setCurrentTime(0);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setCurrentTime(0);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const endSession = () => {
    setActiveSession(null);
    setCurrentTime(0);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  if (activeSession) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-8">
          {/* Session Header */}
          <div className="text-center mb-8">
            <div className={`w-20 h-20 bg-gradient-to-r ${activeSession.color} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4`}>
              {activeSession.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{activeSession.title}</h2>
            <p className="text-gray-600">{activeSession.description}</p>
          </div>

          {/* Progress Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(156, 163, 175, 0.3)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">
                    {formatTime(activeSession.duration - currentTime)}
                  </div>
                  <div className="text-sm text-gray-600">remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Instruction */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Focus</h3>
              <p className="text-gray-700 text-xl leading-relaxed">
                {activeSession.instructions[currentStep] || activeSession.instructions[activeSession.instructions.length - 1]}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Step {Math.min(currentStep + 1, activeSession.instructions.length)} of {activeSession.instructions.length}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex items-center justify-center"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetSession}
              className="w-16 h-16 bg-white/60 text-gray-700 rounded-full hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 flex items-center justify-center"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={endSession}
              className="w-16 h-16 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 flex items-center justify-center text-sm"
            >
              End
            </button>
          </div>

          {/* Session Complete */}
          {currentTime >= activeSession.duration && (
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Session Complete!</h3>
                <p className="text-green-700">
                  Wonderful job completing your meditation practice. Take a moment to notice how you feel.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Meditation Hub</h2>
            <p className="text-gray-600">Find your inner peace with guided meditation sessions</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Brain className="text-white" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">7</div>
          <div className="text-sm text-gray-600">Days Meditated</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Clock className="text-white" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">45</div>
          <div className="text-sm text-gray-600">Minutes Total</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Heart className="text-white" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">12</div>
          <div className="text-sm text-gray-600">Sessions</div>
        </div>
      </div>

      {/* Meditation Sessions */}
      <div className="grid md:grid-cols-2 gap-6">
        {meditationSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${session.color} rounded-2xl flex items-center justify-center text-2xl`}>
                {session.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{session.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{session.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  {Math.floor(session.duration / 60)} minutes
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleSessionStart(session)}
              className={`w-full py-3 bg-gradient-to-r ${session.color} text-white rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex items-center justify-center space-x-2`}
            >
              <Play size={18} />
              <span>Start Session</span>
            </button>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
          <Headphones className="mr-2" size={20} />
          Meditation Tips
        </h3>
        <ul className="space-y-2 text-blue-700">
          <li>• Find a quiet, comfortable space where you won't be disturbed</li>
          <li>• Use headphones for better focus and audio quality</li>
          <li>• Start with shorter sessions and gradually increase duration</li>
          <li>• Don't worry about "doing it right" - there's no perfect meditation</li>
          <li>• Consistency matters more than duration - even 5 minutes daily helps</li>
        </ul>
      </div>
    </div>
  );
};

export default MeditationHub;