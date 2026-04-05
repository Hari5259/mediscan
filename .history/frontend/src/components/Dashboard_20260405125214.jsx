import { useNavigate } from 'react-router-dom';
import { Heart, LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => { sessionStorage.clear(); localStorage.clear(); navigate('/login'); };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#f8fafc, #eef2ff)' }}>
      <nav className="app-nav">
        <div className="container flex items-center justify-between py-4">
          <div className="brand"><Heart className="w-7 h-7 text-blue-600" fill="currentColor" /><span className="ml-3 brand-title">MediCare</span></div>
          <div className="flex items-center gap-4">
            <button className="text-muted small">Help</button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50"><LogOut size={18} /> Logout</button>
          </div>
        </div>
      </nav>

      <main className="container py-10">
        <div className="card mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to MediCare</h2>
          <p className="text-muted mt-2">A simple, secure platform for managing your healthcare.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="card hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold">Schedule Appointment</h3>
            <p className="text-muted mt-2">Book with doctors in minute.</p>
            <button className="btn-primary w-full mt-4">Schedule</button>
          </div>

          <div className="card hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold">Medical Records</h3>
            <p className="text-muted mt-2">View and manage your history.</p>
            <button className="btn-primary w-full mt-4">View Records</button>
          </div>

          <div className="card hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold">Mental Health</h3>
            <p className="text-muted mt-2">Access support resources.</p>
            <button className="btn-primary w-full mt-4">Get Support</button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Medication','Analytics','Hospital','Video','Labs','Fitness','Nutrition','Alerts'].map((m, i) => (
              <div key={i} className="rounded-md bg-blue-50 p-3 text-center text-muted">{m}</div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
