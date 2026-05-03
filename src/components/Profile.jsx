import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Shield, Save, Camera, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@abdm',
    phone: '+91 98765 43210',
    location: 'Bengaluru, KA, India'
  });

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card max-w-[800px] mx-auto p-12 mt-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-[42px] font-black tracking-tighter leading-tight">Identity Core</h1>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Manage Biological & Digital Profile</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-[#008cff] hover:underline"
            >
              <ArrowLeft size={16} /> Dashboard
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            <div className="flex items-center gap-8 pb-8 border-b border-gray-100">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  <User size={48} className="text-gray-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-0 right-0 bg-[#008cff] p-2 rounded-full text-white shadow-md hover:bg-blue-600 transition-colors">
                  <Camera size={14} />
                </div>
              </div>
              <div>
                <h3 className="text-[24px] font-extrabold">{formData.firstName} {formData.lastName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    <Shield size={12} /> Verified ABHA: {formData.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Given Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-12 pr-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Surname</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-12 pr-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Communication Link</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-12 pr-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Channel</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-12 pr-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Physical Sector</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-12 pr-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-search !text-[16px] py-4 mt-8 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={20} />
                  <span>SYNCHRONIZE PROFILE</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
