import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, MessageCircle, Camera, FileText, AlertCircle,
  Scale, Users, UtensilsCrossed, Plus, Trash2, Search,
  Flame, Droplets, Beef, Wheat, ChevronDown, X, Target,
  TrendingUp, Apple, Coffee, Sun, Moon
} from 'lucide-react';
import Navbar from './Navbar';

const TABS = [
  { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
  { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
  { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
  { id: 'bmi-calculator', label: 'BMI Index', icon: Scale, path: '/bmi-calculator' },
  { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
  { id: 'food-tracker', icon: UtensilsCrossed, label: 'Food Tracker', path: '/food-tracker' },
  { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
  { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
];

const FOOD_DB = [
  { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, unit: '1 medium' },
  { name: 'Boiled Egg', calories: 78, protein: 6, carbs: 0.6, fat: 5, unit: '1 large' },
  { name: 'Oats (cooked)', calories: 166, protein: 5.9, carbs: 28, fat: 3.6, unit: '1 cup' },
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
  { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, unit: '1 cup' },
  { name: 'Whole Milk', calories: 149, protein: 8, carbs: 12, fat: 8, unit: '1 cup' },
  { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.7, unit: '1 cup' },
  { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, unit: '1 medium' },
  { name: 'Chapati / Roti', calories: 104, protein: 3, carbs: 18, fat: 2.7, unit: '1 piece' },
  { name: 'Dal (lentil)', calories: 230, protein: 18, carbs: 39, fat: 0.8, unit: '1 cup' },
  { name: 'Paneer', calories: 265, protein: 18, carbs: 1.2, fat: 20, unit: '100g' },
  { name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13, unit: '100g' },
  { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, unit: '28g (handful)' },
  { name: 'Orange Juice', calories: 112, protein: 1.7, carbs: 26, fat: 0.5, unit: '1 cup' },
  { name: 'Coffee (black)', calories: 5, protein: 0.3, carbs: 0, fat: 0, unit: '1 cup' },
  { name: 'Idli', calories: 39, protein: 2, carbs: 8, fat: 0.2, unit: '1 piece' },
  { name: 'Samosa', calories: 262, protein: 4, carbs: 33, fat: 13, unit: '1 piece' },
  { name: 'White Bread', calories: 79, protein: 2.7, carbs: 15, fat: 1, unit: '1 slice' },
  { name: 'Avocado', calories: 240, protein: 3, carbs: 13, fat: 22, unit: '1 medium' },
  { name: 'Protein Shake', calories: 150, protein: 25, carbs: 8, fat: 2, unit: '1 scoop' },
];

const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const MEAL_ICONS = {
  Breakfast: Coffee,
  Lunch: Sun,
  Dinner: Moon,
  Snacks: Apple,
};

const MEAL_COLORS = {
  Breakfast: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-500', badge: 'bg-amber-100 text-amber-700' },
  Lunch: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-500', badge: 'bg-green-100 text-green-700' },
  Dinner: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-500', badge: 'bg-indigo-100 text-indigo-700' },
  Snacks: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-500', badge: 'bg-pink-100 text-pink-700' },
};

const GOAL = { calories: 2000, protein: 150, carbs: 250, fat: 65 };

function MacroBar({ label, current, goal, color }) {
  const pct = Math.min(100, Math.round((current / goal) * 100));
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">{label}</span>
        <span className="text-[12px] font-bold text-gray-600">{Math.round(current)}g / {goal}g</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-right text-[10px] font-bold text-gray-400">{pct}%</div>
    </div>
  );
}

export default function FoodTracker() {
  const navigate = useNavigate();
  const [log, setLog] = useState({}); // { Breakfast: [{...food, qty}], ... }
  const [activeMeal, setActiveMeal] = useState('Breakfast');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [qty, setQty] = useState(1);
  const [goal, setGoal] = useState(GOAL);
  const [showGoalEdit, setShowGoalEdit] = useState(false);

  const filtered = useMemo(() =>
    FOOD_DB.filter(f => f.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const totals = useMemo(() => {
    let calories = 0, protein = 0, carbs = 0, fat = 0;
    Object.values(log).forEach(items =>
      items.forEach(item => {
        calories += item.calories * item.qty;
        protein += item.protein * item.qty;
        carbs += item.carbs * item.qty;
        fat += item.fat * item.qty;
      })
    );
    return { calories, protein, carbs, fat };
  }, [log]);

  const mealTotals = (meal) => {
    const items = log[meal] || [];
    return items.reduce((acc, item) => ({
      calories: acc.calories + item.calories * item.qty,
      items: acc.items + 1,
    }), { calories: 0, items: 0 });
  };

  const openAdd = (food) => {
    setSelectedFood(food);
    setQty(1);
    setShowModal(true);
  };

  const confirmAdd = () => {
    if (!selectedFood) return;
    setLog(prev => ({
      ...prev,
      [activeMeal]: [...(prev[activeMeal] || []), { ...selectedFood, qty, id: Date.now() }],
    }));
    setShowModal(false);
    setSearch('');
  };

  const removeItem = (meal, id) => {
    setLog(prev => ({
      ...prev,
      [meal]: (prev[meal] || []).filter(i => i.id !== id),
    }));
  };

  const caloriePct = Math.min(100, Math.round((totals.calories / goal.calories) * 100));
  const remaining = Math.max(0, goal.calories - totals.calories);

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />

      <main className="floating-container animate-slide-up">
        {/* Module Tabs */}
        <div className="module-tabs overflow-x-auto">
          {TABS.map(tab => (
            <div
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`module-tab-item ${tab.id === 'food-tracker' ? 'active' : ''}`}
            >
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="main-floating-card p-10 mt-4">
          {/* Header */}
          <div className="mb-10 border-b border-gray-100 pb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[40px] font-black tracking-tighter leading-tight italic uppercase">
                Food <span className="text-[#008cff]">Tracker</span>
              </h1>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                Nutrition Intelligence · Daily Calorie Command
              </p>
            </div>
            <button
              onClick={() => setShowGoalEdit(v => !v)}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#008cff] text-[#008cff] rounded-full text-[12px] font-black uppercase tracking-wider hover:bg-blue-50 transition-colors"
            >
              <Target size={16} /> Set Daily Goal
            </button>
          </div>

          {/* Goal Editor */}
          {showGoalEdit && (
            <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-100 rounded-[16px] grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
              {[['Calories (kcal)', 'calories', ''], ['Protein (g)', 'protein', ''], ['Carbs (g)', 'carbs', ''], ['Fat (g)', 'fat', '']].map(([label, key]) => (
                <div key={key}>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1 block">{label}</label>
                  <input
                    type="number"
                    value={goal[key]}
                    onChange={e => setGoal(g => ({ ...g, [key]: Number(e.target.value) }))}
                    className="w-full bg-white border-2 border-blue-100 rounded-[10px] px-4 py-3 text-[18px] font-black outline-none focus:border-[#008cff] transition-all"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT: Log Panel */}
            <div className="lg:col-span-2 space-y-8">
              {/* Meal Selector */}
              <div className="flex gap-3 flex-wrap">
                {MEALS.map(meal => {
                  const c = MEAL_COLORS[meal];
                  const mt = mealTotals(meal);
                  const Icon = MEAL_ICONS[meal];
                  return (
                    <button
                      key={meal}
                      onClick={() => setActiveMeal(meal)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-[13px] font-black uppercase tracking-wider transition-all ${
                        activeMeal === meal
                          ? `${c.bg} ${c.border} ${c.icon}`
                          : 'border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      <Icon size={15} />
                      {meal}
                      {mt.items > 0 && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${c.badge}`}>
                          {Math.round(mt.calories)} kcal
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Search & Add Food */}
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block">
                  Add Food to {activeMeal}
                </label>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search food (e.g. Banana, Dal, Chicken...)"
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] pl-14 pr-6 py-4 text-[15px] font-semibold outline-none focus:border-[#008cff] transition-all"
                  />
                </div>

                {search && (
                  <div className="border-2 border-gray-100 rounded-[14px] overflow-hidden shadow-lg divide-y divide-gray-50 max-h-64 overflow-y-auto">
                    {filtered.length === 0 && (
                      <div className="p-5 text-center text-gray-400 text-[13px] font-bold">No results found</div>
                    )}
                    {filtered.map(food => (
                      <div
                        key={food.name}
                        onClick={() => openAdd(food)}
                        className="flex items-center justify-between px-6 py-3 bg-white hover:bg-blue-50 cursor-pointer transition-colors group"
                      >
                        <div>
                          <p className="text-[14px] font-black text-gray-800">{food.name}</p>
                          <p className="text-[11px] text-gray-400 font-semibold">{food.unit} · P:{food.protein}g · C:{food.carbs}g · F:{food.fat}g</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[15px] font-black text-[#008cff]">{food.calories} kcal</span>
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[#008cff] group-hover:bg-[#008cff] group-hover:text-white transition-all">
                            <Plus size={16} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Logged Items Per Meal */}
              {MEALS.map(meal => {
                const items = log[meal] || [];
                const c = MEAL_COLORS[meal];
                const Icon = MEAL_ICONS[meal];
                if (items.length === 0) return null;
                return (
                  <div key={meal} className={`border-2 ${c.border} ${c.bg} rounded-[16px] overflow-hidden`}>
                    <div className={`px-6 py-3 flex items-center gap-3 border-b ${c.border}`}>
                      <Icon size={16} className={c.icon} />
                      <span className={`text-[12px] font-black uppercase tracking-widest ${c.icon}`}>{meal}</span>
                      <span className={`ml-auto text-[11px] font-black px-2.5 py-1 rounded-full ${c.badge}`}>
                        {Math.round(mealTotals(meal).calories)} kcal
                      </span>
                    </div>
                    <div className="divide-y divide-white/60">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between px-6 py-3 bg-white/60">
                          <div>
                            <p className="text-[14px] font-black text-gray-800">{item.name}</p>
                            <p className="text-[11px] text-gray-400 font-semibold">
                              ×{item.qty} {item.unit} · {Math.round(item.calories * item.qty)} kcal
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                              <p className="text-[11px] text-gray-400 font-bold">
                                P: {(item.protein * item.qty).toFixed(1)}g &nbsp;
                                C: {(item.carbs * item.qty).toFixed(1)}g &nbsp;
                                F: {(item.fat * item.qty).toFixed(1)}g
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(meal, item.id)}
                              className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {Object.values(log).every(v => v.length === 0) && (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-[20px]">
                  <UtensilsCrossed size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-[16px] font-black text-gray-300 uppercase tracking-widest">No meals logged yet</p>
                  <p className="text-[13px] text-gray-300 font-semibold mt-1">Search for food above to start tracking</p>
                </div>
              )}
            </div>

            {/* RIGHT: Summary Panel */}
            <div className="space-y-6">
              {/* Calorie Ring Summary */}
              <div className="bg-gray-50 border-2 border-gray-100 rounded-[20px] p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Flame size={120} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">Daily Calories</p>
                <div className="relative w-36 h-36 mx-auto mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={caloriePct >= 100 ? '#ef4444' : '#008cff'}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${caloriePct * 2.638} 263.8`}
                      style={{ transition: 'stroke-dasharray 0.7s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[28px] font-black text-gray-800 leading-none">
                      {Math.round(totals.calories)}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">kcal</span>
                  </div>
                </div>
                <div className="flex justify-around text-center">
                  <div>
                    <p className="text-[20px] font-black text-green-500">{remaining}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Remaining</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div>
                    <p className="text-[20px] font-black text-gray-700">{goal.calories}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Goal</p>
                  </div>
                </div>
              </div>

              {/* Macro Bars */}
              <div className="bg-white border-2 border-gray-100 rounded-[20px] p-6 space-y-5">
                <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Macronutrients</p>
                <MacroBar label="Protein" current={totals.protein} goal={goal.protein} color="bg-blue-500" />
                <MacroBar label="Carbs" current={totals.carbs} goal={goal.carbs} color="bg-amber-400" />
                <MacroBar label="Fat" current={totals.fat} goal={goal.fat} color="bg-pink-500" />
              </div>

              {/* Per-Meal Breakdown */}
              <div className="bg-white border-2 border-gray-100 rounded-[20px] p-6">
                <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">Meal Breakdown</p>
                <div className="space-y-3">
                  {MEALS.map(meal => {
                    const mt = mealTotals(meal);
                    const c = MEAL_COLORS[meal];
                    const Icon = MEAL_ICONS[meal];
                    return (
                      <div key={meal} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${c.bg}`}>
                          <Icon size={15} className={c.icon} />
                        </div>
                        <span className="text-[13px] font-bold text-gray-600 flex-1">{meal}</span>
                        <span className="text-[13px] font-black text-gray-800">{Math.round(mt.calories)} kcal</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 border-2 border-blue-100 rounded-[14px] p-4 text-center">
                  <Beef size={20} className="mx-auto text-blue-400 mb-1" />
                  <p className="text-[18px] font-black text-blue-600">{Math.round(totals.protein)}g</p>
                  <p className="text-[10px] font-bold text-blue-400 uppercase">Protein</p>
                </div>
                <div className="bg-amber-50 border-2 border-amber-100 rounded-[14px] p-4 text-center">
                  <Wheat size={20} className="mx-auto text-amber-400 mb-1" />
                  <p className="text-[18px] font-black text-amber-600">{Math.round(totals.carbs)}g</p>
                  <p className="text-[10px] font-bold text-amber-400 uppercase">Carbs</p>
                </div>
                <div className="bg-pink-50 border-2 border-pink-100 rounded-[14px] p-4 text-center">
                  <Droplets size={20} className="mx-auto text-pink-400 mb-1" />
                  <p className="text-[18px] font-black text-pink-600">{Math.round(totals.fat)}g</p>
                  <p className="text-[10px] font-bold text-pink-400 uppercase">Fat</p>
                </div>
                <div className="bg-green-50 border-2 border-green-100 rounded-[14px] p-4 text-center">
                  <TrendingUp size={20} className="mx-auto text-green-400 mb-1" />
                  <p className="text-[18px] font-black text-green-600">{caloriePct}%</p>
                  <p className="text-[10px] font-bold text-green-400 uppercase">Goal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Food Modal */}
      {showModal && selectedFood && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-sm p-8 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] font-black tracking-tight">{selectedFood.name}</h3>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X size={18} />
              </button>
            </div>
            <p className="text-[13px] text-gray-400 font-semibold mb-6">{selectedFood.unit} · Adding to <strong>{activeMeal}</strong></p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[['Calories', `${selectedFood.calories * qty} kcal`, 'text-orange-500'],
                ['Protein', `${(selectedFood.protein * qty).toFixed(1)}g`, 'text-blue-500'],
                ['Carbs', `${(selectedFood.carbs * qty).toFixed(1)}g`, 'text-amber-500']].map(([l, v, c]) => (
                <div key={l} className="bg-gray-50 rounded-[12px] p-3 text-center">
                  <p className={`text-[16px] font-black ${c}`}>{v}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{l}</p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Quantity (servings)</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty(q => Math.max(0.5, q - 0.5))}
                  className="w-11 h-11 bg-gray-100 rounded-full text-xl font-black hover:bg-gray-200 transition-colors flex items-center justify-center"
                >−</button>
                <span className="flex-1 text-center text-[28px] font-black">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 0.5)}
                  className="w-11 h-11 bg-blue-100 text-[#008cff] rounded-full text-xl font-black hover:bg-blue-200 transition-colors flex items-center justify-center"
                >+</button>
              </div>
            </div>

            <button
              onClick={confirmAdd}
              className="btn-search w-full py-4 !text-[16px]"
            >
              ADD TO {activeMeal.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
