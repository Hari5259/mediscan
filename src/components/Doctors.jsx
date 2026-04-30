import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Filter, Search, Heart, ChevronLeft, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { doctorsData } from '../data/doctorsData';

export default function Doctors() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', ...new Set(doctorsData.map(doc => doc.specialty))];

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background HUD elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Cyber Nav */}
      <nav className="bg-black/40 backdrop-blur-3xl sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 text-cyan-400 shadow-2xl"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic">
                Specialist <span className="text-cyan-400">Hub</span>
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network Verified</span>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-3">
             <div className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-2xl">
              <Heart className="w-6 h-6 text-rose-500" fill="currentColor" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full space-y-12">
        
        {/* Search & Global Filter - High Tech Bar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] shadow-2xl backdrop-blur-sm">
          <div className="lg:col-span-8 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
            <input
              type="text"
              placeholder="SEARCH BY SPECIALTY, NAME, OR PROTOCOL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-[#050505] border border-white/5 rounded-[2rem] focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/30 transition-all font-black text-[11px] tracking-widest text-white outline-none uppercase placeholder:text-slate-700"
            />
          </div>
          <div className="lg:col-span-4 relative group">
             <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-cyan-400 transition-colors" size={18} />
             <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-16 pr-12 py-5 bg-[#050505] border border-white/5 rounded-[2rem] focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/30 transition-all font-black text-[11px] tracking-widest text-white outline-none appearance-none cursor-pointer uppercase"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty} className="bg-black text-white">{specialty}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                <ChevronLeft size={16} className="-rotate-90" />
              </div>
          </div>
        </section>

        {/* Results Header */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">
              Verified Personnel <span className="ml-4 text-slate-500 font-mono text-sm">[{filteredDoctors.length}]</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <span>Filter Priority:</span>
            <button className="text-cyan-400 border-b border-cyan-400/30 pb-1">Highest Accuracy</button>
          </div>
        </div>

        {/* Doctors Grid - High Tech Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.id}
              onClick={() => navigate(`/doctor/${doctor.id}`)}
              className="group relative h-[32rem] rounded-[3rem] bg-[#080808] border border-white/5 overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-500 shadow-2xl"
            >
              {/* Background HUD Scanline Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan"></div>
              </div>

              <div className="relative h-64 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-80"></div>
                
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-2xl">
                  <Star size={14} className="text-cyan-400" fill="currentColor" />
                  <span className="font-black text-white text-xs">{doctor.rating}</span>
                </div>

                <div className="absolute bottom-6 left-6">
                   <span className="px-4 py-1.5 bg-cyan-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl border border-white/20">
                    {doctor.specialty}
                  </span>
                </div>
              </div>

              <div className="p-10 space-y-6 relative">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">{doctor.name}</h3>
                    <ShieldCheck size={20} className="text-cyan-500" />
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">{doctor.qualification}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-cyan-400 border border-white/10">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Service</p>
                      <p className="text-xs font-bold text-slate-300">{doctor.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 border border-white/10">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Sector</p>
                      <p className="text-xs font-bold text-slate-300 truncate w-24 italic font-black uppercase">Main City</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Protocol Fee</p>
                    <p className="text-2xl font-black text-white italic tracking-tighter">{doctor.consultationFee}</p>
                  </div>
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110 shadow-2xl">
                    <Calendar size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* No Results Content */}
        {filteredDoctors.length === 0 && (
          <div className="bg-white/[0.02] border border-white/5 p-20 text-center space-y-10 max-w-2xl mx-auto rounded-[3.5rem] shadow-2xl">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
              <Search size={40} className="text-slate-700 animate-pulse" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">No Personnel Detected</h3>
              <p className="text-slate-500 font-medium leading-relaxed uppercase text-xs tracking-widest">
                System failed to match current search parameters with any verified medical profile.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('All');
              }}
              className="px-10 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Reset Protocol
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
