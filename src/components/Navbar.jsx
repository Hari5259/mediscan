import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Home, Search, MessageSquare, Camera, FileText, AlertCircle, User, Briefcase, Heart, Plane } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="nav-top">
      <div className="flex items-center gap-8">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Shield size={24} className="text-[#008cff]" />
          </div>
          <span className="text-white font-black text-2xl italic tracking-tighter">MEDI<span className="text-blue-400">SCAN</span></span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 border-l border-white/20 pl-6">
          <Link className="nav-link">
            <div className="p-1.5 bg-orange-500 rounded-lg"><Briefcase size={14} /></div>
            <span>Corporate Health</span>
          </Link>
          <Link className="nav-link">
            <div className="p-1.5 bg-pink-500 rounded-lg"><Heart size={14} /></div>
            <span>My Health Records</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-white/20 pr-6">
          <Link to="/dashboard" className="nav-link flex flex-col items-center">
            <Home size={18} />
            <span className="text-[10px]">Home</span>
          </Link>
          <Link to="/health-reports" className="nav-link flex flex-col items-center">
            <FileText size={18} />
            <span className="text-[10px]">Reports</span>
          </Link>
        </div>

        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg text-[12px] font-black uppercase tracking-wider flex items-center gap-2 shadow-lg">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><User size={14} /></div>
          Login or Create Account
        </button>

        <div className="flex items-center gap-2 text-white/60 text-[11px] font-bold">
          <span>INR</span>
          <div className="w-4 h-3 bg-white/20"></div>
          <span>English</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
