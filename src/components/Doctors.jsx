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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Premium Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Find Specialists</h1>
          </div>
          
          <div className="hidden sm:flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <span className="font-bold text-slate-900">MediScan</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full space-y-8">
        
        {/* Search & Global Filter */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={22} />
            <input
              type="text"
              placeholder="Search by specialty, doctor name, or medical condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm focus:ring-4 focus:ring-blue-100/50 focus:border-blue-200 transition-all font-medium text-slate-900 outline-none"
            />
          </div>
          <div className="lg:col-span-4 relative">
             <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-14 pr-10 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm focus:ring-4 focus:ring-blue-100/50 focus:border-blue-200 transition-all font-bold text-slate-700 outline-none appearance-none cursor-pointer"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronLeft size={16} className="-rotate-90" />
              </div>
          </div>
        </section>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Available Specialists <span className="ml-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">{filteredDoctors.length}</span>
          </h2>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
            <span>Sort by:</span>
            <button className="text-blue-600 underline underline-offset-4">Highest Rated</button>
          </div>
        </div>

        {/* Doctors Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.id}
              onClick={() => navigate(`/doctor/${doctor.id}`)}
              className="card group cursor-pointer border border-transparent hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-lg rounded-xl px-3 py-2 flex items-center gap-1.5 ring-1 ring-black/5">
                  <Star size={16} className="text-amber-500" fill="currentColor" />
                  <span className="font-black text-slate-900 text-sm">{doctor.rating}</span>
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                   <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                    {doctor.specialty}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-extrabold text-slate-900">{doctor.name}</h3>
                    <ShieldCheck size={20} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{doctor.qualification}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-blue-500">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Experience</p>
                      <p className="text-sm font-bold text-slate-700">{doctor.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-emerald-500">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Location</p>
                      <p className="text-sm font-bold text-slate-700 truncate w-24">Main City</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fee</p>
                    <p className="text-xl font-black text-slate-900">{doctor.consultationFee}</p>
                  </div>
                  <button className="flex items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-2xl group-hover:bg-blue-600 transition-colors shadow-lg">
                    <Calendar size={20} />
                    <span className="font-bold text-sm">Review Slot</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* No Results Content */}
        {filteredDoctors.length === 0 && (
          <div className="card p-20 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto">
              <Search size={40} className="text-slate-200" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">No Specialists Found</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                We couldn't find any healthcare professionals matching your current filters. 
                Try adjusting your search terms or exploring different specialties.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('All');
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Reset All Filters
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
