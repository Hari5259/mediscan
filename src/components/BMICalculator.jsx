import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft, Scale, Ruler, Activity, Info, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';

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
      setCategory('Normal');
      setColor('text-green-500');
    } else if (bmi >= 25 && bmi < 30) {
      setCategory('Overweight');
      setColor('text-orange-500');
    } else {
      setCategory('Obese');
      setColor('text-red-500');
    }
  };

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-12 mt-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-[42px] font-black tracking-tighter leading-tight">Metabolic Index</h1>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Body Mass & Vitality Analytics</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-[#008cff] hover:underline"
            >
              <ChevronLeft size={16} /> Return to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Input Side */}
            <div>
              <form onSubmit={calculateBMI} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Weight (KG)</label>
                  <div className="relative">
                    <Scale className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 70"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-16 pr-8 py-5 text-[24px] font-black outline-none focus:border-[#008cff] transition-all"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">Body Height (CM)</label>
                  <div className="relative">
                    <Ruler className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 175"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-16 pr-8 py-5 text-[24px] font-black outline-none focus:border-[#008cff] transition-all"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-search w-full py-5 !text-[20px]"
                >
                  CALCULATE INDEX
                </button>
              </form>
            </div>

            {/* Result Side */}
            <div className="bg-gray-50 rounded-[24px] p-12 flex flex-col items-center justify-center text-center border-2 border-gray-100">
              {!result ? (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-8">
                    <Activity size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-[20px] font-black text-gray-400 uppercase tracking-widest">Awaiting Biometrics</h3>
                  <p className="text-[14px] font-bold text-gray-300 mt-2">Ready to compute your health metrics.</p>
                </div>
              ) : (
                <div className="animate-slide-up w-full">
                  <p className="text-[14px] font-black text-gray-400 uppercase tracking-widest mb-4">Your Health Score</p>
                  
                  <div className={`text-[96px] font-black ${color} tracking-tighter leading-none mb-4 italic`}>
                    {result}
                  </div>

                  <div className={`text-[28px] font-black uppercase italic ${color} mb-12`}>
                    {category} Profile
                  </div>

                  <div className="w-full space-y-4">
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
                      <div className="h-full bg-amber-500" style={{ width: '18.5%' }}></div>
                      <div className="h-full bg-green-500" style={{ width: '6.5%' }}></div>
                      <div className="h-full bg-orange-500" style={{ width: '5%' }}></div>
                      <div className="h-full bg-red-500" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span>Under</span>
                      <span>Healthy</span>
                      <span>Over</span>
                      <span>Obese</span>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-white rounded-[16px] border border-gray-200 flex items-start gap-4 text-left shadow-sm">
                    <Info className="text-[#008cff] shrink-0" size={20} />
                    <p className="text-[13px] text-gray-600 font-bold leading-relaxed">
                      AI Note: BMI is an estimation tool. For a comprehensive profile, sync your biometric wearable or consult a specialist.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
