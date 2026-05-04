import React, { useState, useEffect } from 'react';
import { ChevronLeft, Wind, Play, Square, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function BreathingExercise() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('IDLE'); // IDLE, INHALE, HOLD, EXHALE
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  // 4-7-8 Breathing Technique
  const phases = {
    INHALE: { duration: 4, next: 'HOLD', text: 'Breathe In', scale: 'scale-150', color: 'from-cyan-400 to-blue-500' },
    HOLD: { duration: 7, next: 'EXHALE', text: 'Hold', scale: 'scale-150', color: 'from-blue-400 to-indigo-500' },
    EXHALE: { duration: 8, next: 'INHALE', text: 'Breathe Out', scale: 'scale-100', color: 'from-indigo-400 to-cyan-500' }
  };

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const nextPhase = phases[phase].next;
      setPhase(nextPhase);
      setTimeLeft(phases[nextPhase].duration);
      if (nextPhase === 'INHALE') {
        setCycleCount(prev => prev + 1);
      }
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft, phase, phases]);

  const toggleSession = () => {
    if (isActive) {
      setIsActive(false);
      setPhase('IDLE');
      setTimeLeft(0);
    } else {
      setIsActive(true);
      setPhase('INHALE');
      setTimeLeft(phases.INHALE.duration);
      setCycleCount(1);
    }
  };

  const currentPhaseConfig = isActive ? phases[phase] : { text: 'Ready to Start', scale: 'scale-100', color: 'from-gray-700 to-gray-600' };

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-12 mt-4 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-all duration-[4000ms] ease-in-out bg-gradient-to-r ${currentPhaseConfig.color} ${isActive ? currentPhaseConfig.scale : 'scale-50'}`} />

          <div className="relative z-10 flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Wind size={24} className="text-cyan-500" />
                </div>
                <h1 className="text-[42px] font-black tracking-tighter leading-tight text-white">Breathing Flow</h1>
              </div>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">4-7-8 Relaxation Technique</p>
            </div>
            <button
              onClick={() => navigate('/exercise')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-[#008cff] hover:underline bg-[#008cff]/10 px-4 py-2 rounded-full"
            >
              <ChevronLeft size={16} /> Back to Hub
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            {/* Breathing Circle */}
            <div className="relative w-80 h-80 flex items-center justify-center mb-16">
              {/* Outer rings */}
              <div className={`absolute inset-0 rounded-full border border-cyan-500/20 transition-all duration-[4000ms] ease-in-out ${isActive ? (phase === 'EXHALE' ? 'scale-100' : 'scale-150') : 'scale-100'}`} />
              <div className={`absolute inset-4 rounded-full border border-cyan-400/30 transition-all duration-[4000ms] ease-in-out ${isActive ? (phase === 'EXHALE' ? 'scale-100' : 'scale-125') : 'scale-100'}`} />
              
              {/* Main glowing circle */}
              <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br ${currentPhaseConfig.color} shadow-2xl flex items-center justify-center transition-all duration-[4000ms] ease-in-out transform ${isActive ? currentPhaseConfig.scale : 'scale-100'}`}>
                <div className="absolute inset-0 rounded-full bg-white/10 mix-blend-overlay backdrop-blur-sm" />
                <div className="text-center z-10">
                  <h2 className="text-white text-2xl font-black tracking-widest uppercase mb-1 drop-shadow-md">
                    {currentPhaseConfig.text}
                  </h2>
                  {isActive && (
                    <div className="text-white/90 text-6xl font-light tabular-nums drop-shadow-lg">
                      {timeLeft}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-8 relative z-10">
              <button
                onClick={toggleSession}
                className={`flex items-center gap-3 px-10 py-5 rounded-full font-black text-[16px] tracking-wider uppercase transition-all duration-300 shadow-xl ${
                  isActive 
                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 hover:shadow-cyan-500/25'
                }`}
              >
                {isActive ? (
                  <>
                    <Square size={20} className="fill-current" /> Stop Session
                  </>
                ) : (
                  <>
                    <Play size={20} className="fill-current" /> Begin Exercise
                  </>
                )}
              </button>

              {/* Stats */}
              <div className="flex gap-12 text-center opacity-80 mt-4 bg-black/20 px-8 py-4 rounded-2xl border border-white/5">
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Cycles Completed</div>
                  <div className="text-2xl font-black text-white">{cycleCount}</div>
                </div>
                <div className="w-[1px] bg-white/10"></div>
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Technique</div>
                  <div className="text-xl font-bold text-cyan-400 mt-1">4-7-8</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Instructions Sheet */}
          <div className="mt-8 p-8 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md relative z-10">
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <Activity size={20} className="text-cyan-400" /> How it works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                <div className="text-cyan-400 font-black text-xl mb-2">1. Inhale (4s)</div>
                <p className="text-gray-400 text-sm leading-relaxed">Breathe in quietly through your nose for 4 seconds, filling your lungs completely.</p>
              </div>
              <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                <div className="text-blue-400 font-black text-xl mb-2">2. Hold (7s)</div>
                <p className="text-gray-400 text-sm leading-relaxed">Hold your breath for 7 seconds. This allows oxygen to fully circulate your bloodstream.</p>
              </div>
              <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                <div className="text-indigo-400 font-black text-xl mb-2">3. Exhale (8s)</div>
                <p className="text-gray-400 text-sm leading-relaxed">Exhale completely through your mouth, making a whoosh sound, for 8 full seconds.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
