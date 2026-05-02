import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Verification from './components/Verification';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Dashboard from './components/Dashboard';
import Doctors from './components/Doctors';
import DoctorProfile from './components/DoctorProfile';
import DoctorLogin from './components/DoctorLogin';
import DoctorDashboard from './components/DoctorDashboard';
import BMICalculator from './components/BMICalculator';
import EmergencyModule from './components/EmergencyModule';
import HealthReports from './components/HealthReports';
import SymptomChecker from './components/SymptomChecker';
import MedicineScanner from './components/MedicineScanner';
import Chatbot from './components/Chatbot';
import FoodTracker from './components/FoodTracker';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/emergency" element={<EmergencyModule />} />
        <Route path="/health-reports" element={<HealthReports />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/medicine-scanner" element={<MedicineScanner />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/food-tracker" element={<FoodTracker />} />

        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
