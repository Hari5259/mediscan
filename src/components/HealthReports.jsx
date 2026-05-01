import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileText, Download, Eye, Search,
  Activity, Droplets, BrainCircuit, Calendar,
  CheckCircle2, AlertTriangle, Pill,
  Plus, X, Upload, Loader2, Trash2, Microscope,
  ChevronDown, ChevronRight
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
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 800);
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
      setReports([newReport, ...reports]);
      setUploading(false);
      setIsUploadOpen(false);
      setFormData({ title: '', recordType: 'Lab Report', recordDate: new Date().toISOString().split('T')[0], description: '', file: null });
    }, 1500);
  };

  const filtered = reports.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || r.recordType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      
      <main className="max-w-[1000px] mx-auto px-6 py-12 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="apple-heading mb-2">Health Reports</h1>
            <p className="apple-subheading">Your clinical history, organized and accessible.</p>
          </div>
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="apple-button apple-button-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Add Report
          </button>
        </header>

        {/* Search and Filters */}
        <div className="mb-10 space-y-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#86868B]" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports by title..."
              className="apple-input pl-14"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['All', ...recordTypes].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1D1D1F] text-white shadow-lg shadow-black/10'
                    : 'bg-white text-[#86868B] hover:bg-[#E5E5EA] border border-black/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {loading ? (
            <div className="apple-card p-20 flex flex-col items-center justify-center">
              <Loader2 size={32} className="animate-spin text-[#0071E3] mb-4" />
              <p className="text-[#86868B]">Loading your reports...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="apple-card p-20 text-center">
              <div className="w-16 h-16 bg-[#F2F2F7] rounded-full flex items-center justify-center mx-auto mb-6 text-[#86868B]">
                <FileText size={32} />
              </div>
              <h3 className="text-[20px] font-semibold mb-2">No Reports Found</h3>
              <p className="text-[#86868B]">Try adjusting your search or filters.</p>
            </div>
          ) : (
            filtered.map((report) => (
              <div
                key={report._id}
                className="apple-card overflow-hidden border border-black/5"
              >
                <button
                  onClick={() => setExpandedReport(expandedReport === report._id ? null : report._id)}
                  className="w-full p-6 flex items-center gap-6 text-left hover:bg-[#F9F9FB] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#0071E3] shrink-0">
                    <FileText size={22} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-[17px] font-semibold">{report.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        report.status === 'normal' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#EF6C00]'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[13px] text-[#86868B]">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(report.recordDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="w-1 h-1 bg-[#D2D2D7] rounded-full" />
                      <span>{report.recordType}</span>
                    </div>
                  </div>

                  <div className={`p-2 rounded-full transition-transform ${expandedReport === report._id ? 'rotate-180 bg-[#F2F2F7]' : ''}`}>
                    <ChevronDown size={20} className="text-[#86868B]" />
                  </div>
                </button>

                {expandedReport === report._id && (
                  <div className="px-6 pb-8 animate-fade-in">
                    <div className="h-[1px] bg-[#F2F2F7] mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div className="md:col-span-2">
                        <h4 className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider mb-3">Analysis Result</h4>
                        <p className="text-[16px] text-[#1D1D1F] leading-relaxed">
                          {report.description}
                        </p>
                        
                        <div className="mt-8 pt-8 border-t border-[#F2F2F7] flex gap-8">
                          <div>
                            <p className="text-[11px] text-[#86868B] uppercase font-bold mb-1">Status</p>
                            <p className="text-[14px] font-medium text-[#2E7D32] flex items-center gap-1">
                              <CheckCircle2 size={14} /> Verified
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] text-[#86868B] uppercase font-bold mb-1">Trend</p>
                            <p className="text-[14px] font-medium text-[#1D1D1F]">Stable</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full apple-button apple-button-secondary text-[14px] flex items-center justify-center gap-2">
                          <Eye size={16} /> View Full PDF
                        </button>
                        <button className="w-full apple-button bg-white border border-black/5 text-[14px] flex items-center justify-center gap-2 hover:bg-[#F2F2F7]">
                          <Download size={16} /> Download
                        </button>
                        <button className="w-full py-3 text-[14px] text-[#FF3B30] font-medium hover:bg-[#FFF2F2] rounded-full transition-all flex items-center justify-center gap-2">
                          <Trash2 size={16} /> Delete Record
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => !uploading && setIsUploadOpen(false)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-[500px] relative z-10 overflow-hidden shadow-2xl animate-fade-in">
            <div className="p-8 border-b border-[#F2F2F7] flex items-center justify-between">
              <div>
                <h3 className="text-[22px] font-semibold">Add New Report</h3>
                <p className="text-[14px] text-[#86868B]">Upload your medical records securely.</p>
              </div>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="w-10 h-10 bg-[#F2F2F7] hover:bg-[#E5E5EA] rounded-full text-[#86868B] transition-all flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold ml-1">Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Blood Work"
                  className="apple-input"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold ml-1">Type</label>
                  <select 
                    className="apple-input appearance-none cursor-pointer"
                    value={formData.recordType}
                    onChange={e => setFormData({...formData, recordType: e.target.value})}
                  >
                    {recordTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold ml-1">Date</label>
                  <input
                    type="date"
                    required
                    className="apple-input"
                    value={formData.recordDate}
                    onChange={e => setFormData({...formData, recordDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold ml-1">Notes (Optional)</label>
                <textarea
                  placeholder="Additional context..."
                  className="apple-input min-h-[100px] py-3 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <input
                    type="file"
                    required
                    onChange={e => setFormData({...formData, file: e.target.files[0]})}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="bg-[#F5F5F7] border-2 border-dashed border-[#D2D2D7] rounded-[20px] p-8 text-center group-hover:bg-[#E5E5EA] transition-all">
                    <Upload className="mx-auto text-[#86868B] mb-2" size={32} />
                    <p className="text-[14px] text-[#86868B] font-medium">
                      {formData.file ? formData.file.name : 'Tap to upload file'}
                    </p>
                    <p className="text-[11px] text-[#86868B] mt-1">PDF, JPG, or PNG (Max 10MB)</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full apple-button apple-button-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {uploading ? <Loader2 size={20} className="animate-spin" /> : 'Save Report'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
