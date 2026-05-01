import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronLeft, Lock, Mail, CheckCircle, ShieldCheck } from 'lucide-react';
import Navbar from './Navbar';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="main-floating-card p-12 mt-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-[42px] font-black tracking-tighter leading-tight">Privacy Vault</h1>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Biometric Data Protection & Neural Security</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[12px] font-black uppercase text-[#008cff] hover:underline"
            >
              <ChevronLeft size={16} /> Return to Sector
            </button>
          </div>

          <div className="space-y-12">
            <section className="bg-blue-50/50 p-8 rounded-[12px] border border-blue-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-8 bg-[#008cff] rounded-full" />
                <h2 className="text-[20px] font-black uppercase italic">1. Security Mandate</h2>
              </div>
              <p className="text-[16px] text-gray-600 font-medium leading-relaxed italic">
                MediScan is engineered for absolute biometric confidentiality. This mandate outlines how your clinical data, diagnostic history, and personal identifiers are encrypted, stored, and protected within the neural vault.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-8 bg-[#008cff] rounded-full" />
                <h2 className="text-[20px] font-black uppercase italic">2. Data Extraction</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="section-card border rounded-[16px] p-8">
                  <h3 className="text-[11px] font-black text-[#008cff] uppercase tracking-widest mb-6">Identity Vectors</h3>
                  <ul className="space-y-4">
                    {['Personal Identifiers', 'Biometric Coordinates', 'Neural Access History', 'Financial Metadata'].map((item, i) => (
                      <li key={i} className="text-[14px] font-bold text-gray-700 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[#008cff] rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="section-card border rounded-[16px] p-8">
                  <h3 className="text-[11px] font-black text-indigo-500 uppercase tracking-widest mb-6">Clinical Vectors</h3>
                  <ul className="space-y-4">
                    {['Diagnostic History', 'Molecular Scan Results', 'Consultation Logs', 'Vital Baseline Data'].map((item, i) => (
                      <li key={i} className="text-[14px] font-bold text-gray-700 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 text-white p-10 rounded-[12px] flex flex-col md:flex-row items-center gap-10 shadow-2xl">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-[#008cff] shrink-0">
                <ShieldCheck size={40} />
              </div>
              <div>
                <h3 className="text-[18px] font-black uppercase mb-2">3. Encryption Protocol</h3>
                <p className="text-[13px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">
                  ALL NEURAL DATA IS ENCRYPTED VIA AES-256 QUANTUM-RESISTANT ALGORITHMS. DATA IS SHARDED ACROSS SECURE NODES WITH ZERO-KNOWLEDGE ARCHITECTURE.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-16 flex flex-col md:flex-row gap-6">
            <button
              onClick={() => navigate('/signup')}
              className="flex-1 btn-search !text-[16px] py-4"
            >
              I UNDERSTAND
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-4 border-2 border-gray-200 rounded-full text-[14px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
            >
              SECTOR RETURN
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
