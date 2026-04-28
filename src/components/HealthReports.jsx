import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, ArrowLeft, FileText, Download, Eye, Search,
  Activity, Droplets, BrainCircuit, Bone, Filter,
  Calendar, TrendingUp, TrendingDown, Minus, ChevronDown,
  Clock, CheckCircle2, AlertTriangle, ShieldCheck, Pill,
  Plus, X, Upload, Loader2, Trash2
} from 'lucide-react';

// Status and Trend configs remain same
const statusConfig = {
  normal: { label: 'Normal', color: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: CheckCircle2, dot: 'bg-emerald-500' },
  attention: { label: 'Needs Attention', color: 'bg-amber-50 text-amber-600 border-amber-200', icon: AlertTriangle, dot: 'bg-amber-500' },
  critical: { label: 'Action Required', color: 'bg-red-50 text-red-600 border-red-200', icon: AlertTriangle, dot: 'bg-red-500' },
  submitted: { label: 'Submitted', color: 'bg-blue-50 text-blue-600 border-blue-200', icon: Clock, dot: 'bg-blue-500' },
};

const trendConfig = {
  up: { icon: TrendingUp, color: 'text-amber-500', label: 'Increasing' },
  down: { icon: TrendingDown, color: 'text-blue-500', label: 'Decreasing' },
  stable: { icon: Minus, color: 'text-emerald-500', label: 'Stable' },
};

const categoryIcons = {
  'Blood Test': Droplets,
  'Imaging': BrainCircuit,
  'Vitals': Activity,
  'Endocrine': Pill,
  'X-Ray': BrainCircuit,
  'CT Scan': BrainCircuit,
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

  // Mock initial data if backend fails or is empty
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
      // In a real app, we'd fetch from API
      // const response = await fetch('/api/medical-records/patient', {
      //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      // });
      // const data = await response.json();
      // if (data.success) setReports(data.data);
      
      // For now, simulate a delay and use mock data combined with local storage if any
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
      // Simulate upload
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <ArrowLeft size={22} />
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Medi<span className="text-blue-600">Scan</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="btn-primary flex items-center gap-2 text-sm !py-2.5 !px-5"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Upload Report</span>
            </button>
            <button className="btn-secondary flex items-center gap-2 text-sm !py-2.5 !px-5">
              <Download size={16} />
              <span className="hidden sm:inline">Export All</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
              <FileText className="text-indigo-600" size={32} />
              Health Reports
            </h2>
            <p className="text-slate-500 font-medium">
              Your complete medical history and diagnostic reports in one place.
            </p>
          </div>
          
          {/* Filters Row - Integrated with title for better layout */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="input-field pl-11 !py-2.5"
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="card p-6 group hover:-translate-y-1 transition-all duration-300 border-l-4 border-blue-500">
            <p className="text-3xl font-black text-slate-900">{summaryStats.total}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Total Reports</p>
          </div>
          <div className="card p-6 group hover:-translate-y-1 transition-all duration-300 border-l-4 border-emerald-500">
            <p className="text-3xl font-black text-emerald-600">{summaryStats.normal}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Normal</p>
          </div>
          <div className="card p-6 group hover:-translate-y-1 transition-all duration-300 border-l-4 border-amber-500">
            <p className="text-3xl font-black text-amber-600">{summaryStats.attention}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Attention</p>
          </div>
          <div className="card p-6 group hover:-translate-y-1 transition-all duration-300 border-l-4 border-red-500">
            <p className="text-3xl font-black text-red-600">{summaryStats.critical}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Action Needed</p>
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <Filter size={16} className="text-slate-400 flex-shrink-0 mr-2" />
          {['All', ...recordTypes].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {loading ? (
            <div className="card p-20 flex flex-col items-center justify-center text-slate-400">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="font-bold">Analyzing your health records...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="card p-16 text-center">
              <FileText size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-lg font-bold text-slate-400">No reports found</p>
              <p className="text-sm text-slate-300 mt-1">Try adjusting your search or filter criteria.</p>
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
                  className={`card transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 ${
                    isExpanded ? 'ring-2 ring-blue-100 bg-blue-50/10' : ''
                  }`}
                >
                  {/* Report Header Row */}
                  <button
                    onClick={() => setExpandedReport(isExpanded ? null : report._id)}
                    className="w-full p-5 sm:p-6 flex items-center gap-5 text-left"
                  >
                    {/* Category Icon */}
                    <div className="hidden sm:flex w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl items-center justify-center flex-shrink-0">
                      <CategoryIcon size={20} />
                    </div>

                    {/* Title & Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base font-bold text-slate-900 truncate">{report.title}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase border ${status.color}`}>
                          <StatusIcon size={10} />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[12px] text-slate-400 font-bold">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {new Date(report.recordDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">
                          {report.doctorId ? `Dr. ${report.doctorId.firstName} ${report.doctorId.lastName}` : 'Self Uploaded'}
                        </span>
                        {report.trend && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:flex items-center gap-1">
                              <TrendIcon size={12} className={trend.color} />
                              <span className={trend.color}>{trend.label}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Category Badge + Expand */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="hidden lg:inline-block px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase">
                        {report.recordType}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-300 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 border-t border-slate-100">
                      <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Summary */}
                        <div className="md:col-span-2">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Clinical Summary</h4>
                          <p className="text-slate-600 text-sm leading-relaxed">{report.description || 'No detailed summary provided.'}</p>
                          <div className="mt-6 flex items-center gap-3 text-[11px] text-slate-400 font-bold">
                            <Clock size={12} />
                            <span>Record Date: {new Date(report.recordDate).toDateString()}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Actions</h4>
                          <button className="w-full btn-primary flex items-center justify-center gap-2 !text-xs !py-2.5">
                            <Eye size={14} />
                            View Full Report
                          </button>
                          <button className="w-full btn-secondary flex items-center justify-center gap-2 !text-xs !py-2.5">
                            <Download size={14} />
                            Download PDF
                          </button>
                          <button className="w-full flex items-center justify-center gap-2 text-xs py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold">
                            <Trash2 size={14} />
                            Remove Record
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

        {/* Health Trend Overview Section Remains Similar but simplified for cleaner look */}
        {!loading && reports.length > 0 && (
          <div className="mt-12 card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="text-blue-600" size={24} />
                Health Insights
              </h3>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Updated Today</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Circular Metrics simplified */}
              {[
                { label: 'Blood Work', score: 85, color: 'emerald', status: 'Excellent' },
                { label: 'Cardiovascular', score: 72, color: 'amber', status: 'Monitor' },
                { label: 'Metabolic', score: 91, color: 'indigo', status: 'Stable' }
              ].map((metric, i) => (
                <div key={i} className="text-center group">
                   <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                      <circle
                        cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="10"
                        strokeDasharray={`${metric.score * 2.64} 264`}
                        strokeLinecap="round"
                        className={`transition-all duration-1000 text-${metric.color}-500`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-black text-slate-900">{metric.score}%</span>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{metric.label}</p>
                  <p className={`text-[10px] font-black uppercase tracking-wider mt-1 text-${metric.color}-500`}>{metric.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !uploading && setIsUploadOpen(false)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-transparent">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Upload Report</h3>
                <p className="text-slate-500 text-sm font-medium">Add a new medical record to your profile</p>
              </div>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Blood Panel"
                  className="input-field"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Type</label>
                  <select 
                    className="input-field cursor-pointer"
                    value={formData.recordType}
                    onChange={e => setFormData({...formData, recordType: e.target.value})}
                  >
                    {recordTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Date</label>
                  <input
                    type="date"
                    required
                    className="input-field"
                    value={formData.recordDate}
                    onChange={e => setFormData({...formData, recordDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Notes (Optional)</label>
                <textarea
                  placeholder="Any specific observations..."
                  className="input-field min-h-[100px] py-3 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">File Attachment</label>
                <div className="relative group">
                  <input
                    type="file"
                    required
                    onChange={e => setFormData({...formData, file: e.target.files[0]})}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center group-hover:border-blue-400 group-hover:bg-blue-50/50 transition-all">
                    <Upload className="mx-auto text-slate-300 group-hover:text-blue-500 mb-2" size={32} />
                    <p className="text-sm font-bold text-slate-500">
                      {formData.file ? formData.file.name : 'Click or drag to upload'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="btn-primary w-full py-4 mt-4 flex items-center justify-center gap-2 group shadow-xl shadow-blue-100"
              >
                {uploading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Uploading Record...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Upload</span>
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
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
