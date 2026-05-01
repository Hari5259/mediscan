import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft, Scale, Ruler, Activity, Info, AlertCircle, MessageCircle, Camera, FileText, Users } from 'lucide-react';
import Navbar from './Navbar';

export default function BMICalculator() {
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
    { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
    { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
    { id: 'bmi-calculator', label: 'BMI Index', icon: Scale, path: '/bmi-calculator' },
    { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
    { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
  ];

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
        <div className="module-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`module-tab-item ${tab.id === 'bmi-calculator' ? 'active' : ''}`}
            >
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="main-floating-card p-12 mt-4">
          <div className="mb-12 border-b border-gray-100 pb-10">
            <h1 className="text-[42px] font-black tracking-tighter leading-tight italic uppercase">Metabolic <span className="text-[#008cff]">Index</span></h1>
            <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Body Mass & Vitality Analytics Core</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Input Side */}
            <div className="space-y-10">
              <div className="radio-group">
                <label className="radio-item">
                  <input type="radio" name="gender" defaultChecked />
                  <span>Male Protocol</span>
                </label>
                <label className="radio-item">
                  <input type="radio" name="gender" />
                  <span>Female Protocol</span>
                </label>
              </div>

              <form onSubmit={calculateBMI} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Weight (KG)</label>
                  <div className="relative">
                    <Scale className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 70"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-16 pr-8 py-5 text-[24px] font-black outline-none focus:border-[#008cff] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Body Height (CM)</label>
                  <div className="relative">
                    <Ruler className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 175"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-16 pr-8 py-5 text-[24px] font-black outline-none focus:border-[#008cff] transition-all"
                      required
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
            <div className="bg-gray-50 rounded-[32px] p-12 flex flex-col items-center justify-center text-center border-2 border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Activity size={180} />
              </div>
              
              {!result ? (
                <div className="animate-pulse flex flex-col items-center relative z-10">
                  <div className="w-24 h-24 bg-white rounded-[24px] shadow-lg flex items-center justify-center mb-8 text-gray-300">
                    <Activity size={40} />
                  </div>
                  <h3 className="text-[20px] font-black text-gray-400 uppercase tracking-widest">Awaiting Biometrics</h3>
                  <p className="text-[12px] font-bold text-gray-300 mt-2 uppercase tracking-widest">Ready to compute metabolic vectors</p>
                </div>
              ) : (
                <div className="animate-slide-up w-full relative z-10">
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-4">Calculated Health Score</p>
                  
                  <div className={`text-[100px] font-black ${color} tracking-tighter leading-none mb-4 italic`}>
                    {result}
                  </div>

                  <div className={`text-[28px] font-black uppercase italic ${color} mb-12 tracking-tight`}>
                    {category} Profile
                  </div>

                  <div className="w-full space-y-6">
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                      <div className="h-full bg-amber-500" style={{ width: '18.5%' }}></div>
                      <div className="h-full bg-green-500" style={{ width: '6.5%' }}></div>
                      <div className="h-full bg-orange-500" style={{ width: '5%' }}></div>
                      <div className="h-full bg-red-500" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <span>Under</span>
                      <span>Healthy</span>
                      <span>Over</span>
                      <span>Obese</span>
                    </div>
                  </div>

                  <div className="mt-12 p-8 bg-white rounded-[24px] border-2 border-gray-100 flex items-start gap-5 text-left shadow-sm">
                    <div className="p-2 bg-blue-50 text-[#008cff] rounded-lg">
                      <Info size={24} />
                    </div>
                    <p className="text-[14px] text-gray-600 font-bold leading-relaxed italic">
                      "SYSTEM NOTE: BMI is a clinical estimation. For a high-fidelity profile, sync your wearable biometric device or consult a specialist."
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
