import React, { useState } from 'react';
import { ChevronLeft, Heart, Play, Flower2, Music, Sun, Moon, Volume2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function YogaMeditation() {
  const navigate = useNavigate();
  const [activeSound, setActiveSound] = useState(null);

  const programs = [
    {
      id: 1,
      title: 'Sunrise Vinyasa',
      duration: '20 Min',
      level: 'All Levels',
      focus: 'Energy & Flexibility',
      icon: Sun,
      bg: 'from-amber-400 to-rose-400'
    },
    {
      id: 2,
      title: 'Deep Rest Yin',
      duration: '45 Min',
      level: 'Beginner',
      focus: 'Relaxation & Recovery',
      icon: Moon,
      bg: 'from-indigo-400 to-purple-500'
    },
    {
      id: 3,
      title: 'Chakra Alignment',
      duration: '30 Min',
      level: 'Intermediate',
      focus: 'Balance & Mind',
      icon: Sparkles,
      bg: 'from-emerald-400 to-teal-500'
    }
  ];

  const soundscapes = [
    { id: 'rain', name: 'Gentle Rain', icon: Volume2 },
    { id: 'forest', name: 'Deep Forest', icon: Volume2 },
    { id: 'ocean', name: 'Ocean Waves', icon: Volume2 },
    { id: 'bowls', name: 'Singing Bowls', icon: Music },
  ];

  const toggleSound = (id) => {
    setActiveSound(activeSound === id ? null : id);
  };

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-12 mt-4 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 mb-12 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                  <Flower2 size={24} className="text-rose-500" />
                </div>
                <h1 className="text-[42px] font-black tracking-tighter leading-tight text-white">Mind & Body</h1>
              </div>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Yoga & Guided Meditation</p>
            </div>
            <button
              onClick={() => navigate('/exercise')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 rounded-full transition-colors border border-rose-500/20"
            >
              <ChevronLeft size={16} /> Back to Hub
            </button>
          </div>

          {/* Daily Quote / Intention */}
          <div className="relative z-10 mb-12 p-8 rounded-[24px] bg-gradient-to-r from-rose-900/40 to-purple-900/40 border border-white/5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              <div className="mt-1">
                <Heart size={28} className="text-rose-400 fill-rose-400/20" />
              </div>
              <div>
                <h3 className="text-rose-300 text-[12px] font-black uppercase tracking-widest mb-2">Today's Intention</h3>
                <p className="text-white text-xl md:text-2xl font-medium italic leading-relaxed">
                  "Peace comes from within. Do not seek it without."
                </p>
              </div>
            </div>
            <button className="shrink-0 px-8 py-3 bg-white text-rose-600 font-bold rounded-full shadow-lg hover:shadow-rose-500/25 transition-all hover:scale-105">
              Set Intention
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {/* Left Column: Programs */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
                <Sparkles size={24} className="text-rose-400" />
                Guided Journeys
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program) => (
                  <div key={program.id} className="group cursor-pointer rounded-[20px] overflow-hidden bg-black/20 border border-white/10 hover:border-rose-500/30 transition-all duration-300 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.bg} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className="relative p-6">
                      <div className="flex justify-between items-start mb-8">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                          <program.icon size={24} className="text-white" />
                        </div>
                        <span className="px-3 py-1 bg-black/40 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                          {program.level}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-black text-white mb-1">{program.title}</h3>
                      <p className="text-gray-400 text-sm font-medium mb-6">{program.focus}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-rose-300 font-bold text-sm tracking-wider">{program.duration}</span>
                        <div className="w-10 h-10 rounded-full bg-white text-rose-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                          <Play size={16} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Create Custom Routine Card */}
                <div className="rounded-[20px] overflow-hidden bg-white/5 border border-white/10 border-dashed hover:border-rose-500/50 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Heart size={28} className="text-rose-400" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">Custom Flow</h3>
                  <p className="text-gray-400 text-sm">Build your own sequence of poses.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Ambient Soundscapes */}
            <div className="bg-black/30 p-8 rounded-[24px] border border-white/10 backdrop-blur-xl flex flex-col">
              <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-2">
                <Music size={24} className="text-purple-400" />
                Soundscapes
              </h2>
              <p className="text-gray-400 text-sm font-medium mb-8">
                Enhance your practice with immersive ambient audio.
              </p>

              <div className="space-y-4 flex-1">
                {soundscapes.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => toggleSound(sound.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      activeSound === sound.id 
                        ? 'bg-purple-500/20 border-purple-500/50 text-white' 
                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${activeSound === sound.id ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-black/20'}`}>
                        <sound.icon size={16} />
                      </div>
                      <span className="font-bold text-sm tracking-wide">{sound.name}</span>
                    </div>
                    {activeSound === sound.id && (
                      <div className="flex gap-1">
                        {[1, 2, 3].map((bar) => (
                          <div key={bar} className="w-1 h-4 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: `${bar * 150}ms` }} />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Volume Mix</div>
                <input 
                  type="range" 
                  min="0" max="100" defaultValue="50"
                  className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
