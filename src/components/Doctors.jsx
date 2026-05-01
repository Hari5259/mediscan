import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Filter, 
  Search, 
  Heart, 
  ChevronLeft, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Activity,
  MessageCircle,
  Camera,
  FileText,
  Users,
  AlertCircle
} from 'lucide-react';
import { doctorsData } from '../data/doctorsData';
import Navbar from './Navbar';

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

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
    { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
    { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
    { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
    { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
  ];

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="module-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`module-tab-item ${tab.id === 'doctors' ? 'active' : ''}`}
            >
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="main-floating-card mt-4 p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8">
            <div className="radio-group">
              <label className="radio-item">
                <input type="radio" name="viewType" defaultChecked />
                <span>Verified Personnel</span>
              </label>
              <label className="radio-item">
                <input type="radio" name="viewType" />
                <span>Nearby Clinics</span>
              </label>
            </div>
            
            <div className="flex-1 max-w-2xl w-full flex gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#008cff] transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-12 pr-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                />
              </div>
              <div className="relative group min-w-[200px]">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-12 pr-10 py-4 text-[14px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:border-[#008cff] transition-all"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDoctors.map(doctor => (
              <div
                key={doctor.id}
                onClick={() => navigate(`/doctor/${doctor.id}`)}
                className="section-card !p-0 overflow-hidden group shadow-lg"
              >
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-[10px] flex items-center gap-1.5 shadow-xl">
                    <Star size={14} className="text-orange-500" fill="currentColor" />
                    <span className="text-[12px] font-black">{doctor.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#008cff] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {doctor.specialty}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[24px] font-black tracking-tight group-hover:text-[#008cff] transition-colors">{doctor.name}</h3>
                    <ShieldCheck size={20} className="text-[#008cff]" />
                  </div>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">{doctor.qualification}</p>

                  <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-[#008cff]">
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase">Exp</p>
                        <p className="text-[13px] font-bold">{doctor.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg text-green-600">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase">Location</p>
                        <p className="text-[13px] font-bold">Main City</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Consultation Fee</p>
                      <p className="text-[22px] font-black text-[#1d1d1f] italic">{doctor.consultationFee}</p>
                    </div>
                    <div className="w-12 h-12 rounded-[12px] bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#008cff] group-hover:text-white transition-all shadow-md">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={40} className="text-gray-200" />
              </div>
              <h3 className="text-[28px] font-black tracking-tighter mb-4">No Specialists Found</h3>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[12px]">Try adjusting your search or filters.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedSpecialty('All'); }}
                className="mt-10 px-8 py-3 bg-gray-100 rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
