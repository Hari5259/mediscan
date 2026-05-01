import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Download, Eye, Search,
  Activity, Droplets, Calendar,
  CheckCircle, AlertTriangle, 
  Plus, X, Upload, Loader2, Trash2, Microscope,
  ChevronDown, ChevronRight, MessageCircle, Camera, Users,
  ShieldCheck, AlertCircle
} from 'lucide-react';
import Navbar from './Navbar';

const recordTypes = [
  'X-Ray', 'CT Scan', 'Blood Test', 'ECG', 'Prescription', 
  'Lab Report', 'Ultrasound', 'MRI'
];

export default function HealthReports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedReport, setExpandedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    recordType: 'Lab Report',
    recordDate: new Date().toISOString().split('T')[0],
    description: '',
    file: null
  });

  const mockReports = [
    {
      _id: '1',
      title: 'Complete Blood Count (CBC)',
      recordType: 'Blood Test',
      recordDate: '2026-04-22',
      status: 'normal',
      description: 'Hemoglobin: 14.2 g/dL, WBC: 7,200/μL, Platelets: 250,000/μL. All values within normal range.',
      trend: 'stable',
    },
    {
      _id: '2',
      title: 'Chest X-Ray',
      recordType: 'X-Ray',
      recordDate: '2026-03-15',
      status: 'normal',
      description: 'Lungs are clear. No evidence of pneumonia or congestion.',
      trend: 'stable',
    },
    {
      _id: '3',
      title: 'Lipid Profile',
      recordType: 'Blood Test',
      recordDate: '2026-02-10',
      status: 'attention',
      description: 'Cholesterol levels are slightly elevated. LDL: 135 mg/dL. Recommended dietary changes.',
      trend: 'down',
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      const newReport = {
        _id: Date.now().toString(),
        ...formData,
        status: 'normal',
        trend: 'stable',
      };
      setReports(prev => [newReport, ...prev]);
      setUploading(false);
      setIsUploadOpen(false);
      setFormData({ title: '', recordType: 'Lab Report', recordDate: new Date().toISOString().split('T')[0], description: '', file: null });
    }, 1500);
  };

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
    { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
    { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
    { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
    { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
  ];

  const filtered = reports.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || r.recordType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="module-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`module-tab-item ${tab.id === 'health-reports' ? 'active' : ''}`}
            >
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="main-floating-card mt-4 p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8">
            <div className="radio-group">
              <label className="radio-item">
                <input type="radio" name="reportView" defaultChecked />
                <span>Clinical Records</span>
              </label>
              <label className="radio-item">
                <input type="radio" name="reportView" />
                <span>Imaging Archive</span>
              </label>
              <label className="radio-item">
                <input type="radio" name="reportView" />
                <span>Lab Summaries</span>
              </label>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group min-w-[300px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#008cff]" size={18} />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-12 pr-6 py-3 text-[14px] font-bold focus:border-[#008cff] outline-none transition-all"
                />
              </div>
              <button 
                onClick={() => setIsUploadOpen(true)}
                className="btn-search !text-[12px] px-8 py-3 flex items-center gap-2"
              >
                <Plus size={16} /> ADD RECORD
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <div className="py-32 flex flex-col items-center">
                <Loader2 size={40} className="animate-spin text-[#008cff] mb-4" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-[12px]">Retrieving Secure Dossiers...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-32 text-center bg-gray-50 rounded-[24px] border-2 border-dashed border-gray-100">
                <FileText size={48} className="mx-auto text-gray-200 mb-6" />
                <h3 className="text-[24px] font-black tracking-tight mb-2">No Records Found</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Your health archive is currently empty or filtered.</p>
              </div>
            ) : (
              filtered.map((report) => (
                <div
                  key={report._id}
                  className="section-card !p-0 overflow-hidden border-2 border-gray-100 hover:border-[#008cff] transition-all"
                >
                  <button
                    onClick={() => setExpandedReport(expandedReport === report._id ? null : report._id)}
                    className="w-full p-8 flex items-center gap-8 text-left group"
                  >
                    <div className="w-16 h-16 rounded-[16px] bg-blue-50 flex items-center justify-center text-[#008cff] shrink-0 group-hover:scale-110 transition-transform">
                      <FileText size={28} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-[20px] font-black tracking-tight group-hover:text-[#008cff] transition-colors">{report.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          report.status === 'normal' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Calendar size={14} /> {report.recordDate}</span>
                        <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                        <span>{report.recordType}</span>
                      </div>
                    </div>

                    <div className={`p-2 rounded-full transition-all ${expandedReport === report._id ? 'rotate-180 bg-blue-50 text-[#008cff]' : 'text-gray-300'}`}>
                      <ChevronDown size={24} />
                    </div>
                  </button>

                  {expandedReport === report._id && (
                    <div className="px-12 pb-10 animate-slide-up">
                      <div className="h-[1px] bg-gray-100 mb-10" />
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Clinical Insight</h4>
                          <p className="text-[16px] text-gray-700 font-bold leading-relaxed italic">
                            "{report.description}"
                          </p>
                          
                          <div className="mt-10 pt-10 border-t border-gray-50 flex gap-12">
                            <div>
                              <p className="text-[10px] font-black text-gray-300 uppercase mb-2">Verification</p>
                              <p className="text-[14px] font-black text-green-600 flex items-center gap-2 italic">
                                <CheckCircle size={16} /> CERTIFIED
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-300 uppercase mb-2">Health Trend</p>
                              <p className="text-[14px] font-black text-gray-800 uppercase italic">{report.trend?.toUpperCase() || 'STABLE'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <button className="btn-search w-full !text-[13px] py-4 flex items-center justify-center gap-3">
                            <Eye size={18} /> PREVIEW ARTIFACT
                          </button>
                          <button className="w-full py-4 border-2 border-gray-100 rounded-full text-[13px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                            <Download size={18} /> EXPORT PDF
                          </button>
                          <button className="w-full py-4 text-[13px] text-red-500 font-black uppercase tracking-widest hover:bg-red-50 rounded-full transition-all flex items-center justify-center gap-3">
                            <Trash2 size={18} /> DELETE RECORD
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => !uploading && setIsUploadOpen(false)}></div>
          <div className="main-floating-card w-full max-w-[600px] relative z-10 animate-slide-up !p-0 overflow-hidden">
            <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h3 className="text-[28px] font-black tracking-tighter italic">Upload Record</h3>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1">Add clinical artifacts to your vault</p>
              </div>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full text-gray-400 transition-all flex items-center justify-center shadow-md"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Record Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Blood Work"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                  <select 
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[14px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:border-[#008cff]"
                    value={formData.recordType}
                    onChange={e => setFormData({...formData, recordType: e.target.value})}
                  >
                    {recordTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[14px] font-black outline-none focus:border-[#008cff]"
                    value={formData.recordDate}
                    onChange={e => setFormData({...formData, recordDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Clinical Notes</label>
                <textarea
                  placeholder="Summarize the findings..."
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all min-h-[120px] resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="relative group">
                <input
                  type="file"
                  required
                  onChange={e => setFormData({...formData, file: e.target.files[0]})}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[20px] p-10 text-center group-hover:bg-blue-50 group-hover:border-[#008cff] transition-all">
                  <Upload className="mx-auto text-gray-300 mb-4 group-hover:text-[#008cff] transition-colors" size={40} />
                  <p className="text-[14px] font-black uppercase tracking-widest text-gray-500">
                    {formData.file ? formData.file.name : 'Link Artifact File'}
                  </p>
                  <p className="text-[10px] font-bold text-gray-300 mt-2 uppercase">PDF, JPG, OR PNG (MAX 10MB)</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="btn-search w-full py-5 !text-[16px] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {uploading ? <Loader2 size={24} className="animate-spin" /> : 'SECURE IN VAULT'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
