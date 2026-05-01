import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, MessageCircle, Camera, FileText, AlertCircle, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'symptom-checker',
      title: 'Symptom Checker',
      description: 'Analyze your symptoms with advanced AI diagnostics.',
      icon: Activity,
      color: '#0071E3',
      path: '/symptom-checker'
    },
    {
      id: 'chatbot',
      title: 'Health Assistant',
      description: 'Chat with our AI for instant medical guidance.',
      icon: MessageCircle,
      color: '#34C759',
      path: '/chatbot'
    },
    {
      id: 'medicine-scanner',
      title: 'Medicine Scanner',
      description: 'Identify medications and view dosage info instantly.',
      icon: Camera,
      color: '#AF52DE',
      path: '/medicine-scanner'
    },
    {
      id: 'health-report',
      title: 'Health Reports',
      description: 'Access and manage your digital medical records.',
      icon: FileText,
      color: '#FF9500',
      path: '/health-reports'
    },
    {
      id: 'emergency',
      title: 'Emergency',
      description: 'Quick access to emergency contacts and first aid.',
      icon: AlertCircle,
      color: '#FF3B30',
      path: '/emergency'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      
      <main className="max-w-[1200px] mx-auto px-6 py-12 animate-fade-in">
        <header className="mb-12 text-center">
          <h1 className="apple-heading mb-3">Welcome, Alex</h1>
          <p className="apple-subheading">Your health, refined and simplified.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => navigate(module.path)}
              className="apple-card p-8 cursor-pointer group flex flex-col justify-between h-[240px]"
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${module.color}10`, color: module.color }}
                >
                  <module.icon size={26} />
                </div>
                <h3 className="text-[21px] font-semibold mb-2">{module.title}</h3>
                <p className="text-[15px] text-[#86868B] leading-relaxed">
                  {module.description}
                </p>
              </div>
              
              <div className="flex items-center text-[#0071E3] font-medium text-[15px] opacity-0 group-hover:opacity-100 transition-opacity">
                Get Started <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <div className="apple-card p-8 bg-gradient-to-br from-white to-[#F2F2F7]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-[24px] font-semibold mb-4">Complete Your Profile</h2>
                <p className="text-[#86868B] mb-6">
                  Fill in your medical history to get more personalized insights and accurate AI diagnostics.
                </p>
                <button className="apple-button apple-button-primary">
                  Update Now
                </button>
              </div>
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-[#0071E3]/5 rounded-full animate-pulse" />
                <div className="absolute inset-4 bg-[#0071E3]/10 rounded-full" />
                <div className="absolute inset-8 bg-[#0071E3]/20 rounded-full flex items-center justify-center">
                  <Activity size={48} className="text-[#0071E3]" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
