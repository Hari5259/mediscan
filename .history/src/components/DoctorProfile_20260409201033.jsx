import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, Phone, Award, Heart, ArrowLeft } from 'lucide-react';
import { doctorsData } from '../data/doctorsData';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const doctor = doctorsData.find(doc => doc.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h2>
          <button
            onClick={() => navigate('/doctors')}
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Back to doctors
          </button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      alert(`Appointment booked with ${doctor.name} on ${selectedDate} at ${selectedTime}`);
      setShowBooking(false);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/doctors')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Doctor Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Doctor Image and Quick Info */}
            <div className="flex flex-col items-center md:col-span-1">
              <div className="relative mb-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-48 h-48 rounded-full object-cover border-4 border-blue-600"
                />
                <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-3">
                  <Heart size={24} fill="currentColor" />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400"
                      fill={i < Math.round(doctor.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900">{doctor.rating}</span>
              </div>
              <p className="text-gray-600 text-sm text-center">{doctor.reviews} patient reviews</p>
            </div>

            {/* Doctor Details */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-2xl text-blue-600 font-semibold mb-1">{doctor.specialty}</p>
              <p className="text-gray-600 mb-6">{doctor.qualification}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-600" size={24} />
                  <div>
                    <p className="text-gray-600 text-sm">Experience</p>
                    <p className="font-bold text-gray-900">{doctor.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-blue-600" size={24} />
                  <div>
                    <p className="text-gray-600 text-sm">Hospital</p>
                    <p className="font-bold text-gray-900">{doctor.hospital}</p>
                  </div>
                </div>
              </div>

              {/* Consultation Fee */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Consultation Fee</p>
                <p className="text-3xl font-bold text-blue-600">{doctor.consultationFee}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{doctor.about}</p>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications & Specializations</h2>
              <div className="space-y-3">
                {doctor.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Award className="text-blue-600" size={20} />
                    <p className="text-gray-700 font-medium">{cert}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Availability</h2>
              <div className="flex flex-wrap gap-3">
                {doctor.availability.map((day, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Languages</h2>
              <div className="flex flex-wrap gap-3">
                {doctor.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h3>

              {!showBooking ? (
                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar size={20} />
                  Schedule Appointment
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Select Time</label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-2 rounded-lg font-medium transition-colors text-sm ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleBookAppointment}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Confirm Booking
                    </button>
                    <button
                      onClick={() => {
                        setShowBooking(false);
                        setSelectedDate('');
                        setSelectedTime('');
                      }}
                      className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-3 pt-6 border-t">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={18} className="text-blue-600" />
                  <span>+1-800-MEDICARE</span>
                </div>
                <p className="text-sm text-gray-600">
                  For immediate assistance, contact our support team during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
