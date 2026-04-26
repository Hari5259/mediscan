import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Users, Calendar, FileText, 
  TrendingUp, CheckCircle, Bell, Settings, 
  Search, Filter, ChevronRight, Activity,
  Stethoscope, Clock, ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DoctorDashboard() {
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Patients', value: '24', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Today Orders', value: '12', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Consultations', value: '8', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Global Rank', value: 'Top 5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Premium Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Doctor<span className="text-blue-600">Portal</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{doctorInfo.doctorId}</p>
                <div className="flex items-center justify-end gap-1">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Verified Surgeon</p>
                </div>
              </div>
              <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-lg overflow-hidden ring-2 ring-slate-100">
                <span className="text-lg">DR</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full space-y-8">
        
        {/* Welcome Section */}
        <section className="card bg-slate-900 p-10 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-extrabold mb-4">Welcome, Specialist.</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
              System is ready. You have <span className="text-white">4 urgent consultations</span> pending for the morning session.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                <Calendar size={18} />
                Manage Calendar
              </button>
              <button className="px-6 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all">
                System Logs
              </button>
            </div>
          </div>
          {/* Abstract Background Decoration */}
          <div className="absolute top-[-20%] right-[-5%] w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10 rotate-12">
            <Stethoscope size={280} />
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="card p-6 flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Appointments */}
          <section className="lg:col-span-8 card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Clock className="text-blue-600" /> Morning Session
              </h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search patients..." className="bg-slate-50 border-none rounded-lg py-2 pl-9 text-xs font-bold focus:ring-2 focus:ring-blue-100" />
                </div>
                <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'John Anderson', time: '10:00 AM', type: 'Post-Op Follow-up', status: 'Urgent', statusColor: 'bg-rose-50 text-rose-600' },
                { name: 'Sarah Chen', time: '11:15 AM', type: 'New Consultation', status: 'Routine', statusColor: 'bg-emerald-50 text-emerald-600' },
                { name: 'Michael Johnson', time: '12:00 PM', type: 'Scan Review', status: 'Remote', statusColor: 'bg-blue-50 text-blue-600' },
              ].map((appt, idx) => (
                <div key={idx} className="group flex items-center justify-between p-5 rounded-[1.5rem] hover:bg-slate-50 transition-all border border-slate-50 hover:border-slate-100 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center font-bold text-slate-400">
                      {appt.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{appt.name}</p>
                      <p className="text-xs font-semibold text-slate-400 italic">{appt.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-black text-slate-900">{appt.time}</p>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${appt.statusColor}`}>
                        {appt.status}
                      </span>
                    </div>
                    <ChevronRight size={20} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-secondary w-full mt-8 h-14 flex items-center justify-center gap-2 group">
              <span>Access Master Schedule</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </section>

          {/* Right Column: Clinical Tools */}
          <section className="lg:col-span-4 space-y-8">
            <div className="card p-8 bg-blue-600 text-white shadow-blue-200">
              <h3 className="text-xl font-extrabold mb-6">Clinical Portal</h3>
              <div className="space-y-3">
                {[
                  { icon: FileText, label: 'E-Prescriptions', count: '12' },
                  { icon: Activity, label: 'Laboratory Orders', count: '5' },
                  { icon: ShieldCheck, label: 'Referral Center', count: '2' },
                ].map((tool, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-left">
                    <div className="flex items-center gap-3">
                      <tool.icon size={20} />
                      <span className="font-bold">{tool.label}</span>
                    </div>
                    <span className="bg-white/10 px-2 py-0.5 rounded-lg text-xs font-black">{tool.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-8 border-dashed border-2 border-slate-200 bg-transparent shadow-none">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Clinical Notifications</h3>
              <div className="space-y-6">
                {[
                  { user: 'Nurse Sarah', msg: 'Patient Anderson in Room 402 is ready.', time: '5m' },
                  { user: 'Lab System', msg: 'Results available for ID #9201.', time: '12m' },
                ].map((note, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-0.5">{note.user}</p>
                      <p className="text-xs font-semibold text-slate-500 leading-relaxed">{note.msg}</p>
                      <span className="text-[10px] font-bold text-slate-300 uppercase">{note.time} ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
