import React, { useState } from 'react';
import { ChevronLeft, Dumbbell, Timer, Flame, Trophy, Play, Activity, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function PhysicalTraining() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const stats = [
    { label: 'Weekly Goal', value: '4/5', unit: 'Days', icon: Target, color: 'text-orange-500' },
    { label: 'Calories Burned', value: '2,450', unit: 'kcal', icon: Flame, color: 'text-red-500' },
    { label: 'Total Time', value: '180', unit: 'min', icon: Timer, color: 'text-yellow-500' },
    { label: 'Current Streak', value: '4', unit: 'Days', icon: Trophy, color: 'text-amber-500' },
  ];

  const workouts = [
    {
      id: 1,
      title: 'HIIT Core Crusher',
      level: 'Advanced',
      duration: '20 Min',
      calories: '300 kcal',
      category: 'cardio',
      image: 'bg-gradient-to-br from-orange-400 to-red-500',
      description: 'High-intensity interval training focusing on core strength and explosive movements.'
    },
    {
      id: 2,
      title: 'Full Body Power',
      level: 'Intermediate',
      duration: '45 Min',
      calories: '450 kcal',
      category: 'strength',
      image: 'bg-gradient-to-br from-slate-700 to-slate-900',
      description: 'Comprehensive strength training utilizing compound movements for maximum muscle engagement.'
    },
    {
      id: 3,
      title: 'Morning Mobility',
      level: 'Beginner',
      duration: '15 Min',
      calories: '100 kcal',
      category: 'flexibility',
      image: 'bg-gradient-to-br from-amber-400 to-orange-500',
      description: 'Gentle stretching and mobility exercises to start your day with energy.'
    },
    {
      id: 4,
      title: 'Endurance Builder',
      level: 'Intermediate',
      duration: '60 Min',
      calories: '600 kcal',
      category: 'cardio',
      image: 'bg-gradient-to-br from-red-500 to-rose-600',
      description: 'Sustained cardiovascular workout designed to improve stamina and heart health.'
    }
  ];

  const filteredWorkouts = activeTab === 'all' ? workouts : workouts.filter(w => w.category === activeTab);

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-12 mt-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,146,60,0.5)]">
                  <Dumbbell size={24} className="text-orange-500" />
                </div>
                <h1 className="text-[42px] font-black tracking-tighter leading-tight text-white">Physical Command</h1>
              </div>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Elite Strength & Conditioning</p>
            </div>
            <button
              onClick={() => navigate('/exercise')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-orange-500 hover:text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 px-4 py-2 rounded-full transition-colors border border-orange-500/20"
            >
              <ChevronLeft size={16} /> Back to Hub
            </button>
          </div>

          {/* User Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-orange-500/30 transition-colors">
                <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`} />
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-black/30 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-1 tracking-tight">
                    {stat.value} <span className="text-sm text-gray-400 font-bold ml-1">{stat.unit}</span>
                  </div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Workout Selection */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <Activity size={24} className="text-orange-500" />
              Training Programs
            </h2>
            <div className="flex bg-black/40 p-1 rounded-full border border-white/5 backdrop-blur-sm">
              {['all', 'strength', 'cardio', 'flexibility'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab 
                      ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(251,146,60,0.4)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Workout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredWorkouts.map((workout) => (
              <div key={workout.id} className="group relative rounded-[24px] overflow-hidden bg-black/20 border border-white/10 hover:border-orange-500/50 transition-all duration-300">
                <div className={`absolute top-0 left-0 w-full h-32 ${workout.image} opacity-80 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative p-8 pt-10">
                  <div className="flex justify-between items-start mb-16">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                      {workout.level}
                    </span>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 transition-transform group-hover:bg-orange-500 group-hover:text-white">
                      <Play size={20} className="ml-1" />
                    </button>
                  </div>
                  
                  <div className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/5 group-hover:bg-black/80 transition-colors">
                    <h3 className="text-2xl font-black text-white mb-2">{workout.title}</h3>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">
                      {workout.description}
                    </p>
                    
                    <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-gray-300 font-bold text-sm">
                        <Timer size={16} className="text-orange-400" /> {workout.duration}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 font-bold text-sm">
                        <Flame size={16} className="text-red-400" /> {workout.calories}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Challenge Banner */}
          <div className="mt-12 rounded-[24px] bg-gradient-to-r from-orange-600 to-red-600 p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_10px_40px_rgba(234,88,12,0.3)]">
            <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
            
            <div className="relative z-10">
              <span className="px-3 py-1 bg-black/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-4 inline-block backdrop-blur-md">
                Daily Challenge
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight mb-2">100 Push-up Challenge</h2>
              <p className="text-white/80 font-medium">Push your limits today and earn the iron badge.</p>
            </div>
            
            <button className="relative z-10 px-8 py-4 bg-white text-orange-600 font-black uppercase tracking-wider text-sm rounded-full shadow-xl hover:bg-black hover:text-white transition-colors">
              Accept Challenge
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
