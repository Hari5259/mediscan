import { useNavigate } from 'react-router-dom';
import { 
  Heart, LogOut, Stethoscope, ClipboardList, 
  BrainCircuit, Calendar, Pill, BarChart3, 
  Settings, User, Bell, ChevronRight, Activity, Scale, ShieldAlert
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };

  const quickStats = [
    { label: 'Heart Rate', value: '72 bpm', icon: Activity, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Blood Pres.', value: '120/80', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Sleep', value: '7.5 hrs', icon: BrainCircuit, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Premium Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Medi<span className="text-blue-600">Scan</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Alex Johnson</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient</p>
              </div>
              <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform">
                AJ
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Welcome & Stats */}
        <div className="lg:col-span-8 space-y-8">
          <div className="card gradient-bg p-10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back, Alex!</h2>
              <p className="text-slate-500 font-medium max-w-md">
                Your health metrics are looking stable today. You have an appointment tomorrow at 10:00 AM.
              </p>
              <div className="mt-8 flex gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <Calendar size={18} />
                  Book Appointment
                </button>
                <button className="btn-secondary">Download Summary</button>
              </div>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickStats.map((stat, idx) => (
              <div key={idx} className="card p-6 flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} />
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Activity Section */}
          <div className="card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="text-blue-600" /> Recent Activity
              </h3>
              <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {[
                { title: 'Blood Lab Results', date: 'Oct 24, 2026', type: 'Laboratory', status: 'Completed', color: 'bg-emerald-50 text-emerald-600' },
                { title: 'General Checkup', date: 'Oct 20, 2026', type: 'Appointment', status: 'Follow-up', color: 'bg-blue-50 text-blue-600' },
                { title: 'Prescription Refill', date: 'Oct 15, 2026', type: 'Pharmacy', status: 'Ready', color: 'bg-amber-50 text-amber-600' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                      {item.type === 'Laboratory' ? <Activity size={20} className="text-blue-500" /> : 
                       item.type === 'Appointment' ? <Calendar size={20} className="text-indigo-500" /> : 
                       <Pill size={20} className="text-rose-500" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs font-semibold text-slate-400">{item.date} • {item.type}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-lg text-xs font-bold ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Navigation & Tips */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="card p-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Portal</h3>
            <button 
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-rose-600 shadow-lg shadow-rose-200 dark:shadow-rose-900/20 group transition-all"
              onClick={() => navigate('/emergency')}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 text-white rounded-xl group-hover:scale-110 transition-transform">
                  <ShieldAlert size={20} />
                </div>
                <span className="font-bold text-white uppercase tracking-wider">Emergency Contact</span>
              </div>
              <ChevronRight size={18} className="text-white/70 group-hover:translate-x-1 transition-all" />
            </button>
            <button 
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-blue-200 hover:bg-blue-50/30 group transition-all"
              onClick={() => navigate('/doctors')}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Stethoscope size={20} />
                </div>
                <span className="font-bold text-slate-700">Find Doctors</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600" />
            </button>
            <button 
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 hover:bg-emerald-50/30 group transition-all"
              onClick={() => navigate('/bmi-calculator')}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Scale size={20} />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-300">BMI Calculator</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-600" />
            </button>
            <button 
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 hover:bg-indigo-50/30 group transition-all"
              onClick={() => navigate('/health-reports')}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <BarChart3 size={20} />
                </div>
                <span className="font-bold text-slate-700">Health Reports</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600" />
            </button>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">Pro Tip</span>
              <h4 className="text-xl font-bold mb-4 italic">"Hydration is the foundation of good cellular health."</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Drinking at least 2L of water daily can improve your energy levels by 20%.
              </p>
            </div>
            <div className="absolute bottom-[-10%] right-[-10%] opacity-10">
              <Activity size={120} />
            </div>
          </div>

          <div className="card p-8 border-dashed border-2 border-slate-200 bg-transparent shadow-none">
            <h3 className="text-lg font-bold text-slate-400 mb-6 uppercase tracking-widest">Upcoming Tech</h3>
            <div className="space-y-4">
              {['AI Diagnosis', 'Lab Integration', 'Video Support'].map((tech, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
