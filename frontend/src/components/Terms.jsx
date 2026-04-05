import { useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <ChevronLeft size={20} />
            Back
          </button>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-blue-600" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Terms & Conditions</h1>
            <p className="text-gray-600 mt-2">Please read carefully before using MediCare</p>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to MediCare, a comprehensive healthcare platform dedicated to caring for both
              the mental and physical well-being of our users. These Terms & Conditions ("Terms")
              govern your use of our platform, website, and services.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. User Responsibilities
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                As a user of MediCare, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and truthful information during registration</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the platform only for legitimate healthcare purposes</li>
                <li>Not share your account with any third party</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not attempt to hack, deceive, or harm the platform</li>
              </ul>
            </div>
          </section>

          {/* Medical Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Medical Disclaimer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              MediCare provides health information and connects you with healthcare professionals.
              However, the information provided on this platform should not be considered as a
              substitute for professional medical advice, diagnosis, or treatment by a qualified physician.
              Always consult with a licensed healthcare provider for medical advice.
            </p>
          </section>

          {/* Data Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Data Privacy & Security
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                We are committed to protecting your personal and health information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All data is encrypted using industry-standard security protocols</li>
                <li>Your health information is confidential and protected</li>
                <li>We comply with HIPAA and data protection regulations</li>
                <li>We do not sell your data to third parties</li>
                <li>You have the right to access and modify your personal information</li>
              </ul>
            </div>
          </section>

          {/* Doctor & Patient Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Doctor & Patient Conduct
            </h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="font-semibold text-gray-900">For Doctors:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Maintain professional ethics and standards</li>
                <li>Provide accurate medical information</li>
                <li>Keep patient information confidential</li>
                <li>Follow all medical licensing requirements</li>
              </ul>

              <h3 className="font-semibold text-gray-900">For Patients:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide complete and accurate health information</li>
                <li>Follow medical advice responsibly</li>
                <li>Communicate honestly with healthcare providers</li>
                <li>Seek emergency services for life-threatening conditions</li>
              </ul>
            </div>
          </section>

          {/* Mental Health Support */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Mental Health Support
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you are experiencing a mental health crisis, please contact emergency services or
              a mental health crisis hotline immediately. MediCare is not a substitute for emergency
              mental health services. In cases of self-harm or harm to others, please call emergency
              services immediately.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              MediCare is provided "as-is" without any warranties. We are not liable for any damages,
              losses, or injuries resulting from the use of our platform. Users are responsible for
              verifying the qualifications of healthcare professionals and seeking appropriate medical care.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Account Termination
            </h2>
            <p className="text-gray-700 leading-relaxed">
              MediCare reserves the right to suspend or terminate accounts that violate these terms.
              Users may also terminate their accounts at any time through their account settings.
              Upon termination, we will delete your account data within 30 days unless required to
              retain it for legal reasons.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms from time to time. We will notify you of any significant changes
              via email or through the platform. Continued use of MediCare after changes constitute
              your acceptance of the new Terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>If you have questions about these Terms, please contact us:</p>
              <ul className="space-y-2 ml-4">
                <li>📧 Email: legal@medigit.com</li>
                <li>📱 Phone: +1 (555) 123-4567</li>
                <li>🏢 Address: Healthcare Way, Medical City, MC 12345</li>
              </ul>
            </div>
          </section>

          {/* Last Updated */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Last updated: April 4, 2024
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate('/signup')}
            className="flex-1 btn-primary"
          >
            Accept & Continue
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 btn-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
