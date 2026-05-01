import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  Bell, 
  Settings, 
  Search, 
  Filter, 
  ChevronRight, 
  Activity,
  Stethoscope, 
  Clock, 
  ShieldCheck,
  ChevronLeft,
  Briefcase,
  Heart,
  Plane,
  User,
  Zap,
  Star
} from 'lucide-react';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    const doctorData = sessionStorage.getItem('doctorLogged');
    if (!doctorData) {
      navigate('/doctor-login');
      return;
    }
    setDoctorInfo(JSON.parse(doctorData));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('doctorLogged');
    navigate('/doctor-login');
  };

  if (!doctorInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Patient Nodes', value: '24', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Urgent Cases', value: '12', icon: Activity, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Digital Records', value: '156', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Global Rank', value: 'Top 1%', icon: Star, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="bg-immersive min-h-screen pb-24">
      {/* Doctor Specific Nav */}
      <nav className="nav-top">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Stethoscope size={24} className="text-[#008cff]" />
            </div>
            <span className="text-white font-black text-2xl italic tracking-tighter">CLINICAL<span className="text-blue-400">CORE</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-6 border-l border-white/20 pl-6">
            <div className="nav-link">
              <div className="p-1.5 bg-emerald-500 rounded-lg"><Activity size={14} /></div>
              <span>System Status: Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="nav-link relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></span>
          </button>
          
          <div className="flex items-center gap-4 border-l border-white/20 pl-6">
            <div className="text-right">
              <p className="text-white text-[11px] font-black uppercase tracking-widest">{doctorInfo.doctorId}</p>
              <p className="text-blue-400 text-[9px] font-black uppercase">Verified Alpha</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-[12px] flex items-center justify-center font-black text-[#008cff] shadow-xl">
              DR
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>
      
      <main className="floating-container animate-slide-up">
        {/* Main Floating Card */}
        <div className="main-floating-card p-12 mt-4">
          <div className="flex items-center justify-between mb-10">
            <div className="radio-group">
              <label className="radio-item">
                <input type="radio" name="dashView" defaultChecked />
                <span>Command Center</span>
              </label>
              <label className="radio-item">
                <input type="radio" name="dashView" />
                <span>Patient Archives</span>
              </label>
              <label className="radio-item">
                <input type="radio" name="dashView" />
                <span>Analytics Node</span>
              </label>
            </div>
            <p className="text-[14px] font-bold text-gray-500">Welcome Back, Specialist</p>
          </div>

          <div className="bg-gray-900 text-white p-12 rounded-[24px] mb-12 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-10 bg-[#008cff] rounded-full" />
                <h1 className="text-[48px] font-black tracking-tighter leading-tight italic">Operations Active.</h1>
              </div>
              <p className="text-[18px] text-gray-400 font-bold max-w-2xl leading-relaxed uppercase tracking-tight italic">
                Awaiting biometric synchronization. <span className="text-blue-400">14 critical diagnostics</span> are pending for the current session.
              </p>
              <div className="mt-10 flex gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-full font-black text-[12px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
                  Access Patient Queue
                </button>
                <button className="bg-white/10 text-white px-8 py-4 rounded-full font-black text-[12px] uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all">
                  System Settings
                </button>
              </div>
            </div>
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-10">
              <Stethoscope size={400} className="rotate-12" />
            </div>
          </div>

          {/* Stats Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="section-card group">
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-[16px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                  <stat.icon size={28} />
                </div>
                <div>
                  <span className="section-label">{stat.label}</span>
                  <span className="section-value">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-gray-100">
            {/* Patient Queue */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-black uppercase italic tracking-tighter">Biometric Queue</h3>
                <button className="text-[11px] font-black uppercase text-[#008cff] hover:underline">View All Records</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'John Anderson', time: '10:00 AM', type: 'Post-Op Review', status: 'Urgent', color: 'text-red-500 bg-red-50' },
                  { name: 'Sarah Chen', time: '11:15 AM', type: 'Initial Consult', status: 'Normal', color: 'text-green-500 bg-green-50' },
                  { name: 'Michael Lee', time: '01:30 PM', type: 'Report Sync', status: 'Stable', color: 'text-blue-500 bg-blue-50' },
                ].map((appt, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[16px] hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-gray-50 rounded-[12px] flex items-center justify-center font-black text-gray-300 text-[20px] italic group-hover:bg-[#008cff] group-hover:text-white transition-all">
                        {appt.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-[18px] font-black tracking-tight">{appt.name}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{appt.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[18px] font-black italic mb-1">{appt.time}</p>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${appt.color}`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Feed */}
            <div className="space-y-8">
              <h3 className="text-[20px] font-black uppercase italic tracking-tighter">System Feed</h3>
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-[20px]">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap size={20} className="text-[#008cff]" />
                    <span className="text-[12px] font-black uppercase tracking-widest">Rapid Alerts</span>
                  </div>
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-blue-200/50">
                      <p className="text-[13px] font-bold leading-tight">Patient Anderson: Vital spike detected in sector 4.</p>
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-2 block">2m ago</span>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold leading-tight">Neural Sync: Lab results for Dossier #921 completed.</p>
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-2 block">15m ago</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 border border-gray-100 rounded-[20px]">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 italic">Tactical Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full py-4 bg-white border border-gray-200 rounded-[12px] text-[12px] font-black uppercase tracking-widest hover:bg-[#008cff] hover:text-white hover:border-[#008cff] transition-all shadow-sm">
                      Sync Wearables
                    </button>
                    <button className="w-full py-4 bg-white border border-gray-200 rounded-[12px] text-[12px] font-black uppercase tracking-widest hover:bg-[#008cff] hover:text-white hover:border-[#008cff] transition-all shadow-sm">
                      E-Pharma Portal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
