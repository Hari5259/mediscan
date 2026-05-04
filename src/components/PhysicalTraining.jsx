import React, { useState, useEffect } from 'react';
import { ChevronLeft, Dumbbell, Timer, Flame, Trophy, Play, Activity, Target, X, Pause, SkipForward, Heart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function PhysicalTraining() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);

  const stats = [
    { label: 'Weekly Goal', value: '4/5', unit: 'Days', icon: Target, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Calories Burned', value: '2,450', unit: 'kcal', icon: Flame, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Total Time', value: '180', unit: 'min', icon: Timer, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Current Streak', value: '4', unit: 'Days', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const weekDays = [
    { day: 'Mon', status: 'completed' },
    { day: 'Tue', status: 'completed' },
    { day: 'Wed', status: 'completed' },
    { day: 'Thu', status: 'completed' },
    { day: 'Fri', status: 'today' },
    { day: 'Sat', status: 'upcoming' },
    { day: 'Sun', status: 'upcoming' },
  ];

  const workouts = [
    {
      id: 1,
      title: 'HIIT Core Crusher',
      level: 'Advanced',
      duration: '20 Min',
      durationSec: 1200,
      calories: '300 kcal',
      category: 'cardio',
      image: 'bg-gradient-to-br from-orange-500 to-red-600',
      description: 'High-intensity interval training focusing on core strength and explosive movements.',
      currentMove: 'Mountain Climbers',
      nextMove: 'Plank Jacks'
    },
    {
      id: 2,
      title: 'Full Body Power',
      level: 'Intermediate',
      duration: '45 Min',
      durationSec: 2700,
      calories: '450 kcal',
      category: 'strength',
      image: 'bg-gradient-to-br from-gray-700 to-gray-900',
      description: 'Comprehensive strength training utilizing compound movements for maximum muscle engagement.',
      currentMove: 'Kettlebell Swings',
      nextMove: 'Goblet Squats'
    },
    {
      id: 3,
      title: 'Morning Mobility',
      level: 'Beginner',
      duration: '15 Min',
      durationSec: 900,
      calories: '100 kcal',
      category: 'flexibility',
      image: 'bg-gradient-to-br from-amber-400 to-orange-500',
      description: 'Gentle stretching and mobility exercises to start your day with energy.',
      currentMove: 'Cat-Cow Stretch',
      nextMove: 'Hip Rotations'
    },
    {
      id: 4,
      title: 'Endurance Builder',
      level: 'Intermediate',
      duration: '60 Min',
      durationSec: 3600,
      calories: '600 kcal',
      category: 'cardio',
      image: 'bg-gradient-to-br from-red-500 to-rose-700',
      description: 'Sustained cardiovascular workout designed to improve stamina and heart health.',
      currentMove: 'High Knees',
      nextMove: 'Burpees'
    }
  ];

  const filteredWorkouts = activeTab === 'all' ? workouts : workouts.filter(w => w.category === activeTab);

  // Timer logic for active workout
  useEffect(() => {
    let timer;
    if (activeWorkout && isPlaying) {
      timer = setInterval(() => {
        setWorkoutTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeWorkout, isPlaying]);

  const startWorkout = (workout) => {
    setActiveWorkout(workout);
    setIsPlaying(true);
    setWorkoutTime(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ACTIVE WORKOUT PLAYER UI
  if (activeWorkout) {
    const progressPercent = Math.min(100, (workoutTime / activeWorkout.durationSec) * 100);
    
    return (
      <div className="bg-gray-950 min-h-screen flex flex-col relative overflow-hidden">
        {/* Immersive background */}
        <div className={`absolute inset-0 ${activeWorkout.image} opacity-20 transition-all duration-[3000ms] ${isPlaying ? 'scale-110' : 'scale-100'}`} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Header */}
        <div className="relative z-10 p-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
          <button 
            onClick={() => setActiveWorkout(null)}
            className="flex items-center gap-2 text-white/70 hover:text-white px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md transition-all font-bold text-sm"
          >
            <ChevronLeft size={18} /> End Workout
          </button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-red-400 font-bold bg-black/40 px-4 py-2 rounded-full border border-red-500/20">
              <Heart size={16} className={isPlaying ? 'animate-pulse' : ''} />
              <span>142 BPM</span>
            </div>
            <div className="flex items-center gap-2 text-orange-400 font-bold bg-black/40 px-4 py-2 rounded-full border border-orange-500/20">
              <Flame size={16} />
              <span>{Math.floor(workoutTime * 0.15)} kcal</span>
            </div>
          </div>
        </div>

        {/* Main Player Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 mb-4 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white/80 border border-white/20">
              {activeWorkout.title}
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight mb-4 drop-shadow-2xl">
              {activeWorkout.currentMove}
            </h1>
            <p className="text-gray-400 text-xl font-medium">
              Next: <span className="text-white font-bold">{activeWorkout.nextMove}</span>
            </p>
          </div>

          {/* Huge Timer */}
          <div className="relative mb-16 group">
            {/* Outer Progress Ring Simulation */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90 scale-[1.3] pointer-events-none opacity-20">
               <circle cx="50%" cy="50%" r="48%" fill="none" stroke="white" strokeWidth="2" />
               <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="4" className="text-orange-500" strokeDasharray="300" strokeDashoffset={300 - (300 * progressPercent / 100)} />
            </svg>

            <div className="text-white text-8xl md:text-[140px] font-black tabular-nums tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              {formatTime(workoutTime)}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => { setWorkoutTime(0); setIsPlaying(true); }}
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <X size={24} />
            </button>
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={36} className="fill-current" /> : <Play size={36} className="fill-current ml-2" />}
            </button>

            <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              <SkipForward size={24} />
            </button>
          </div>

        </div>

        {/* Bottom Progress Bar */}
        <div className="relative z-10 w-full h-2 bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD UI
  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-6 md:p-12 mt-4 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                  <Dumbbell size={28} className="text-white" />
                </div>
                <h1 className="text-[36px] md:text-[42px] font-black tracking-tighter leading-tight text-white">Physical Command</h1>
              </div>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest ml-1">Elite Strength & Conditioning</p>
            </div>
            <button
              onClick={() => navigate('/exercise')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-orange-400 hover:text-white bg-white/5 hover:bg-orange-500/40 px-6 py-3 rounded-full transition-all border border-white/10 self-start md:self-center"
            >
              <ChevronLeft size={16} /> Hub
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10">
            {/* Left Column: Stats & Weekly Plan */}
            <div className="xl:col-span-1 flex flex-col gap-8">
              
              {/* Vertical Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/5 rounded-[20px] p-5 backdrop-blur-md flex flex-col justify-between hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon size={20} />
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white mb-0.5 tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Weekly Tracker */}
              <div className="bg-black/40 border border-white/5 rounded-[24px] p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar size={20} className="text-orange-400" />
                  <h3 className="text-white font-black text-lg">Weekly Routine</h3>
                </div>
                <div className="flex justify-between items-center">
                  {weekDays.map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="text-[10px] font-bold text-gray-500 uppercase">{d.day}</div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        d.status === 'completed' ? 'bg-orange-500 border-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]' :
                        d.status === 'today' ? 'bg-transparent border-orange-400 border-dashed text-orange-400' :
                        'bg-white/5 border-transparent text-transparent'
                      }`}>
                        {d.status === 'completed' && <Activity size={14} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge Banner */}
              <div className="rounded-[24px] bg-gradient-to-br from-orange-600 to-red-700 p-8 relative overflow-hidden flex flex-col justify-center shadow-xl group">
                <div className="absolute right-0 top-0 w-48 h-48 bg-white/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <span className="px-3 py-1 bg-black/30 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-4 inline-block backdrop-blur-md border border-white/10">
                    Daily Challenge
                  </span>
                  <h2 className="text-2xl font-black text-white tracking-tight mb-2">100 Push-up Protocol</h2>
                  <p className="text-white/80 font-medium text-sm mb-6">Earn the Iron Badge today.</p>
                  <button className="w-full py-3.5 bg-white text-red-600 font-black uppercase tracking-widest text-xs rounded-xl shadow-lg hover:bg-black hover:text-white transition-colors">
                    Accept & Begin
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Workouts */}
            <div className="xl:col-span-2">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Activity size={24} className="text-orange-500" />
                  Training Programs
                </h2>
                
                {/* Custom Tab Selector */}
                <div className="flex bg-black/40 p-1.5 rounded-full border border-white/5 backdrop-blur-sm w-full sm:w-auto overflow-x-auto">
                  {['all', 'strength', 'cardio', 'flexibility'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === tab 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredWorkouts.map((workout) => (
                  <div 
                    key={workout.id} 
                    onClick={() => startWorkout(workout)}
                    className="group cursor-pointer rounded-[24px] overflow-hidden bg-black/40 border border-white/10 hover:border-orange-500/50 transition-all duration-300 relative shadow-xl flex flex-col h-full"
                  >
                    <div className={`absolute inset-0 ${workout.image} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                    
                    <div className="relative p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                          {workout.level}
                        </span>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-xl group-hover:scale-110 transition-transform group-hover:bg-orange-500 group-hover:text-white">
                          <Play size={16} className="ml-0.5" />
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <h3 className="text-2xl font-black text-white mb-2 group-hover:text-orange-300 transition-colors">{workout.title}</h3>
                        <p className="text-sm text-gray-300/80 font-medium leading-relaxed mb-6 line-clamp-2">
                          {workout.description}
                        </p>
                        
                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                          <div className="flex items-center gap-1.5 text-white font-bold text-xs bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                            <Timer size={14} className="text-orange-400" /> {workout.duration}
                          </div>
                          <div className="flex items-center gap-1.5 text-white font-bold text-xs bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                            <Flame size={14} className="text-red-400" /> {workout.calories}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
