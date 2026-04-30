import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, MapPin, Clock, Calendar, Phone, 
  Award, Heart, ArrowLeft, ShieldCheck, 
  Globe, Mail, MessageSquare, Video, ChevronRight,
  Activity, Briefcase, GraduationCap, Search, AlertCircle
} from 'lucide-react';
import { doctorsData } from '../data/doctorsData';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const doctor = doctorsData.find(doc => doc.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 font-sans">
        <div className="bg-[#080808] border border-white/5 p-16 rounded-[3.5rem] text-center max-w-md shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-white/5">
            <Search className="text-slate-800" size={40} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">Node Not Found</h2>
          <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mb-12">The requested specialist dossier has been relocated or purged from active archives.</p>
          <button
            onClick={() => navigate('/doctors')}
            className="w-full bg-white text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all shadow-2xl active:scale-95"
          >
            RETURN TO REGISTRY
          </button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      alert(`PROTOCOAL INITIALIZED: YOUR CONSULTATION WITH DR. ${doctor.name.toUpperCase()} IS SCHEDULED FOR ${selectedDate} AT ${selectedTime}.`);
      setShowBooking(false);
    }
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-x-hidden">
      {/* Background HUD elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent animate-scan"></div>
      </div>

      {/* Cyber Nav */}
      <nav className="bg-black/40 backdrop-blur-3xl sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/doctors')}
              className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 text-cyan-400 shadow-2xl"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="h-10 w-px bg-white/5"></div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic">
                Specialist <span className="text-cyan-400">Dossier</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network Secure Link</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-4 bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded-2xl border border-white/5 transition-all">
              <Heart size={24} />
            </button>
             <button className="p-4 bg-white/5 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 rounded-2xl border border-white/5 transition-all">
              <MessageSquare size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Left Column: Specialist Stats & Identity */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-[#080808] border border-white/5 rounded-[3.5rem] p-10 text-center flex flex-col items-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent animate-scan pointer-events-none"></div>
            <div className="relative mb-8 group">
              <div className="w-52 h-52 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl transform group-hover:scale-105 transition-all duration-700">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-black p-4 rounded-2xl shadow-2xl border-4 border-[#080808] animate-in zoom-in duration-1000 delay-300">
                <ShieldCheck size={28} />
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">{doctor.name}</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="w-4 h-[1px] bg-cyan-500/30"></span>
                <p className="text-cyan-400 font-black uppercase tracking-[0.4em] text-[10px] italic">{doctor.specialty}</p>
                <span className="w-4 h-[1px] bg-cyan-500/30"></span>
              </div>
            </div>

            <div className="flex items-center gap-10 py-10 border-y border-white/5 w-full justify-center">
              <div className="text-center">
                <p className="text-3xl font-black text-white italic tracking-tighter">{doctor.rating}</p>
                <div className="flex gap-1 text-cyan-400 mb-2 justify-center">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "currentColor" : "none"} />)}
                </div>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{doctor.reviews} ARCHIVES</p>
              </div>
              <div className="w-px h-12 bg-white/5"></div>
              <div className="text-center">
                <p className="text-3xl font-black text-white italic tracking-tighter">{doctor.experience}</p>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-3">OPERATIONAL</p>
              </div>
            </div>

            <div className="w-full mt-10 space-y-4">
              <button className="w-full bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-cyan-400 transition-all shadow-2xl active:scale-95 group">
                <Video size={20} />
                <span>Video Link Initialized</span>
              </button>
               <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white/5 border border-white/10 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[9px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
                    <Mail size={16} />
                    <span>SECURE</span>
                  </button>
                  <button className="bg-white/5 border border-white/10 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[9px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
                    <Globe size={16} />
                    <span>NODE</span>
                  </button>
               </div>
            </div>
          </div>

          <div className="bg-[#080808] border border-white/5 rounded-[3.5rem] p-10 shadow-2xl">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">Access Vectors</h3>
            <div className="space-y-8">
               <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-white/5 text-cyan-400 rounded-2xl border border-white/5 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Primary Sector</p>
                    <p className="text-sm font-black text-white uppercase italic tracking-tight">{doctor.hospital}</p>
                  </div>
               </div>
               <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-white/5 text-indigo-400 rounded-2xl border border-white/5 group-hover:bg-indigo-500 group-hover:text-black transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Neural Link ID</p>
                    <p className="text-sm font-black text-white uppercase italic tracking-tight">+1 (800) MEDI-CORE</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Booking */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Biography */}
          <section className="bg-[#080808] border border-white/5 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
               <Activity size={180} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-6">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                <Activity size={20} />
              </div>
              Clinical Overview
            </h3>
            <p className="text-slate-400 font-medium leading-relaxed text-xl mb-12 italic">
              "{doctor.about.toUpperCase()}"
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
              <div className="space-y-8">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">SPECIALIZED DOMAINS</h4>
                <div className="space-y-4">
                  {doctor.certifications.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs font-black text-slate-300 uppercase tracking-widest group">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] group-hover:scale-150 transition-transform"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">ACADEMIC CREDENTIALS</h4>
                <div className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 shadow-2xl">
                    <GraduationCap size={28} />
                  </div>
                  <p className="text-xs font-black text-white leading-tight uppercase italic tracking-tight">{doctor.qualification}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Booking Section */}
          <section className="bg-[#080808] border border-white/5 rounded-[3.5rem] overflow-hidden shadow-2xl">
            <div className="p-2 gap-2 flex bg-white/[0.02] border-b border-white/5">
               <button 
                 onClick={() => setShowBooking(false)}
                 className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.4em] rounded-[2rem] transition-all duration-500 ${!showBooking ? 'bg-white text-black shadow-2xl scale-[1.02]' : 'text-slate-600 hover:text-white'}`}
               >
                 Clinical Dossier
               </button>
               <button 
                 onClick={() => setShowBooking(true)}
                 className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.4em] rounded-[2rem] transition-all duration-500 ${showBooking ? 'bg-white text-black shadow-2xl scale-[1.02]' : 'text-slate-600 hover:text-white'}`}
               >
                 Initialize Sync
               </button>
            </div>

            <div className="p-12 relative">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent animate-scan pointer-events-none"></div>
               {showBooking ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-10">
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Temporal Selection</h4>
                      </div>
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] ml-4">Authorized Date</label>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-cyan-500/30 transition-all font-black text-xs tracking-widest uppercase appearance-none"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div className="space-y-6">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] ml-4 inline-block">Diagnostic Window</label>
                          <div className="grid grid-cols-3 gap-3">
                            {timeSlots.map(time => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-4 px-1 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                                  selectedTime === time
                                    ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                                    : 'bg-black text-slate-600 border-white/5 hover:border-white/20'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] space-y-10 shadow-2xl">
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">SYNCHRONIZATION PARAMETERS</h4>
                       <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">SPECIALIST</span>
                            <span className="text-xs font-black text-white uppercase italic">DR. {doctor.name.split(' ').pop().toUpperCase()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">LINK DURATION</span>
                            <span className="text-xs font-black text-white uppercase italic">45 MINUTES</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">PROTOCOL</span>
                            <span className="text-xs font-black text-cyan-400 uppercase italic">NEURAL SECURE</span>
                          </div>
                          <div className="h-px bg-white/5"></div>
                          <div className="flex justify-between items-baseline pt-4">
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">SYSTEM FEE</span>
                            <span className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{doctor.consultationFee}</span>
                          </div>
                       </div>
                       <button
                          onClick={handleBookAppointment}
                          disabled={!selectedDate || !selectedTime}
                          className="w-full bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all shadow-2xl active:scale-95 disabled:opacity-20"
                        >
                          CONFIRM ARCHIVE LINK
                        </button>
                    </div>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-10">
                       <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Operational Timeline</h4>
                       </div>
                       <div className="space-y-4">
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                            <div key={day} className="flex justify-between items-center group/day">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover/day:text-white transition-colors">{day}</span>
                              <div className="h-px flex-1 mx-6 bg-white/5 group-hover/day:bg-cyan-500/30 transition-all"></div>
                              <span className="text-xs font-black text-cyan-400 uppercase italic">09:00 - 17:00</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="bg-cyan-500/5 border border-cyan-500/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                       <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
                       <div className="flex items-center gap-5 mb-8">
                         <div className="w-14 h-14 bg-cyan-400 text-black rounded-2xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <ShieldCheck size={28} />
                         </div>
                         <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">Initialize Sync?</h4>
                       </div>
                       <p className="text-[10px] font-black text-slate-500 mb-10 leading-relaxed uppercase tracking-widest">
                         SECURE SLOTS ARE DETECTED FOR ACTIVE PATIENTS THIS CYCLE. INITIALIZE NEURAL LINK PROTOCOL TO FINALIZE TEMPORAL SELECTION.
                       </p>
                       <button 
                         onClick={() => setShowBooking(true)}
                         className="flex items-center justify-center gap-4 group font-black text-cyan-400 text-[11px] uppercase tracking-[0.5em] italic"
                       >
                         ACCESS BOOKING NODE
                         <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                       </button>
                    </div>
                 </div>
               )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
