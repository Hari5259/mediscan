import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Calendar, FileText, TrendingUp, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    const doctorData = sessionStorage.getItem('doctorLogged');
    if (!doctorData) {
      navigate('/doctor-login');
      return;
    }
    setDoctorInfo(JSON.parse(doctorData));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('doctorLogged');
    navigate('/doctor-login');
  };

  if (!doctorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              D
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Portal</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-600">Logged in as</p>
              <p className="font-semibold text-gray-900">{doctorInfo.doctorId}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back, Doctor! 👋
              </h2>
              <p className="text-gray-600">
                Your verified profile ID: <span className="font-semibold text-blue-600">{doctorInfo.doctorId}</span>
              </p>
              <div className="flex items-center gap-2 mt-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-600 font-semibold">ID Verified</span>
              </div>
            </div>
            <div className="text-6xl">👨‍⚕️</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Total Patients</h3>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-gray-600 text-sm mt-2">Active patients</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Appointments</h3>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-gray-600 text-sm mt-2">This week</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Consultations</h3>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">8</p>
            <p className="text-gray-600 text-sm mt-2">Pending review</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Rating</h3>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">4.9</p>
            <p className="text-gray-600 text-sm mt-2">Out of 5.0</p>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📅 Upcoming Appointments</h3>
            <div className="space-y-4">
              {[
                { name: 'John Anderson', time: '10:00 AM', type: 'Follow-up' },
                { name: 'Sarah Chen', time: '11:30 AM', type: 'Consultation' },
                { name: 'Michael Johnson', time: '2:00 PM', type: 'Check-up' }
              ].map((appt, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{appt.name}</p>
                    <p className="text-gray-600 text-sm">{appt.type}</p>
                  </div>
                  <p className="font-semibold text-blue-600">{appt.time}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View All Appointments
            </button>
          </div>

          {/* Patient Management */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">👥 Patient Management</h3>
            <div className="space-y-3">
              {[
                { icon: '📋', label: 'View All Patients', desc: 'Access your patient records' },
                { icon: '📝', label: 'Write Prescriptions', desc: 'Create digital prescriptions' },
                { icon: '🧪', label: 'Order Lab Tests', desc: 'Request lab work' },
                { icon: '📊', label: 'Medical Records', desc: 'Access patient history' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-gray-600 text-xs">{item.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Recent Activity</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {[
              { action: 'Updated prescription', patient: 'John Anderson', time: '2 hours ago' },
              { action: 'Completed consultation', patient: 'Emma Davis', time: '4 hours ago' },
              { action: 'Added lab report', patient: 'Michael Kumar', time: '1 day ago' },
              { action: 'Scheduled appointment', patient: 'Sarah Chen', time: '2 days ago' },
              { action: 'Updated patient info', patient: 'Robert Smith', time: '3 days ago' }
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.patient}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
