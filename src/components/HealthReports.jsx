import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, ArrowLeft, FileText, Download, Eye, Search,
  Activity, Droplets, BrainCircuit, Bone, Filter,
  Calendar, TrendingUp, TrendingDown, Minus, ChevronDown,
  Clock, CheckCircle2, AlertTriangle, ShieldCheck, Pill
} from 'lucide-react';

const reportsData = [
  {
    id: 1,
    title: 'Complete Blood Count (CBC)',
    category: 'Blood Work',
    date: 'Apr 22, 2026',
    doctor: 'Dr. Sarah Mitchell',
    status: 'normal',
    summary: 'All values within normal range. Hemoglobin: 14.2 g/dL, WBC: 7,200/μL, Platelets: 250,000/μL',
    trend: 'stable',
  },
  {
    id: 2,
    title: 'Lipid Profile Panel',
    category: 'Blood Work',
    date: 'Apr 18, 2026',
    doctor: 'Dr. Sarah Mitchell',
    status: 'attention',
    summary: 'LDL slightly elevated at 142 mg/dL. HDL: 55 mg/dL, Total Cholesterol: 215 mg/dL',
    trend: 'up',
  },
  {
    id: 3,
    title: 'Chest X-Ray',
    category: 'Imaging',
    date: 'Apr 10, 2026',
    doctor: 'Dr. James Carter',
    status: 'normal',
    summary: 'Clear lung fields. No consolidation, effusion, or masses detected. Heart size normal.',
    trend: 'stable',
  },
  {
    id: 4,
    title: 'Thyroid Function Test',
    category: 'Endocrine',
    date: 'Mar 28, 2026',
    doctor: 'Dr. Priya Sharma',
    status: 'normal',
    summary: 'TSH: 2.4 mIU/L (normal). Free T4: 1.1 ng/dL. No thyroid dysfunction detected.',
    trend: 'stable',
  },
  {
    id: 5,
    title: 'Blood Pressure Monitoring',
    category: 'Vitals',
    date: 'Mar 25, 2026',
    doctor: 'Dr. Michael Chen',
    status: 'attention',
    summary: 'Average reading: 138/88 mmHg. Slightly above optimal range. Lifestyle modifications recommended.',
    trend: 'up',
  },
  {
    id: 6,
    title: 'HbA1c (Glycated Hemoglobin)',
    category: 'Blood Work',
    date: 'Mar 15, 2026',
    doctor: 'Dr. Sarah Mitchell',
    status: 'normal',
    summary: 'HbA1c: 5.4% — well within normal range. No signs of pre-diabetes.',
    trend: 'down',
  },
  {
    id: 7,
    title: 'Bone Density Scan (DEXA)',
    category: 'Imaging',
    date: 'Feb 20, 2026',
    doctor: 'Dr. James Carter',
    status: 'normal',
    summary: 'T-score: -0.5 (normal bone density). No osteopenia or osteoporosis detected.',
    trend: 'stable',
  },
  {
    id: 8,
    title: 'Vitamin D & B12 Panel',
    category: 'Blood Work',
    date: 'Feb 10, 2026',
    doctor: 'Dr. Priya Sharma',
    status: 'critical',
    summary: 'Vitamin D: 18 ng/mL (deficient). B12: 280 pg/mL (low-normal). Supplementation prescribed.',
    trend: 'down',
  },
];

const categories = ['All', 'Blood Work', 'Imaging', 'Vitals', 'Endocrine'];

const statusConfig = {
  normal: { label: 'Normal', color: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: CheckCircle2, dot: 'bg-emerald-500' },
  attention: { label: 'Needs Attention', color: 'bg-amber-50 text-amber-600 border-amber-200', icon: AlertTriangle, dot: 'bg-amber-500' },
  critical: { label: 'Action Required', color: 'bg-red-50 text-red-600 border-red-200', icon: AlertTriangle, dot: 'bg-red-500' },
};

const trendConfig = {
  up: { icon: TrendingUp, color: 'text-amber-500', label: 'Increasing' },
  down: { icon: TrendingDown, color: 'text-blue-500', label: 'Decreasing' },
  stable: { icon: Minus, color: 'text-emerald-500', label: 'Stable' },
};

const categoryIcons = {
  'Blood Work': Droplets,
  'Imaging': BrainCircuit,
  'Vitals': Activity,
  'Endocrine': Pill,
};

export default function HealthReports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedReport, setExpandedReport] = useState(null);

  const filtered = reportsData.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.doctor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const summaryStats = {
    total: reportsData.length,
    normal: reportsData.filter((r) => r.status === 'normal').length,
    attention: reportsData.filter((r) => r.status === 'attention').length,
    critical: reportsData.filter((r) => r.status === 'critical').length,
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
            <button className="btn-secondary flex items-center gap-2 text-sm !py-2.5 !px-5">
              <Download size={16} />
              <span className="hidden sm:inline">Export All</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
            <FileText className="text-indigo-600" size={32} />
            Health Reports
          </h2>
          <p className="text-slate-500 font-medium">
            Your complete medical history and diagnostic reports in one place.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="card p-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{summaryStats.total}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Total Reports</p>
          </div>
          <div className="card p-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                <ShieldCheck size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-emerald-600">{summaryStats.normal}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Normal</p>
          </div>
          <div className="card p-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                <AlertTriangle size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-amber-600">{summaryStats.attention}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Attention</p>
          </div>
          <div className="card p-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-red-50 text-red-600 rounded-xl group-hover:scale-110 transition-transform">
                <AlertTriangle size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-red-600">{summaryStats.critical}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Action Needed</p>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports or doctors..."
              className="input-field pl-11"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={16} className="text-slate-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="card p-16 text-center">
              <FileText size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-lg font-bold text-slate-400">No reports found</p>
              <p className="text-sm text-slate-300 mt-1">Try adjusting your search or filter criteria.</p>
            </div>
          )}

          {filtered.map((report) => {
            const status = statusConfig[report.status];
            const trend = trendConfig[report.trend];
            const TrendIcon = trend.icon;
            const StatusIcon = status.icon;
            const CategoryIcon = categoryIcons[report.category] || FileText;
            const isExpanded = expandedReport === report.id;

            return (
              <div
                key={report.id}
                className={`card transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/80 ${
                  isExpanded ? 'ring-2 ring-blue-100' : ''
                }`}
              >
                {/* Report Header Row */}
                <button
                  onClick={() => setExpandedReport(isExpanded ? null : report.id)}
                  className="w-full p-6 sm:p-8 flex items-center gap-5 text-left"
                >
                  {/* Category Icon */}
                  <div className="hidden sm:flex w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl items-center justify-center flex-shrink-0">
                    <CategoryIcon size={24} />
                  </div>

                  {/* Title & Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-lg font-bold text-slate-900 truncate">{report.title}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold border ${status.color}`}>
                        <StatusIcon size={12} />
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {report.date}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{report.doctor}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:flex items-center gap-1">
                        <TrendIcon size={14} className={trend.color} />
                        <span className={trend.color}>{trend.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Category Badge + Expand */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden lg:inline-block px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">
                      {report.category}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-300 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-slate-100">
                    <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Summary */}
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Clinical Summary</h4>
                        <p className="text-slate-600 leading-relaxed">{report.summary}</p>
                        <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
                          <Clock size={14} />
                          <span>Report generated on {report.date}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Actions</h4>
                        <button className="w-full btn-primary flex items-center justify-center gap-2 !text-sm !py-3">
                          <Eye size={16} />
                          View Full Report
                        </button>
                        <button className="w-full btn-secondary flex items-center justify-center gap-2 !text-sm !py-3">
                          <Download size={16} />
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Health Trend Overview */}
        <div className="mt-12 card p-8 sm:p-10">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={24} />
            Health Trend Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Metric 1 */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none" stroke="#10b981" strokeWidth="8"
                    strokeDasharray={`${0.85 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900">85%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                </div>
              </div>
              <p className="font-bold text-slate-900">Blood Work</p>
              <p className="text-xs text-emerald-500 font-bold mt-1 flex items-center justify-center gap-1">
                <TrendingUp size={12} /> Improving
              </p>
            </div>

            {/* Metric 2 */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none" stroke="#f59e0b" strokeWidth="8"
                    strokeDasharray={`${0.72 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900">72%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                </div>
              </div>
              <p className="font-bold text-slate-900">Cardiovascular</p>
              <p className="text-xs text-amber-500 font-bold mt-1 flex items-center justify-center gap-1">
                <Minus size={12} /> Monitor
              </p>
            </div>

            {/* Metric 3 */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none" stroke="#6366f1" strokeWidth="8"
                    strokeDasharray={`${0.91 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900">91%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                </div>
              </div>
              <p className="font-bold text-slate-900">Musculoskeletal</p>
              <p className="text-xs text-indigo-500 font-bold mt-1 flex items-center justify-center gap-1">
                <TrendingUp size={12} /> Excellent
              </p>
            </div>
          </div>
        </div>

        {/* Doctor's Notes */}
        <div className="mt-8 bg-slate-900 rounded-[2rem] p-8 sm:p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
              Doctor's Note
            </span>
            <h4 className="text-xl font-bold mb-3">
              Overall Health Assessment — <span className="text-emerald-400">Good</span>
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
              Your recent lab results indicate overall good health. Key areas to focus on: maintaining a healthy diet to manage
              LDL cholesterol, and starting Vitamin D supplementation as prescribed. Continue with regular exercise and schedule
              a follow-up in 3 months.
            </p>
            <p className="text-slate-500 text-xs font-bold mt-4">— Dr. Sarah Mitchell, MD • Last updated: Apr 22, 2026</p>
          </div>
          <div className="absolute bottom-[-10%] right-[-5%] opacity-5">
            <Activity size={200} />
          </div>
        </div>
      </main>
    </div>
  );
}
