import React from 'react';
import { Dumbbell, Wind, Heart, ChevronLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function ExerciseModule() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: 'Enhance lung capacity and reduce stress with guided breathing techniques.',
      icon: Wind,
      color: 'bg-cyan-100',
      textColor: 'text-cyan-600',
      gradient: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 'physical',
      title: 'Physical Training',
      description: 'Structured workout routines to build strength, endurance, and flexibility.',
      icon: Dumbbell,
      color: 'bg-orange-100',
      textColor: 'text-orange-600',
      gradient: 'from-orange-400 to-orange-600'
    },
    {
      id: 'yoga',
      title: 'Yoga & Meditation',
      description: 'Connect mind and body through traditional poses and mindfulness practices.',
      icon: Heart,
      color: 'bg-rose-100',
      textColor: 'text-rose-600',
      gradient: 'from-rose-400 to-rose-600'
    }
  ];

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-12 mt-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Dumbbell size={24} className="text-green-500" />
                </div>
                <h1 className="text-[42px] font-black tracking-tighter leading-tight">Wellness & Activity</h1>
              </div>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Classify and start your exercise routine</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-[#008cff] hover:underline"
            >
              <ChevronLeft size={16} /> Return to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id} 
                onClick={() => {
                  if (category.id === 'breathing') navigate('/breathing');
                  if (category.id === 'physical') navigate('/physical');
                }}
                className="bg-white border border-gray-100 rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className={`h-32 bg-gradient-to-r ${category.gradient} relative p-6 flex flex-col justify-between`}>
                  <div className="flex justify-between items-start">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                      Select Module
                    </span>
                  </div>
                  <h3 className="text-white font-extrabold text-[22px] leading-tight">{category.title}</h3>
                </div>
                
                <div className="p-8 flex flex-col items-center text-center">
                  <div className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <category.icon size={40} className={category.textColor} />
                  </div>
                  
                  <p className="text-gray-500 text-[14px] font-medium leading-relaxed mb-8">
                    {category.description}
                  </p>
                  
                  <button className="w-full py-3 rounded-[8px] bg-gray-50 text-gray-900 font-bold text-[14px] flex items-center justify-center gap-2 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    Start {category.title.split(' ')[0]} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
