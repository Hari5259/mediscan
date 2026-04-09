import { useNavigate } from 'react-router-dom';
import { Heart, LogOut, Stethoscope } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored data
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-blue-600" fill="currentColor" />
            <h1 className="text-2xl font-bold text-gray-900">MediCare</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Welcome Card */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to MediCare!
            </h2>
            <p className="text-gray-600">
              Your comprehensive healthcare platform for mental and physical wellness
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/doctors')}>
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">👨‍⚕️ Find Doctors</h3>
            </div>
            <p className="text-gray-600 mb-4">Browse and book appointments with healthcare professionals</p>
            <button className="btn-primary w-full">Find Doctors</button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Medical Records</h3>
            <p className="text-gray-600 mb-4">View and manage your medical history</p>
            <button className="btn-primary w-full">View Records</button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💭 Mental Health</h3>
            <p className="text-gray-600 mb-4">Connect with mental health professionals</p>
            <button className="btn-primary w-full">Get Support</button>
          </div>
        </div>

        {/* Modules (Coming Soon) */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Coming Soon: Additional Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              '💊 Medication Management',
              '📊 Health Analytics',
              '🏥 Hospital Integration',
              '📞 Video Consultations',
              '🧬 Lab Results',
              '🏃 Fitness Tracking',
              '🍎 Nutrition Guide',
              '🔔 Health Alerts'
            ].map((module, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-gray-700 font-medium">{module}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
