import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Home, Search, MessageSquare, Camera, FileText, AlertCircle, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/symptom-checker', icon: Search, label: 'Scan' },
    { path: '/chatbot', icon: MessageSquare, label: 'Chat' },
    { path: '/medicine-scanner', icon: Camera, label: 'Camera' },
    { path: '/health-reports', icon: FileText, label: 'Report' },
  ];

  return (
    <nav className="nav-blur h-[64px] flex items-center justify-center px-4 md:px-8">
      <div className="max-w-[1200px] w-full flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#0071E3] rounded-[8px] flex items-center justify-center transition-transform group-active:scale-95">
            <Shield size={18} className="text-white" />
          </div>
          <span className="font-semibold text-[19px] tracking-tight hidden sm:block">MediScan</span>
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`p-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  isActive 
                    ? 'bg-[#F2F2F7] text-[#0071E3]' 
                    : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
                }`}
              >
                <Icon size={20} />
                <span className={`text-[14px] font-medium hidden lg:block ${isActive ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/emergency" className="p-2.5 text-[#FF3B30] hover:bg-[#FFF2F2] rounded-full transition-all">
            <AlertCircle size={20} />
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#86868B] cursor-pointer hover:bg-[#E5E5EA] transition-all">
            <User size={18} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
