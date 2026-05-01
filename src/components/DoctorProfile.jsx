import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, MapPin, Clock, Calendar, Phone, 
  Award, Heart, ArrowLeft, ShieldCheck, 
  Globe, Mail, MessageSquare, Video, ChevronRight,
  Activity, Briefcase, GraduationCap, Search, AlertCircle,
  ChevronLeft
} from 'lucide-react';
import { doctorsData } from '../data/doctorsData';
import Navbar from './Navbar';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const doctor = doctorsData.find(doc => doc.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="bg-immersive min-h-screen flex items-center justify-center p-6">
        <div className="main-floating-card max-w-md p-16 text-center animate-slide-up">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Search size={40} className="text-gray-300" />
          </div>
          <h2 className="text-[28px] font-black tracking-tighter uppercase italic mb-4">Node Not Found</h2>
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-10 leading-relaxed">The requested specialist dossier has been relocated or purged.</p>
          <button
            onClick={() => navigate('/doctors')}
            className="btn-search w-full py-4 !text-[12px]"
          >
            RETURN TO REGISTRY
          </button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      alert(`CONSULTATION SECURED: Your appointment with Dr. ${doctor.name.toUpperCase()} is scheduled for ${selectedDate} at ${selectedTime}.`);
      setShowBooking(false);
    }
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-12 mt-4">
          <div className="mb-12 flex items-center justify-between">
            <button
              onClick={() => navigate('/doctors')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-[#008cff] hover:underline"
            >
              <ChevronLeft size={16} /> Return to Specialist Hub
            </button>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 hover:text-[#008cff] transition-colors">
                <MessageSquare size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Profile Side */}
            <div className="lg:col-span-4 space-y-10">
              <div className="text-center flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="w-52 h-52 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover grayscale-[20%]" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[#008cff] text-white p-3 rounded-[16px] shadow-xl">
                    <ShieldCheck size={28} />
                  </div>
                </div>
                
                <h2 className="text-[36px] font-black tracking-tighter italic leading-tight uppercase">{doctor.name}</h2>
                <div className="bg-blue-50 text-[#008cff] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mt-4">
                  {doctor.specialty} Specialist
                </div>

                <div className="grid grid-cols-2 gap-8 w-full mt-10 py-8 border-y border-gray-100">
                  <div>
                    <p className="text-[28px] font-black italic">{doctor.rating}</p>
                    <div className="flex justify-center text-orange-500 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "currentColor" : "none"} />)}
                    </div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{doctor.reviews} ARCHIVES</p>
                  </div>
                  <div>
                    <p className="text-[28px] font-black italic">{doctor.experience}</p>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-3 underline">OPERATIONAL</p>
                  </div>
                </div>

                <div className="w-full mt-10 space-y-4">
                  <button className="btn-search w-full py-5 !text-[12px] flex items-center justify-center gap-3">
                    <Video size={20} /> INITIALIZE VIDEO LINK
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-gray-50 py-4 rounded-[16px] text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                      <Mail size={16} /> SECURE
                    </button>
                    <button className="bg-gray-50 py-4 rounded-[16px] text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                      <Globe size={16} /> PORTAL
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Info Side */}
            <div className="lg:col-span-8 space-y-12">
              <section className="bg-gray-50 p-10 rounded-[32px] border-2 border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Activity size={180} className="text-[#008cff]" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-[22px] font-black uppercase italic tracking-tighter mb-8 flex items-center gap-4">
                    <div className="p-3 bg-[#008cff] text-white rounded-xl shadow-lg">
                      <Activity size={20} />
                    </div>
                    Clinical Insight
                  </h3>
                  <p className="text-[18px] text-gray-600 font-bold leading-relaxed italic mb-10">
                    "{doctor.about.toUpperCase()}"
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-gray-200/50">
                    <div>
                      <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 italic">SPECIALIZED DOMAINS</h4>
                      <div className="space-y-4">
                        {doctor.certifications.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-[12px] font-bold text-gray-700 uppercase tracking-tight">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#008cff]" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 italic">ACADEMIC BACKGROUND</h4>
                      <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-[16px] shadow-sm">
                        <GraduationCap size={24} className="text-[#008cff]" />
                        <p className="text-[13px] font-bold text-gray-800 uppercase italic leading-tight">{doctor.qualification}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dynamic Action Tabs */}
              <section className="bg-white border-2 border-gray-100 rounded-[32px] overflow-hidden shadow-xl">
                <div className="flex bg-gray-50/50 border-b-2 border-gray-100 p-2 gap-2">
                   <button 
                     onClick={() => setShowBooking(false)}
                     className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.3em] rounded-[16px] transition-all ${!showBooking ? 'bg-white text-[#008cff] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                   >
                     Operations Node
                   </button>
                   <button 
                     onClick={() => setShowBooking(true)}
                     className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.3em] rounded-[16px] transition-all ${showBooking ? 'bg-white text-[#008cff] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                   >
                     Book Consultation
                   </button>
                </div>

                <div className="p-10">
                  {showBooking ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-10">
                        <h4 className="text-[18px] font-black italic uppercase tracking-tight">Temporal Selection</h4>
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Date</label>
                            <input
                              type="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Diagnostic Window</label>
                            <div className="grid grid-cols-3 gap-3">
                              {timeSlots.map(time => (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                                    selectedTime === time
                                      ? 'bg-[#008cff] text-white border-[#008cff] shadow-lg shadow-blue-100'
                                      : 'bg-gray-50 text-gray-400 border-gray-50 hover:border-gray-100'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 border-2 border-gray-100 p-8 rounded-[24px] space-y-8">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">SYNCHRONIZATION DATA</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-[13px] font-bold uppercase tracking-tight text-gray-700">
                            <span>Link Specialist</span>
                            <span className="italic">Dr. {doctor.name.split(' ').pop()}</span>
                          </div>
                          <div className="flex justify-between items-center text-[13px] font-bold uppercase tracking-tight text-gray-700">
                            <span>Window Protocol</span>
                            <span className="text-[#008cff]">Secure Uplink</span>
                          </div>
                          <div className="h-[1px] bg-gray-200 my-4" />
                          <div className="flex justify-between items-baseline">
                            <span className="text-[10px] font-black text-gray-400 uppercase">Total Fee</span>
                            <span className="text-[32px] font-black italic">{doctor.consultationFee}</span>
                          </div>
                        </div>
                        <button
                          onClick={handleBookAppointment}
                          disabled={!selectedDate || !selectedTime}
                          className="btn-search w-full py-5 !text-[13px] shadow-none disabled:opacity-30"
                        >
                          CONFIRM SECURE LINK
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <h4 className="text-[18px] font-black italic uppercase tracking-tight">Active Hours</h4>
                        <div className="space-y-4">
                          {['Mon - Fri', 'Sat', 'Sun'].map((time, i) => (
                            <div key={i} className="flex justify-between items-center text-[13px] font-bold text-gray-600 uppercase">
                              <span>{time}</span>
                              <div className="h-[1px] flex-1 mx-4 bg-gray-100" />
                              <span className="text-[#008cff] italic">{i === 2 ? 'Closed' : '09:00 - 17:00'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-blue-50 border-2 border-blue-100 p-10 rounded-[24px] relative overflow-hidden group">
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#008cff] text-white rounded-xl shadow-lg flex items-center justify-center">
                              <ShieldCheck size={24} />
                            </div>
                            <h4 className="text-[18px] font-black italic uppercase">Verified Access</h4>
                          </div>
                          <p className="text-[12px] font-bold text-blue-800/60 leading-relaxed uppercase mb-8">
                            This specialist is a verified senior node in the Mediscan network. Consultations are recorded and encrypted for clinical archives.
                          </p>
                          <button 
                            onClick={() => setShowBooking(true)}
                            className="flex items-center gap-2 text-[#008cff] font-black text-[12px] uppercase tracking-widest hover:translate-x-2 transition-transform"
                          >
                            BOOK APPOINTMENT <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
