import React from 'react';
import { Video, Calendar, Clock, User, ChevronLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Webinars() {
  const navigate = useNavigate();

  const webinars = [
    {
      id: 1,
      title: "Understanding Heart Health in Modern Age",
      doctor: "Dr. Sarah Mitchell",
      specialty: "Cardiologist",
      date: "May 10, 2026",
      time: "10:00 AM EST",
      status: "Upcoming",
      attendees: 1240
    },
    {
      id: 2,
      title: "Mental Wellness & Stress Management",
      doctor: "Dr. James Wilson",
      specialty: "Psychiatrist",
      date: "May 12, 2026",
      time: "2:00 PM EST",
      status: "Upcoming",
      attendees: 856
    },
    {
      id: 3,
      title: "Nutrition Myths Debunked",
      doctor: "Dr. Emily Chen",
      specialty: "Dietitian",
      date: "May 15, 2026",
      time: "11:30 AM EST",
      status: "Upcoming",
      attendees: 2100
    }
  ];

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-12 mt-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Video size={24} className="text-rose-500" />
                </div>
                <h1 className="text-[42px] font-black tracking-tighter leading-tight">Live Sessions</h1>
              </div>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Free Medical Webinars & Consultations</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-[#008cff] hover:underline"
            >
              <ChevronLeft size={16} /> Return to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinars.map((webinar) => (
              <div key={webinar.id} className="bg-white border border-gray-100 rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                <div className="h-32 bg-gradient-to-r from-rose-400 to-rose-600 relative p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                      {webinar.status}
                    </span>
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm cursor-pointer hover:bg-white/40 transition-colors">
                      <Bell size={16} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-white font-extrabold text-[18px] leading-tight line-clamp-2">{webinar.title}</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[14px]">{webinar.doctor}</h4>
                      <p className="text-[12px] text-rose-500 font-bold">{webinar.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600 text-[13px] font-medium">
                      <Calendar size={16} className="text-gray-400" />
                      {webinar.date}
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 text-[13px] font-medium">
                      <Clock size={16} className="text-gray-400" />
                      {webinar.time}
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 text-[13px] font-medium">
                      <User size={16} className="text-gray-400" />
                      {webinar.attendees} Registered
                    </div>
                  </div>
                  
                  <button className="w-full btn-search !text-[14px] py-3 flex items-center justify-center gap-2">
                    <Video size={18} />
                    Register for Free
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
