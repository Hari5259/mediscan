import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Home, Search, MessageSquare, Camera, FileText, AlertCircle, User, Briefcase, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav-top">
      <div className="flex items-center gap-8">
        <Link to={user?.userType === 'doctor' ? '/doctor-dashboard' : '/dashboard'} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Shield size={24} className="text-[#008cff]" />
          </div>
          <span className="text-white font-black text-2xl italic tracking-tighter">MEDI<span className="text-blue-400">SCAN</span></span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 border-l border-white/20 pl-6">
          <Link to="/emergency" className="nav-link">
            <div className="p-1.5 bg-orange-500 rounded-lg"><Briefcase size={14} /></div>
            <span>Corporate Health</span>
          </Link>
          <Link to="/health-reports" className="nav-link">
            <div className="p-1.5 bg-pink-500 rounded-lg"><Heart size={14} /></div>
            <span>My Health Records</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-white/20 pr-6">
          <Link to={user?.userType === 'doctor' ? '/doctor-dashboard' : '/dashboard'} className="nav-link flex flex-col items-center">
            <Home size={18} />
            <span className="text-[10px]">Home</span>
          </Link>
          <Link to="/health-reports" className="nav-link flex flex-col items-center">
            <FileText size={18} />
            <span className="text-[10px]">Reports</span>
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-[12px] shadow-lg group-hover:scale-110 transition-all">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-white text-[11px] font-black uppercase tracking-wider leading-none">
                  {user.userType === 'doctor' ? 'Dr.' : ''} {user.firstName}
                </p>
                <p className="text-blue-400 text-[9px] font-bold uppercase tracking-widest">{user.userType}</p>
              </div>
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2.5 bg-white/10 hover:bg-rose-500/20 text-white/60 hover:text-rose-400 rounded-xl transition-all"
              title="Logout session"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg text-[12px] font-black uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><User size={14} /></div>
            Login or Create Account
          </Link>
        )}

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
