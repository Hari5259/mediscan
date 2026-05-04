import React, { useState, useEffect } from 'react';
import { ChevronLeft, Heart, Play, Flower2, Music, Sun, Moon, Volume2, Sparkles, Pause, SkipForward, Maximize2, Wind, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function YogaMeditation() {
  const navigate = useNavigate();
  const [activeSound, setActiveSound] = useState('ocean');
  const [activeSession, setActiveSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  const programs = [
    {
      id: 1,
      title: 'Sunrise Vinyasa',
      duration: '20 Min',
      level: 'All Levels',
      focus: 'Energy & Flexibility',
      icon: Sun,
      bg: 'from-amber-400 to-rose-500',
      glow: 'shadow-amber-500/50'
    },
    {
      id: 2,
      title: 'Deep Rest Yin',
      duration: '45 Min',
      level: 'Beginner',
      focus: 'Relaxation & Recovery',
      icon: Moon,
      bg: 'from-indigo-500 to-purple-600',
      glow: 'shadow-purple-500/50'
    },
    {
      id: 3,
      title: 'Chakra Alignment',
      duration: '30 Min',
      level: 'Intermediate',
      focus: 'Balance & Mind',
      icon: Sparkles,
      bg: 'from-teal-400 to-emerald-600',
      glow: 'shadow-emerald-500/50'
    }
  ];

  const poses = [
    { name: 'Lotus Pose', focus: 'Meditation', desc: 'Opens hips, calms brain.' },
    { name: 'Downward Dog', focus: 'Full Body', desc: 'Stretches hamstrings & back.' },
    { name: 'Warrior II', focus: 'Strength', desc: 'Builds stamina & balance.' },
    { name: 'Tree Pose', focus: 'Balance', desc: 'Improves focus & stability.' }
  ];

  const soundscapes = [
    { id: 'rain', name: 'Gentle Rain', icon: Volume2 },
    { id: 'forest', name: 'Deep Forest', icon: Volume2 },
    { id: 'ocean', name: 'Ocean Waves', icon: Volume2 },
    { id: 'bowls', name: 'Singing Bowls', icon: Music },
  ];

  useEffect(() => {
    let timer;
    if (activeSession && isPlaying) {
      timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeSession, isPlaying]);

  const toggleSound = (id) => {
    setActiveSound(activeSound === id ? null : id);
  };

  const startSession = (program) => {
    setActiveSession(program);
    setIsPlaying(true);
    setSessionTime(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // If a session is active, show the immersive player UI
  if (activeSession) {
    return (
      <div className={`min-h-screen flex flex-col relative overflow-hidden bg-gray-900 transition-colors duration-1000`}>
        {/* Full-screen ambient animation */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSession.bg} opacity-30 animate-pulse duration-[5000ms]`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px]" />
        
        <div className="relative z-10 p-8 flex justify-between items-center w-full">
          <button 
            onClick={() => setActiveSession(null)}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-white text-sm font-black uppercase tracking-widest opacity-70 mb-1">Now Practicing</h2>
            <h1 className="text-white text-2xl font-bold">{activeSession.title}</h1>
          </div>
          <button className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all">
            <Maximize2 size={20} />
          </button>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          {/* Main Visualizer */}
          <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center mb-16">
            <div className={`absolute inset-0 rounded-full border-2 border-white/20 ${isPlaying ? 'animate-ping' : ''} duration-[3000ms]`} />
            <div className={`absolute inset-4 rounded-full border border-white/10 ${isPlaying ? 'animate-pulse' : ''} duration-[2000ms]`} />
            
            <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${activeSession.bg} shadow-2xl ${activeSession.glow} flex items-center justify-center backdrop-blur-xl border border-white/20`}>
              <activeSession.icon size={64} className="text-white opacity-80" />
            </div>
          </div>

          <div className="text-white text-7xl md:text-8xl font-light tabular-nums mb-12 drop-shadow-lg">
            {formatTime(sessionTime)}
          </div>

          <div className="flex items-center gap-8">
            <button className="text-white/50 hover:text-white transition-colors">
              <Activity size={28} />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-24 h-24 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-2" />}
            </button>
            <button className="text-white/50 hover:text-white transition-colors">
              <SkipForward size={28} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Library UI
  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-8 md:p-12 mt-4 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                  <Flower2 size={28} className="text-white" />
                </div>
                <h1 className="text-[42px] font-black tracking-tighter leading-tight text-white">Mind & Body</h1>
              </div>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2 ml-1">Premium Yoga & Meditation</p>
            </div>
            <button
              onClick={() => navigate('/exercise')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-rose-400 hover:text-white bg-white/5 hover:bg-rose-500/40 px-6 py-3 rounded-full transition-all border border-white/10"
            >
              <ChevronLeft size={16} /> Hub
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10">
            {/* Left Column: Programs & Poses */}
            <div className="xl:col-span-2 space-y-10">
              
              <section>
                <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
                  <Sparkles size={24} className="text-rose-400" />
                  Guided Journeys
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {programs.map((program) => (
                    <div 
                      key={program.id} 
                      onClick={() => startSession(program)}
                      className="group cursor-pointer rounded-[24px] overflow-hidden bg-black/40 border border-white/10 hover:border-rose-500/50 transition-all duration-300 relative shadow-xl"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${program.bg} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                      
                      <div className="relative p-8">
                        <div className="flex justify-between items-start mb-10">
                          <div className={`p-4 rounded-2xl bg-gradient-to-br ${program.bg} shadow-lg ${program.glow}`}>
                            <program.icon size={28} className="text-white" />
                          </div>
                          <span className="px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-widest text-white border border-white/20">
                            {program.level}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-rose-200 transition-all">{program.title}</h3>
                        <p className="text-gray-400 text-[15px] font-medium mb-8">{program.focus}</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                          <span className="text-rose-300 font-bold text-sm tracking-wider flex items-center gap-2">
                            <Wind size={16} /> {program.duration}
                          </span>
                          <div className="w-12 h-12 rounded-full bg-white text-rose-600 flex items-center justify-center transform group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform">
                            <Play size={20} className="ml-1 fill-current" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pose Library */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Activity size={24} className="text-purple-400" />
                    Essential Poses
                  </h2>
                  <button className="text-sm font-bold text-purple-400 hover:text-purple-300 uppercase tracking-wider">View All</button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {poses.map((pose, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="w-full h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-4 flex items-center justify-center group-hover:from-purple-900/40 group-hover:to-rose-900/40 transition-colors">
                        <Flower2 size={32} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">{pose.name}</h4>
                      <p className="text-gray-500 text-xs">{pose.focus}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Right Column: Active Controls & Atmosphere */}
            <div className="flex flex-col gap-8">
              
              {/* Intention Banner */}
              <div className="p-8 rounded-[24px] bg-gradient-to-br from-rose-500/20 to-purple-600/20 border border-rose-500/30 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <Heart size={24} className="text-rose-400 mb-4" />
                <h3 className="text-rose-200 text-[11px] font-black uppercase tracking-widest mb-3">Daily Intention</h3>
                <p className="text-white text-xl font-medium italic leading-relaxed mb-6">
                  "Inhale the future, exhale the past."
                </p>
                <button className="w-full py-3 bg-white text-purple-900 font-bold rounded-xl shadow-lg hover:bg-rose-50 transition-colors text-sm uppercase tracking-wide">
                  Log Mood
                </button>
              </div>

              {/* Soundscapes */}
              <div className="bg-black/40 p-8 rounded-[24px] border border-white/10 backdrop-blur-xl flex-1">
                <h2 className="text-xl font-black text-white flex items-center gap-3 mb-6">
                  <Music size={20} className="text-purple-400" />
                  Atmosphere
                </h2>

                <div className="space-y-3">
                  {soundscapes.map((sound) => (
                    <button
                      key={sound.id}
                      onClick={() => toggleSound(sound.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        activeSound === sound.id 
                          ? 'bg-gradient-to-r from-purple-600/30 to-rose-600/30 border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                          : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${activeSound === sound.id ? 'bg-purple-500 text-white' : 'bg-black/40'}`}>
                          <sound.icon size={16} />
                        </div>
                        <span className="font-bold text-[13px] tracking-wide">{sound.name}</span>
                      </div>
                      {activeSound === sound.id && (
                        <div className="flex gap-1">
                          {[1, 2, 3].map((bar) => (
                            <div key={bar} className="w-1.5 h-4 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: `${bar * 150}ms` }} />
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Master Volume</div>
                    <Volume2 size={14} className="text-gray-400" />
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" defaultValue="50"
                    className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
