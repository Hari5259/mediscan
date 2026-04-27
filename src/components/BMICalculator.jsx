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
      setColor('text-amber-500');
    } else if (bmi >= 18.5 && bmi < 25) {
      setCategory('Normal Weight');
      setColor('text-emerald-500');
    } else if (bmi >= 25 && bmi < 30) {
      setCategory('Overweight');
      setColor('text-orange-500');
    } else {
      setCategory('Obese');
      setColor('text-rose-500');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:scale-110 transition-transform text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center group">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              BMI <span className="text-blue-600">Calculator</span>
            </h1>
          </div>
          <div className="w-12 h-12"></div> {/* Spacer for symmetry */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Card */}
          <div className="glass-card rounded-[2.5rem] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600">
                <Activity size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Enter Metrics</h2>
            </div>

            <form onSubmit={calculateBMI} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Weight (kg)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Scale size={20} />
                  </div>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 70"
                    className="input-field pl-12"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Height (cm)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Ruler size={20} />
                  </div>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 175"
                    className="input-field pl-12"
                    required
                    min="1"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full h-[56px] text-lg flex items-center justify-center gap-2 mt-4"
              >
                <span>Calculate Now</span>
                <Heart size={20} fill="currentColor" />
              </button>
            </form>
          </div>

          {/* Result Card */}
          <div className="glass-card rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {!result ? (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto text-slate-400">
                  <Info size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready to calculate?</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Enter your height and weight to see your Body Mass Index and health category.
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-in zoom-in duration-500">
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Your Results</p>
                
                <div className="relative inline-block">
                  <div className={`text-6xl font-black ${color} transition-colors`}>
                    {result}
                  </div>
                  <div className="absolute -bottom-2 right-[-20px] bg-white dark:bg-slate-800 shadow-lg px-2 py-1 rounded-md text-[10px] font-black text-slate-400">BMI</div>
                </div>

                <div className={`text-2xl font-extrabold ${color} transition-colors`}>
                  {category}
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden mt-8 flex">
                   <div className="h-full bg-amber-500" style={{ width: '18.5%' }}></div>
                   <div className="h-full bg-emerald-500" style={{ width: '6.5%' }}></div>
                   <div className="h-full bg-orange-500" style={{ width: '5%' }}></div>
                   <div className="h-full bg-rose-500" style={{ width: '70%' }}></div>
                </div>
                
                <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
                  <span>Under</span>
                  <span>Normal</span>
                  <span>Over</span>
                  <span>Obese</span>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 text-left">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                    <AlertCircle size={20} />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Note: BMI is a useful measure of overweight and obesity, but it's not a direct measure of body fat.
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
