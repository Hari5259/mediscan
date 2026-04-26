import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, MapPin, Clock, Calendar, Phone, 
  Award, Heart, ArrowLeft, ShieldCheck, 
  Globe, Mail, MessageSquare, Video, ChevronRight,
  Activity, Briefcase, GraduationCap
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
      <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
        <div className="glass-card p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-slate-300" size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Specialist Not Found</h2>
          <p className="text-slate-500 font-medium mb-8">The professional you are looking for might have moved or is currently unavailable.</p>
          <button
            onClick={() => navigate('/doctors')}
            className="btn-primary w-full"
          >
            Return to Registry
          </button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      // In a real app, this would be an API call
      setShowBooking(false);
      // We could use a modern modal or toast here, but for now we'll navigate or show success
      alert(`Success! Your consultation with ${doctor.name} is scheduled for ${selectedDate} at ${selectedTime}.`);
    }
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Premium Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/doctors')}
              className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Professional Profile</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 text-slate-400 hover:text-rose-500 transition-colors">
              <Heart size={22} />
            </button>
             <button className="p-3 text-slate-400 hover:text-blue-600 transition-colors">
              <MessageSquare size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Doctor Stats & Identity */}
        <div className="lg:col-span-4 space-y-8">
          <div className="card p-8 text-center flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-44 h-44 rounded-[2.5rem] overflow-hidden ring-4 ring-blue-50 shadow-2xl">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-3 rounded-2xl shadow-xl shadow-blue-200">
                <ShieldCheck size={24} />
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-3xl font-black text-slate-900 mb-1">{doctor.name}</h2>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">{doctor.specialty}</p>
            </div>

            <div className="flex items-center gap-6 py-6 border-y border-slate-50 w-full justify-center">
              <div className="text-center">
                <p className="text-2xl font-black text-slate-900">{doctor.rating}</p>
                <div className="flex gap-0.5 text-amber-500 mb-1 justify-center">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < 4 ? "currentColor" : "none"} />)}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{doctor.reviews} Reviews</p>
              </div>
              <div className="w-px h-10 bg-slate-100"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-slate-900">{doctor.experience}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">Experience</p>
              </div>
            </div>

            <div className="w-full mt-8 space-y-3">
              <button className="btn-primary w-full py-5 flex items-center justify-center gap-2 group">
                <Video size={20} />
                <span>Video Consultation</span>
              </button>
               <div className="grid grid-cols-2 gap-3">
                  <button className="btn-secondary py-4 flex items-center justify-center gap-2">
                    <Mail size={18} />
                    <span>Email</span>
                  </button>
                  <button className="btn-secondary py-4 flex items-center justify-center gap-2">
                    <Globe size={18} />
                    <span>Web</span>
                  </button>
               </div>
            </div>
          </div>

          <div className="card p-8">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Contact Info</h3>
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 text-blue-600 rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-tight mb-1">Practice Location</p>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">{doctor.hospital}</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 text-indigo-600 rounded-xl">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-tight mb-1">Direct Line</p>
                    <p className="text-sm font-bold text-slate-700">+1 (800) 555-0199</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Booking */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Biography */}
          <section className="card p-10">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Activity className="text-blue-600" /> Professional Overview
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed text-lg mb-10">
              {doctor.about}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Expertise</h4>
                <div className="space-y-3">
                  {doctor.certifications.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Academic Background</h4>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <GraduationCap size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-700 leading-tight">{doctor.qualification}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Booking Section */}
          <section className="card border-2 border-blue-100 overflow-hidden">
            <div className="p-1 gap-1 flex bg-slate-50 border-b border-slate-100">
               <button 
                 onClick={() => setShowBooking(false)}
                 className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-t-2xl transition-all ${!showBooking ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Profile Details
               </button>
               <button 
                 onClick={() => setShowBooking(true)}
                 className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-t-2xl transition-all ${showBooking ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Booking Portal
               </button>
            </div>

            <div className="p-10">
               {showBooking ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <h4 className="text-xl font-black text-slate-900">Select consultation slot</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Date</label>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="input-field"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest inline-block">Time of day</label>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map(time => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 px-1 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border ${
                                  selectedTime === time
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                                    : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-[2rem] space-y-6">
                       <h4 className="text-sm font-black text-slate-900 uppercase">Consultation Summary</h4>
                       <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-slate-400">Specialist</span>
                            <span className="font-black text-slate-900">Dr. {doctor.name.split(' ').pop()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-slate-400">Duration</span>
                            <span className="font-black text-slate-900">45 Minutes</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-slate-400">Platform</span>
                            <span className="font-black text-slate-900">Secure Audio/Video</span>
                          </div>
                          <div className="h-px bg-slate-200"></div>
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-slate-400">TOTAL FEE</span>
                            <span className="text-3xl font-black text-blue-600">{doctor.consultationFee}</span>
                          </div>
                       </div>
                       <button
                          onClick={handleBookAppointment}
                          disabled={!selectedDate || !selectedTime}
                          className="w-full btn-primary py-5 text-base"
                        >
                          Confirm & Secure Booking
                        </button>
                    </div>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                       <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Office Hours</h4>
                       <div className="space-y-3">
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                            <div key={day} className="flex justify-between items-center text-sm">
                              <span className="font-bold text-slate-700">{day}</span>
                              <span className="font-black text-blue-600">09:00 - 17:00</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-50">
                       <div className="flex items-center gap-3 mb-4">
                         <div className="w-10 h-10 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center">
                            <ShieldCheck size={20} />
                         </div>
                         <h4 className="text-lg font-black text-slate-900">Ready to Book?</h4>
                       </div>
                       <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
                         Immediate slots are available for new patients this week. Select the portal to choose your preferred time.
                       </p>
                       <button 
                         onClick={() => setShowBooking(true)}
                         className="flex items-center justify-center gap-2 group font-black text-blue-600 text-sm uppercase tracking-widest"
                       >
                         Enter Booking Portal
                         <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
