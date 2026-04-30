import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, AlertTriangle, ArrowLeft, Heart, 
  MapPin, ShieldAlert, Ambulance, LifeBuoy,
  ChevronRight, ExternalLink, Info
} from 'lucide-react';

export default function EmergencyModule() {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: null, lng: null, address: 'SCANNING COORDINATES...', error: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6),
            address: 'SECTOR-7 COORDINATES DETECTED',
            error: null
          });
        },
        (error) => {
          setLocation(prev => ({ ...prev, error: 'SIGNAL INTERCEPTED', address: 'LOCATION MASKED' }));
        }
      );
    } else {
      setLocation(prev => ({ ...prev, error: 'NODE NOT SUPPORTED', address: 'VOID' }));
    }
  }, []);

  const emergencyContacts = [
    { 
      name: 'Integrated Protocol', 
      number: '112', 
      icon: ShieldAlert, 
      color: 'bg-rose-600 shadow-[0_0_20px_rgba(225,29,72,0.4)]', 
      desc: 'PRIMARY EMERGENCY NEXUS. UNIVERSAL ACCESS.' 
    },
    { 
      name: 'Police Nexus', 
      number: '100', 
      icon: ShieldAlert, 
      color: 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]', 
      desc: 'PUBLIC SAFETY & LAW ENFORCEMENT NODE.' 
    },
    { 
      name: 'Ambulance Core', 
      number: '102', 
      icon: Ambulance, 
      color: 'bg-emerald-600 shadow-[0_0_20px_rgba(5,150,105,0.4)]', 
      desc: 'RAPID MEDICAL EXTRACTION & ER SUPPORT.' 
    },
    { 
      name: 'Fire Suppression', 
      number: '101', 
      icon: AlertTriangle, 
      color: 'bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.4)]', 
      desc: 'THERMAL RESCUE & HAZARD SUPPRESSION.' 
    }
  ];

  const nearbyHospitals = [
    { name: 'City Central Core', distance: '1.2 KM', status: 'OPERATIONAL' },
    { name: 'St. Mary Medical Node', distance: '2.5 KM', status: 'CAPACITY WARNING' },
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-rose-500/30 flex flex-col items-center p-6 md:p-12 relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-600/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* HUD Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/[0.03] to-transparent animate-scan"></div>
      </div>

      <div className="w-full max-w-5xl space-y-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 text-rose-500 shadow-2xl"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-5">
            <div className="bg-rose-600 p-4 rounded-2xl shadow-[0_0_30px_rgba(225,29,72,0.4)] animate-pulse">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
                Crisis <span className="text-rose-600">Protocol</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Node Priority: Alpha</span>
              </div>
            </div>
          </div>
          <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-slate-800">
             <LifeBuoy size={24} className="animate-spin-slow" />
          </div>
        </div>

        {/* Crisis Banner */}
        <div className="bg-rose-600/10 border border-rose-500/30 text-white p-10 rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className="p-6 bg-rose-600 rounded-[2rem] shadow-[0_0_40px_rgba(225,29,72,0.5)]">
            <AlertTriangle size={48} className="text-white" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Immediate Response Required</h2>
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] leading-relaxed max-w-xl">
              DANGER: IF YOU ARE IN A LIFE-THREATENING SITUATION, TERMINATE APP AND DIAL LOCAL EMERGENCY CHANNELS IMMEDIATELY.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 px-8 py-4 rounded-3xl">
            <span className="text-[8px] font-black text-rose-500 uppercase tracking-[0.4em] mb-1">Signal</span>
            <span className="text-xs font-black tracking-widest uppercase italic">ACTIVE</span>
          </div>
        </div>

        {/* Location Protocol Display */}
        <div className="bg-[#080808] border border-white/5 p-10 rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-white/5 text-rose-500 rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl">
              <MapPin size={32} />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-3">Biometric Location Node</h3>
              <p className="text-2xl font-black text-white italic tracking-tighter uppercase">
                {location.error ? (
                  <span className="text-rose-500 flex items-center gap-3">
                    <ShieldAlert size={20} /> ENCRYPTED
                  </span>
                ) : (
                  location.address
                )}
              </p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="px-8 py-5 bg-white/5 border border-white/5 rounded-3xl">
              <span className="text-[8px] font-black text-slate-600 uppercase block tracking-[0.3em] mb-2">LAT</span>
              <span className="text-lg font-black text-white italic tracking-tighter font-mono">{location.lat || '---'}</span>
            </div>
            <div className="px-8 py-5 bg-white/5 border border-white/5 rounded-3xl">
              <span className="text-[8px] font-black text-slate-600 uppercase block tracking-[0.3em] mb-2">LNG</span>
              <span className="text-lg font-black text-white italic tracking-tighter font-mono">{location.lng || '---'}</span>
            </div>
          </div>

          <button 
            className="w-full lg:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-rose-500 transition-all shadow-2xl active:scale-95"
            onClick={() => {
              navigator.clipboard.writeText(`SECTOR DETECTED: LAT ${location.lat}, LNG ${location.lng}`);
              alert('COORDINATES SAVED TO BUFFER');
            }}
            disabled={location.error}
          >
            <ExternalLink size={20} />
            Transmit DATA
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Emergency Numbers */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-6 italic">Tactical Dialing Matrix</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {emergencyContacts.map((contact, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCall(contact.number)}
                  className="bg-[#080808] border border-white/5 p-10 rounded-[3.5rem] text-left hover:border-rose-500/50 group transition-all duration-500 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center justify-between mb-8">
                    <div className={`${contact.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white`}>
                      <contact.icon size={32} />
                    </div>
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all group-hover:scale-110">
                      <Phone size={20} />
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-slate-400 uppercase tracking-tighter mb-2 group-hover:text-white transition-colors">{contact.name}</h4>
                  <p className="text-5xl font-black text-rose-600 italic tracking-tighter mb-6 group-hover:scale-110 origin-left transition-transform">{contact.number}</p>
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] leading-relaxed mb-10">{contact.desc}</p>
                  
                  <div className="w-full py-5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center gap-3 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-inner uppercase font-black text-[10px] tracking-[0.4em] italic">
                    <Phone size={18} fill="currentColor" />
                    Initialize Link
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Info - HUD Panel */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-[#080808] border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent animate-scan pointer-events-none"></div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
                <MapPin size={16} className="text-rose-500" /> Proximity Nodes
              </h3>
              <div className="space-y-6">
                {nearbyHospitals.map((hosp, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <p className="font-black text-white text-sm uppercase italic">{hosp.name}</p>
                      <span className="text-[8px] font-black text-rose-600 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">{hosp.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${hosp.status.includes('WARNING') ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`}></div>
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{hosp.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all">
                <ExternalLink size={20} />
                Open NAVIGATION
              </button>
            </div>

            <div className="p-10 rounded-[3.5rem] bg-amber-500/5 border border-amber-500/20 shadow-2xl relative group">
              <div className="absolute top-4 right-6 text-amber-500 opacity-20">
                <Info size={40} />
              </div>
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-6 italic">Tactical Briefing</h3>
              <p className="text-sm font-black text-slate-400 leading-relaxed italic uppercase">
                "MAINTAIN COMPOSURE. VERIFY VITAL SIGNS. DO NOT RELOCATE TRAUMA PATIENTS UNLESS ENVIRONMENTAL THREAT IS CRITICAL."
              </p>
            </div>
          </div>
        </div>

        {/* Footer Support */}
        <div className="text-center pt-12 border-t border-white/5">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
            NON-CRITICAL ASSISTANCE REQUIRED? <button className="text-rose-500 hover:text-rose-400 transition-colors">INITIALIZE SUPPORT LINK</button>
          </p>
        </div>
      </div>
    </div>
  );
}
