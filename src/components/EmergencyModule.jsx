import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, AlertTriangle, ChevronLeft, Heart, 
  MapPin, ShieldAlert, Ambulance, LifeBuoy,
  ChevronRight, ExternalLink, Info, Activity,
  Zap, Shield
} from 'lucide-react';
import Navbar from './Navbar';

export default function EmergencyModule() {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: null, lng: null, address: 'Scanning Coordinates...', error: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6),
            address: 'Sector Detected: Bengaluru, India',
            error: null
          });
        },
        (error) => {
          setLocation(prev => ({ ...prev, error: 'GPS Access Denied', address: 'Location Masked' }));
        }
      );
    }
  }, []);

  const emergencyContacts = [
    { name: 'National Protocol', number: '112', icon: ShieldAlert, color: 'bg-red-600', desc: 'Universal emergency nexus.' },
    { name: 'Medical Rescue', number: '102', icon: Ambulance, color: 'bg-emerald-600', desc: 'Rapid medical extraction.' },
    { name: 'Public Safety', number: '100', icon: Shield, color: 'bg-blue-600', desc: 'Police & law enforcement.' },
    { name: 'Fire Response', number: '101', icon: AlertTriangle, color: 'bg-orange-600', desc: 'Thermal hazard suppression.' }
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-12 mt-4 overflow-hidden">
          {/* Emergency Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 border-b border-gray-100 pb-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-red-600 rounded-[20px] flex items-center justify-center text-white shadow-2xl shadow-red-200 animate-pulse">
                <ShieldAlert size={40} />
              </div>
              <div>
                <h1 className="text-[42px] font-black tracking-tighter leading-tight">Crisis Protocol</h1>
                <p className="text-[14px] font-bold text-red-500 uppercase tracking-widest mt-1">High Priority Emergency Node</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Response Signal</span>
              <div className="flex items-center gap-2 px-6 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-[12px] font-black text-emerald-700">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Tactical Dialing */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-[14px] font-black text-gray-400 uppercase tracking-widest italic ml-1">Tactical Dialing Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {emergencyContacts.map((contact, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCall(contact.number)}
                    className="section-card !p-8 group hover:border-red-500 hover:bg-red-50/30"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className={`${contact.color} w-14 h-14 rounded-[14px] flex items-center justify-center text-white shadow-xl`}>
                        <contact.icon size={28} />
                      </div>
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-red-600 group-hover:text-white transition-all">
                        <Phone size={18} />
                      </div>
                    </div>
                    <span className="text-[14px] font-black text-gray-400 uppercase tracking-tight mb-1 block">{contact.name}</span>
                    <p className="text-[42px] font-black text-red-600 italic tracking-tighter mb-4">{contact.number}</p>
                    <p className="text-[11px] font-bold text-gray-500 uppercase leading-relaxed">{contact.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Location & Intel */}
            <div className="space-y-10">
              <div className="bg-gray-50 p-8 rounded-[24px] border-2 border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <MapPin className="text-red-500" size={24} />
                  <h3 className="text-[16px] font-black uppercase tracking-widest italic">Location Node</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase mb-2">Current Coordinates</p>
                    <div className="flex gap-4">
                      <div className="flex-1 bg-white p-3 rounded-[10px] border border-gray-200">
                        <span className="text-[10px] font-black text-gray-300 block mb-1 uppercase">Lat</span>
                        <span className="text-[16px] font-black italic">{location.lat || '---'}</span>
                      </div>
                      <div className="flex-1 bg-white p-3 rounded-[10px] border border-gray-200">
                        <span className="text-[10px] font-black text-gray-300 block mb-1 uppercase">Lng</span>
                        <span className="text-[16px] font-black italic">{location.lng || '---'}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase mb-2">Verified Address</p>
                    <p className="text-[18px] font-black text-gray-800 uppercase italic leading-tight">{location.address}</p>
                  </div>
                  <button className="w-full btn-search !bg-gradient-to-r !from-gray-800 !to-black !text-[12px] py-4 shadow-none">
                    TRANSMIT COORDINATES
                  </button>
                </div>
              </div>

              <div className="bg-orange-50 p-8 rounded-[24px] border-2 border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="text-orange-500" size={20} />
                  <h3 className="text-[12px] font-black text-orange-700 uppercase tracking-widest">Tactical Briefing</h3>
                </div>
                <p className="text-[14px] font-bold text-orange-900 leading-relaxed italic uppercase">
                  "Maintain composure. Verify vital signs. Do not relocate trauma patients unless environmental threat is critical."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
