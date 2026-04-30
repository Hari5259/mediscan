import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Scale, Ruler, Activity, Info, AlertCircle } from 'lucide-react';

export default function BMICalculator() {
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height) return;

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setResult(bmi);

    if (bmi < 18.5) {
      setCategory('Underweight');
      setColor('text-amber-400');
    } else if (bmi >= 18.5 && bmi < 25) {
      setCategory('Normal Weight');
      setColor('text-cyan-400');
    } else if (bmi >= 25 && bmi < 30) {
      setCategory('Overweight');
      setColor('text-orange-400');
    } else {
      setCategory('Obese');
      setColor('text-rose-400');
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 px-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 text-cyan-400 shadow-2xl"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center group">
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">
              Metabolic <span className="text-cyan-400">Scanner</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Diagnostic Node active</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 text-slate-700">
             <Activity size={24} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Card - High Tech Terminal */}
          <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
            {/* Background HUD Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4 mb-12">
              <div className="w-1.5 h-10 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Biometric Entry</h2>
            </div>

            <form onSubmit={calculateBMI} className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Current Weight (KG)</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-700 group-focus-within/input:text-cyan-400 transition-colors">
                    <Scale size={20} />
                  </div>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="00.0"
                    className="w-full pl-16 pr-8 py-5 bg-black/40 border border-white/5 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/30 transition-all font-black text-xl tracking-tighter text-white outline-none placeholder:text-slate-900"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Current Stature (CM)</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-700 group-focus-within/input:text-cyan-400 transition-colors">
                    <Ruler size={20} />
                  </div>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="000"
                    className="w-full pl-16 pr-8 py-5 bg-black/40 border border-white/5 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/30 transition-all font-black text-xl tracking-tighter text-white outline-none placeholder:text-slate-900"
                    required
                    min="1"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-95 flex items-center justify-center gap-3 mt-6"
              >
                <span>Execute Diagnostic</span>
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
              </button>
            </form>
          </div>

          {/* Result Card - HUD Display */}
          <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
            {/* Background scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent animate-scan pointer-events-none"></div>

            {!result ? (
              <div className="space-y-8 animate-in fade-in duration-1000 relative z-10">
                <div className="w-24 h-24 bg-white/5 border border-white/5 rounded-[2rem] flex items-center justify-center mx-auto text-slate-800 shadow-2xl">
                  <Info size={40} className="animate-pulse" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Standby Mode</h3>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                    Input biometric parameters to initialize <br/> neural health computation.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-10 animate-in zoom-in duration-700 relative z-10 w-full">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Index Result</p>
                
                <div className="relative inline-block">
                  <div className={`text-8xl font-black ${color} tracking-tighter italic transition-all duration-1000 drop-shadow-[0_0_30px_rgba(6,182,212,0.1)]`}>
                    {result}
                  </div>
                  <div className="absolute -bottom-4 right-[-30px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl px-3 py-1 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest">Score</div>
                </div>

                <div className={`text-3xl font-black uppercase italic tracking-tighter ${color} transition-all duration-1000`}>
                  {category}
                </div>

                <div className="w-full space-y-4 mt-4">
                  <div className="w-full bg-white/5 border border-white/5 h-3 rounded-full overflow-hidden flex shadow-inner">
                     <div className="h-full bg-amber-500/50 shadow-[0_0_10px_#f59e0b]" style={{ width: '18.5%' }}></div>
                     <div className="h-full bg-cyan-400/50 shadow-[0_0_10px_#22d3ee]" style={{ width: '6.5%' }}></div>
                     <div className="h-full bg-orange-400/50 shadow-[0_0_10px_#fb923c]" style={{ width: '5%' }}></div>
                     <div className="h-full bg-rose-500/50 shadow-[0_0_10px_#f43f5e]" style={{ width: '70%' }}></div>
                  </div>
                  <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-widest px-1">
                    <span>Low</span>
                    <span>Optimum</span>
                    <span>Elevated</span>
                    <span>Critical</span>
                  </div>
                </div>
                
                <div className="mt-6 p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-start gap-4 text-left group hover:bg-white/[0.04] transition-all">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-cyan-400 border border-white/10 shrink-0">
                    <AlertCircle size={18} />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-black uppercase tracking-widest">
                    AI Disclaimer: This index is a mathematical proxy for health and does not constitute a definitive medical diagnostic.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
