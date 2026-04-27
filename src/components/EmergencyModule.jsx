import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, AlertTriangle, ArrowLeft, Heart, 
  MapPin, ShieldAlert, Ambulance, LifeBuoy,
  ChevronRight, ExternalLink
} from 'lucide-react';

export default function EmergencyModule() {
  const navigate = useNavigate();

  const emergencyContacts = [
    { 
      name: 'Integrated Emergency', 
      number: '112', 
      icon: ShieldAlert, 
      color: 'bg-rose-600', 
      desc: 'All-in-one emergency helpline (India).' 
    },
    { 
      name: 'Police Support', 
      number: '100', 
      icon: ShieldAlert, 
      color: 'bg-blue-600', 
      desc: 'Immediate police assistance.' 
    },
    { 
      name: 'Ambulance Service', 
      number: '102', 
      icon: Ambulance, 
      color: 'bg-emerald-600', 
      desc: 'Medical emergency and ambulance.' 
    },
    { 
      name: 'Fire Department', 
      number: '101', 
      icon: AlertTriangle, 
      color: 'bg-orange-600', 
      desc: 'Fire and rescue services.' 
    }
  ];

  const nearbyHospitals = [
    { name: 'City Central Hospital', distance: '1.2 miles', status: 'Open 24/7' },
    { name: 'St. Mary Medical Center', distance: '2.5 miles', status: 'ER Busy' },
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-rose-50/30 dark:bg-slate-950 flex flex-col items-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-rose-500/10 blur-[120px] -z-10"></div>

      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl hover:scale-110 transition-transform text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-rose-600 p-2 rounded-xl shadow-lg shadow-rose-200">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Emergency <span className="text-rose-600">Center</span>
            </h1>
          </div>
          <div className="w-12 h-12"></div>
        </div>

        {/* Warning Banner */}
        <div className="bg-rose-600 text-white p-6 rounded-[2rem] shadow-2xl shadow-rose-200/50 flex items-center gap-6 animate-pulse">
          <div className="p-4 bg-white/20 rounded-2xl">
            <AlertTriangle size={32} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase mb-1">Immediate Assistance</h2>
            <p className="text-rose-50 font-medium text-sm">
              If you are experiencing a life-threatening emergency, call your local emergency number immediately.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Emergency Numbers */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Quick Dial Numbers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {emergencyContacts.map((contact, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCall(contact.number)}
                  className="glass-card p-6 rounded-[2rem] text-left hover:border-rose-200 group transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${contact.color} p-3 rounded-2xl text-white`}>
                      <contact.icon size={24} />
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      <Phone size={16} />
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1">{contact.name}</h4>
                  <p className="text-2xl font-black text-rose-600 mb-4">{contact.number}</p>
                  <p className="text-xs font-bold text-slate-400 leading-relaxed mb-6">{contact.desc}</p>
                  
                  <div className="w-full py-3 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center gap-2 group-hover:bg-rose-600 group-hover:text-white transition-all">
                    <Phone size={16} fill="currentColor" />
                    <span className="font-bold uppercase tracking-wider text-sm">Call Now</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-8 rounded-[2.5rem]">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <MapPin size={16} className="text-rose-500" /> Nearby ER
              </h3>
              <div className="space-y-4">
                {nearbyHospitals.map((hosp, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{hosp.name}</p>
                      <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">{hosp.distance}</span>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{hosp.status}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                <ExternalLink size={16} />
                Open Maps
              </button>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30">
              <h3 className="text-sm font-black text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em] mb-4">First Aid Tip</h3>
              <p className="text-sm font-bold text-amber-900 dark:text-amber-200 leading-relaxed italic">
                "Stay calm. Check for breathing and pulse. Do not move an injured person unless absolutely necessary."
              </p>
            </div>
          </div>
        </div>

        {/* Footer Support */}
        <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-900">
          <p className="text-slate-400 text-sm font-medium">
            Need non-emergency help? <button className="text-blue-600 font-bold hover:underline">Contact Health Support</button>
          </p>
        </div>
      </div>
    </div>
  );
}
