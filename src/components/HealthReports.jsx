import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, ArrowLeft, FileText, Download, Eye, Search,
  Activity, Droplets, BrainCircuit, Bone, Filter,
  Calendar, TrendingUp, TrendingDown, Minus, ChevronDown,
  Clock, CheckCircle2, AlertTriangle, ShieldCheck, Pill,
  Plus, X, Upload, Loader2, Trash2, Microscope
} from 'lucide-react';

// Status and Trend configs remain same
const statusConfig = {
  normal: { label: 'Normal', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: CheckCircle2, dot: 'bg-emerald-500' },
  attention: { label: 'Attention', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: AlertTriangle, dot: 'bg-amber-500' },
  critical: { label: 'Critical', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20', icon: AlertTriangle, dot: 'bg-rose-500' },
  submitted: { label: 'Syncing', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: Clock, dot: 'bg-blue-500' },
};

const trendConfig = {
  up: { icon: TrendingUp, color: 'text-amber-400', label: 'Increasing' },
  down: { icon: TrendingDown, color: 'text-blue-400', label: 'Decreasing' },
  stable: { icon: Minus, color: 'text-emerald-400', label: 'Stable' },
};

const categoryIcons = {
  'Blood Test': Droplets,
  'Imaging': BrainCircuit,
  'Vitals': Activity,
  'Endocrine': Pill,
  'X-Ray': Microscope,
  'CT Scan': Microscope,
  'ECG': Activity,
  'Prescription': Pill,
  'Lab Report': FileText,
};

const recordTypes = [
  'X-Ray', 'CT Scan', 'Blood Test', 'ECG', 'Prescription', 
  'Lab Report', 'Ultrasound', 'MRI', 'Biopsy', 'General Report'
];

export default function HealthReports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedReport, setExpandedReport] = useState(null);
  
  // Dynamic States
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Upload Form State
  const [formData, setFormData] = useState({
    title: '',
    recordType: 'Lab Report',
    recordDate: new Date().toISOString().split('T')[0],
    description: '',
    file: null
  });

  // Mock initial data
  const mockReports = [
    {
      _id: '1',
      title: 'Complete Blood Count (CBC)',
      recordType: 'Blood Test',
      recordDate: '2026-04-22',
      doctorId: { firstName: 'Sarah', lastName: 'Mitchell' },
      status: 'normal',
      description: 'All values within normal range. Hemoglobin: 14.2 g/dL, WBC: 7,200/μL, Platelets: 250,000/μL',
      trend: 'stable',
    }
  ];

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setReports(mockReports);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load reports');
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.file) return alert('Please select a file');
    
    setUploading(true);
    try {
      const newReport = {
        _id: Date.now().toString(),
        title: formData.title,
        recordType: formData.recordType,
        recordDate: formData.recordDate,
        status: 'submitted',
        description: formData.description,
        trend: 'stable',
        fileName: formData.file.name,
      };
      
      setTimeout(() => {
        setReports([newReport, ...reports]);
        setUploading(false);
        setIsUploadOpen(false);
        setFormData({
          title: '',
          recordType: 'Lab Report',
          recordDate: new Date().toISOString().split('T')[0],
          description: '',
          file: null
        });
      }, 1500);
    } catch (err) {
      alert('Upload failed');
      setUploading(false);
    }
  };

  const filtered = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.doctorId ? `${r.doctorId.firstName} ${r.doctorId.lastName}`.toLowerCase().includes(search.toLowerCase()) : false);
    const matchesCategory = selectedCategory === 'All' || r.recordType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const summaryStats = {
    total: reports.length,
    normal: reports.filter((r) => r.status === 'normal').length,
    attention: reports.filter((r) => r.status === 'attention').length,
    critical: reports.filter((r) => r.status === 'critical').length,
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background HUD elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Cyber Nav */}
      <nav className="bg-black/40 backdrop-blur-3xl sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 text-cyan-400 shadow-2xl"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic">
                Health <span className="text-cyan-400">Dossier</span>
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Encryption</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="px-6 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Upload Record</span>
            </button>
            <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-2">
              <Download size={14} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full space-y-12">
        {/* Page Title & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-indigo-500 rounded-full shadow-[0_0_15px_#6366f1]"></div>
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Diagnostic Archives</h2>
            </div>
            <p className="text-slate-500 font-medium text-sm uppercase tracking-widest max-w-lg">
              Authorized clinical repository. All data synchronized with MediScan Core Engine.
            </p>
          </div>
          
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH ARCHIVES..."
              className="w-full pl-16 pr-8 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/30 transition-all font-black text-[10px] tracking-widest text-white outline-none uppercase placeholder:text-slate-700"
            />
          </div>
        </div>

        {/* Summary Stats - HUD Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Total Dossiers', val: summaryStats.total, color: 'text-white', border: 'border-white/10' },
            { label: 'Optimal Status', val: summaryStats.normal, color: 'text-emerald-400', border: 'border-emerald-500/20' },
            { label: 'Review Required', val: summaryStats.attention, color: 'text-amber-400', border: 'border-amber-500/20' },
            { label: 'Critical Action', val: summaryStats.critical, color: 'text-rose-400', border: 'border-rose-500/20' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white/[0.02] border ${stat.border} p-8 rounded-[2.5rem] shadow-2xl group hover:bg-white/[0.04] transition-all`}>
              <p className={`text-4xl font-black ${stat.color} tracking-tighter italic`}>{stat.val}</p>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar border-b border-white/5">
          <Filter size={16} className="text-slate-600 flex-shrink-0" />
          <div className="flex gap-3">
            {['All', ...recordTypes].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List - High Tech Rows */}
        <div className="space-y-6 pb-20">
          {loading ? (
            <div className="bg-white/[0.02] border border-white/5 p-24 rounded-[3.5rem] flex flex-col items-center justify-center text-slate-600">
              <Loader2 size={40} className="animate-spin mb-6 text-cyan-500" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Synchronizing Neural Archive...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/5 p-24 rounded-[3.5rem] text-center">
              <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <FileText size={32} className="text-slate-800" />
              </div>
              <p className="text-2xl font-black text-white uppercase italic tracking-tighter">Zero Match Found</p>
              <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-4">No diagnostic records detected in current vector.</p>
            </div>
          ) : (
            filtered.map((report) => {
              const status = statusConfig[report.status] || statusConfig.submitted;
              const trend = trendConfig[report.trend] || trendConfig.stable;
              const TrendIcon = trend.icon;
              const StatusIcon = status.icon;
              const CategoryIcon = categoryIcons[report.recordType] || FileText;
              const isExpanded = expandedReport === report._id;

              return (
                <div
                  key={report._id}
                  className={`group relative rounded-[2.5rem] bg-[#080808] border border-white/5 overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'border-white/20 bg-[#0c0c0c] shadow-2xl' : 'hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setExpandedReport(isExpanded ? null : report._id)}
                    className="w-full p-8 flex items-center gap-8 text-left"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${isExpanded ? 'bg-cyan-500 text-black rotate-12' : 'bg-white/5 text-slate-500 group-hover:text-cyan-400 border border-white/5'}`}>
                      <CategoryIcon size={24} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">{report.title}</h3>
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${status.color}`}>
                          <StatusIcon size={12} />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-700" />
                          {new Date(report.recordDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                        <span className="italic">
                          {report.doctorId ? `ID: PRO-${report.doctorId.firstName[0]}${report.doctorId.lastName[0]}` : 'AUTO-GEN'}
                        </span>
                        {report.trend && (
                          <>
                            <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                            <span className="flex items-center gap-2">
                              <TrendIcon size={14} className={trend.color} />
                              <span className={trend.color}>{trend.label}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="hidden lg:inline-block px-4 py-1.5 bg-white/5 text-slate-600 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border border-white/5">
                        {report.recordType}
                      </span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isExpanded ? 'bg-white text-black -rotate-180' : 'bg-white/5 text-slate-700'}`}>
                        <ChevronDown size={20} />
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-8 pb-10 border-t border-white/5 animate-in slide-in-from-top-4 duration-500">
                      <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-8 space-y-8">
                          <div>
                            <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">Neural Analysis Summary</h4>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                              "{report.description || 'No diagnostic intelligence available for this record.'}"
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                            <div>
                              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Source Authentication</p>
                              <p className="text-xs font-bold text-slate-300">Biometric Verified</p>
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Sync Latency</p>
                              <p className="text-xs font-bold text-emerald-500">0ms [Offline Mode]</p>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-4 space-y-4">
                          <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6">Archive Operations</h4>
                          <button className="w-full flex items-center justify-center gap-3 p-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-2xl active:scale-95">
                            <Eye size={16} /> Open Dossier
                          </button>
                          <button className="w-full flex items-center justify-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Download size={16} /> Export Data
                          </button>
                          <button className="w-full flex items-center justify-center gap-3 p-4 bg-rose-500/5 text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500/10 transition-all mt-4">
                            <Trash2 size={16} /> Purge Record
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Upload Modal - Cyber Style */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => !uploading && setIsUploadOpen(false)}></div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[3.5rem] w-full max-w-xl relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="p-10 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Archive Record</h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Initialize New Clinical Node</p>
              </div>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Dossier Title</label>
                <input
                  type="text"
                  required
                  placeholder="E.G. NEURAL PANEL 2026"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white placeholder:text-slate-800 focus:outline-none focus:border-cyan-500/30 transition-all"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Vector Type</label>
                  <select 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-black text-white focus:outline-none focus:border-cyan-500/30 transition-all appearance-none cursor-pointer uppercase"
                    value={formData.recordType}
                    onChange={e => setFormData({...formData, recordType: e.target.value})}
                  >
                    {recordTypes.map(t => <option key={t} value={t} className="bg-black">{t}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Record Date</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-black text-white focus:outline-none focus:border-cyan-500/30 transition-all uppercase"
                    value={formData.recordDate}
                    onChange={e => setFormData({...formData, recordDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Neural Notes</label>
                <textarea
                  placeholder="INPUT OBSERVATIONS..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-white placeholder:text-slate-800 focus:outline-none focus:border-cyan-500/30 transition-all min-h-[120px] resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Data Attachment</label>
                <div className="relative group">
                  <input
                    type="file"
                    required
                    onChange={e => setFormData({...formData, file: e.target.files[0]})}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="bg-white/[0.02] border-2 border-dashed border-white/5 rounded-[2rem] p-10 text-center group-hover:border-cyan-500/30 transition-all">
                    <Upload className="mx-auto text-slate-700 group-hover:text-cyan-400 mb-4" size={40} />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {formData.file ? formData.file.name : 'Drop Source File'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-white text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Synchronizing...</span>
                  </>
                ) : (
                  <>
                    <span>Archive Dossier</span>
                    <Plus size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
