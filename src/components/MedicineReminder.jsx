import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, MessageCircle, Camera, FileText, AlertCircle,
  Scale, Users, UtensilsCrossed, Bell, Plus, Trash2, X,
  Check, Clock, Pill, AlarmCheck, AlarmClockOff, Edit2, RefreshCw,
  Sun, Sunset, Moon, Coffee, ChevronDown
} from 'lucide-react';
import Navbar from './Navbar';

const TABS = [
  { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
  { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
  { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
  { id: 'bmi-calculator', label: 'BMI Index', icon: Scale, path: '/bmi-calculator' },
  { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
  { id: 'food-tracker', icon: UtensilsCrossed, label: 'Food Tracker', path: '/food-tracker' },
  { id: 'medicine-reminder', icon: Bell, label: 'Reminders', path: '/medicine-reminder' },
  { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
  { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
];

const FREQUENCIES = ['Once daily', 'Twice daily', 'Three times daily', 'Every 4 hours', 'Weekly', 'As needed'];
const MEAL_TIMING = ['Before meal', 'After meal', 'With meal', 'Empty stomach', 'Anytime'];
const TIME_SLOTS = [
  { label: 'Morning', icon: Coffee, time: '08:00', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  { label: 'Afternoon', icon: Sun, time: '13:00', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
  { label: 'Evening', icon: Sunset, time: '18:00', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
  { label: 'Night', icon: Moon, time: '21:00', color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200' },
];

const COLORS = [
  { name: 'Blue', cls: 'bg-blue-500', light: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Green', cls: 'bg-green-500', light: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Red', cls: 'bg-red-500', light: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Purple', cls: 'bg-purple-500', light: 'bg-purple-100 text-purple-700 border-purple-200' },
  { name: 'Orange', cls: 'bg-orange-500', light: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'Pink', cls: 'bg-pink-500', light: 'bg-pink-100 text-pink-700 border-pink-200' },
];

const EMPTY_FORM = {
  name: '', dosage: '', frequency: 'Once daily', mealTiming: 'After meal',
  times: ['08:00'], startDate: '', endDate: '', notes: '', color: 0, active: true,
};

function StatusBadge({ active }) {
  return active
    ? <span className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-200"><AlarmCheck size={11}/> ACTIVE</span>
    : <span className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200"><AlarmOff size={11}/> PAUSED</span>;
}

export default function MedicineReminder() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([
    { id: 1, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', mealTiming: 'After meal', times: ['08:00', '21:00'], startDate: '2026-05-01', endDate: '2026-05-31', notes: 'Take with water', color: 0, active: true, takenToday: false },
    { id: 2, name: 'Vitamin D3', dosage: '60,000 IU', frequency: 'Weekly', mealTiming: 'With meal', times: ['09:00'], startDate: '2026-05-01', endDate: '2026-06-30', notes: '', color: 3, active: true, takenToday: true },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const openAdd = () => { setForm(EMPTY_FORM); setEditingId(null); setShowModal(true); };
  const openEdit = (r) => { setForm({ ...r }); setEditingId(r.id); setShowModal(true); };

  const saveReminder = () => {
    if (!form.name.trim()) return;
    if (editingId) {
      setReminders(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId, takenToday: r.takenToday } : r));
    } else {
      setReminders(prev => [...prev, { ...form, id: Date.now(), takenToday: false }]);
    }
    setShowModal(false);
  };

  const deleteReminder = (id) => setReminders(prev => prev.filter(r => r.id !== id));
  const toggleActive = (id) => setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  const toggleTaken = (id) => setReminders(prev => prev.map(r => r.id === id ? { ...r, takenToday: !r.takenToday } : r));

  const addTime = () => setForm(f => ({ ...f, times: [...f.times, '08:00'] }));
  const removeTime = (i) => setForm(f => ({ ...f, times: f.times.filter((_, idx) => idx !== i) }));
  const updateTime = (i, val) => setForm(f => ({ ...f, times: f.times.map((t, idx) => idx === i ? val : t) }));

  const filtered = reminders.filter(r => {
    if (filter === 'active') return r.active;
    if (filter === 'paused') return !r.active;
    if (filter === 'taken') return r.takenToday;
    return true;
  });

  const stats = {
    total: reminders.length,
    active: reminders.filter(r => r.active).length,
    taken: reminders.filter(r => r.takenToday).length,
    pending: reminders.filter(r => r.active && !r.takenToday).length,
  };

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      <main className="floating-container animate-slide-up">
        {/* Tabs */}
        <div className="module-tabs overflow-x-auto">
          {TABS.map(tab => (
            <div key={tab.id} onClick={() => navigate(tab.path)}
              className={`module-tab-item ${tab.id === 'medicine-reminder' ? 'active' : ''}`}>
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="main-floating-card p-10 mt-4">
          {/* Header */}
          <div className="mb-8 border-b border-gray-100 pb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[40px] font-black tracking-tighter leading-tight italic uppercase">
                Medicine <span className="text-[#008cff]">Reminders</span>
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                  Smart Dose Management System
                </p>
                <span className="text-[12px] font-black text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
            <button onClick={openAdd}
              className="flex items-center gap-2 bg-gradient-to-r from-[#53b2fe] to-[#065af3] text-white px-6 py-3 rounded-full text-[13px] font-black uppercase tracking-wider shadow-lg hover:scale-105 transition-transform">
              <Plus size={18} /> Add Reminder
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Medicines', value: stats.total, icon: Pill, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
              { label: 'Active', value: stats.active, icon: AlarmCheck, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100' },
              { label: 'Taken Today', value: stats.taken, icon: Check, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
              { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} border-2 ${s.border} rounded-[16px] p-5 flex items-center gap-4`}>
                <div className={`w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm ${s.color}`}>
                  <s.icon size={22} />
                </div>
                <div>
                  <p className="text-[26px] font-black text-gray-800 leading-none">{s.value}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {[['all','All'], ['active','Active'], ['paused','Paused'], ['taken','Taken Today']].map(([val, lbl]) => (
              <button key={val} onClick={() => setFilter(val)}
                className={`px-5 py-2 rounded-full text-[12px] font-black uppercase tracking-wider border-2 transition-all ${
                  filter === val ? 'bg-[#008cff] border-[#008cff] text-white' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}>
                {lbl}
              </button>
            ))}
          </div>

          {/* Schedule View */}
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">Today's Schedule</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {TIME_SLOTS.map(slot => {
                const Icon = slot.icon;
                const dues = reminders.filter(r => r.active && r.times.some(t => t === slot.time));
                return (
                  <div key={slot.label} className={`${slot.bg} border-2 ${slot.border} rounded-[14px] p-4`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={16} className={slot.color} />
                      <span className={`text-[11px] font-black uppercase tracking-wider ${slot.color}`}>{slot.label}</span>
                      <span className="ml-auto text-[11px] font-bold text-gray-500">{slot.time}</span>
                    </div>
                    {dues.length === 0
                      ? <p className="text-[11px] text-gray-300 font-semibold">No medicines</p>
                      : dues.map(r => (
                        <div key={r.id} className="flex items-center gap-2 mb-1.5">
                          <div className={`w-2 h-2 rounded-full ${COLORS[r.color]?.cls}`} />
                          <span className="text-[12px] font-bold text-gray-700 truncate">{r.name}</span>
                          <span className="text-[10px] text-gray-400 ml-auto">{r.dosage}</span>
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reminders List */}
          <div className="space-y-4">
            {filtered.length === 0 && (
              <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-[20px]">
                <Bell size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-[16px] font-black text-gray-300 uppercase tracking-widest">No reminders found</p>
                <p className="text-[13px] text-gray-300 font-semibold mt-1">Click "Add Reminder" to get started</p>
              </div>
            )}
            {filtered.map(r => {
              const c = COLORS[r.color] || COLORS[0];
              return (
                <div key={r.id} className={`border-2 rounded-[18px] p-6 transition-all ${r.active ? 'border-gray-100 bg-white shadow-sm hover:shadow-md' : 'border-gray-100 bg-gray-50 opacity-70'}`}>
                  <div className="flex flex-wrap items-start gap-4">
                    {/* Color dot + name */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-white shadow-md ${c.cls}`}>
                        <Pill size={24} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-[18px] font-black text-gray-800">{r.name}</h3>
                          <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${c.light}`}>{r.dosage}</span>
                          <StatusBadge active={r.active} />
                        </div>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="text-[12px] text-gray-400 font-semibold flex items-center gap-1">
                            <RefreshCw size={11}/> {r.frequency}
                          </span>
                          <span className="text-[12px] text-gray-400 font-semibold">{r.mealTiming}</span>
                          <span className="text-[12px] text-gray-400 font-semibold flex items-center gap-1">
                            <Clock size={11}/> {r.times.join(' · ')}
                          </span>
                          {r.endDate && (
                            <span className="text-[12px] text-gray-400 font-semibold">Until {r.endDate}</span>
                          )}
                        </div>
                        {r.notes && <p className="text-[12px] text-gray-400 italic mt-1">"{r.notes}"</p>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleTaken(r.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase border-2 transition-all ${
                          r.takenToday
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-green-200 text-green-500 hover:bg-green-50'}`}>
                        <Check size={13} />
                        {r.takenToday ? 'Taken' : 'Mark Taken'}
                      </button>
                      <button onClick={() => openEdit(r)}
                        className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-[#008cff] transition-all">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => toggleActive(r.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${r.active ? 'bg-gray-100 text-gray-500 hover:bg-orange-100 hover:text-orange-500' : 'bg-green-100 text-green-500 hover:bg-green-200'}`}>
                        {r.active ? <AlarmOff size={15}/> : <AlarmCheck size={15}/>}
                      </button>
                      <button onClick={() => deleteReminder(r.id)}
                        className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg p-8 animate-slide-up my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[22px] font-black tracking-tight">
                {editingId ? 'Edit Reminder' : 'New Reminder'}
              </h3>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              {/* Medicine Name */}
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Medicine Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Paracetamol" 
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-5 py-4 text-[15px] font-bold outline-none focus:border-[#008cff] transition-all" />
              </div>

              {/* Dosage */}
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Dosage</label>
                <input type="text" value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))}
                  placeholder="e.g. 500mg, 1 tablet"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-5 py-4 text-[15px] font-bold outline-none focus:border-[#008cff] transition-all" />
              </div>

              {/* Frequency + Meal Timing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Frequency</label>
                  <div className="relative">
                    <select value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-5 py-4 text-[14px] font-bold outline-none focus:border-[#008cff] transition-all appearance-none">
                      {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Meal Timing</label>
                  <div className="relative">
                    <select value={form.mealTiming} onChange={e => setForm(f => ({ ...f, mealTiming: e.target.value }))}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-5 py-4 text-[14px] font-bold outline-none focus:border-[#008cff] transition-all appearance-none">
                      {MEAL_TIMING.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Times */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Reminder Times</label>
                  <button onClick={addTime} className="text-[11px] font-black text-[#008cff] hover:underline flex items-center gap-1"><Plus size={12}/>Add Time</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {form.times.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 border-2 border-gray-100 rounded-[10px] px-3 py-2">
                      <Clock size={14} className="text-gray-400"/>
                      <input type="time" value={t} onChange={e => updateTime(i, e.target.value)}
                        className="bg-transparent text-[14px] font-black outline-none" />
                      {form.times.length > 1 && (
                        <button onClick={() => removeTime(i)} className="text-red-400 hover:text-red-600"><X size={13}/></button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Start + End Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Start Date</label>
                  <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-5 py-4 text-[14px] font-bold outline-none focus:border-[#008cff] transition-all" />
                </div>
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">End Date</label>
                  <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-5 py-4 text-[14px] font-bold outline-none focus:border-[#008cff] transition-all" />
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Color Label</label>
                <div className="flex gap-3">
                  {COLORS.map((c, i) => (
                    <button key={i} onClick={() => setForm(f => ({ ...f, color: i }))}
                      className={`w-9 h-9 rounded-full ${c.cls} transition-all ${form.color === i ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'}`} />
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Notes (optional)</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="e.g. Take with warm water..."
                  rows={2}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-5 py-4 text-[14px] font-bold outline-none focus:border-[#008cff] transition-all resize-none" />
              </div>

              <button onClick={saveReminder} className="btn-search w-full py-4 !text-[16px]">
                {editingId ? 'SAVE CHANGES' : 'ADD REMINDER'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
