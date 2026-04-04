import { useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';

export default function Privacy() {
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
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">How we protect your personal information</p>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              MediCare ("we," "us," "our") is committed to protecting your privacy. This Privacy Policy
              explains our practices regarding personal and health information collection, use, and protection.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="font-semibold text-gray-900">Personal Information:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Name, email, and phone number</li>
                <li>Date of birth and address</li>
                <li>Payment information (if applicable)</li>
                <li>Account credentials and login history</li>
              </ul>

              <h3 className="font-semibold text-gray-900">Health Information:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Medical history and diagnoses</li>
                <li>Medications and allergies</li>
                <li>Test results and health metrics</li>
                <li>Communication with healthcare providers</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide healthcare services and treatments</li>
              <li>Send appointment reminders and important notifications</li>
              <li>Improve our platform and services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Conduct medical research (with your consent)</li>
              <li>Prevent fraud and secure your account</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Data Security
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                Your data is protected using:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for all health data</li>
                <li>Secure servers with regular security audits</li>
                <li>Multi-factor authentication for account access</li>
                <li>Compliance with HIPAA and international data protection laws</li>
                <li>Limited access to personnel with the need-to-know</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Your Privacy Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access your personal and health information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Download your data in a portable format</li>
              <li>Lodge a complaint with data protection authorities</li>
            </ul>
          </section>

          {/* Third-Party Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Sharing Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We share information only when necessary:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>With healthcare providers you authorize</li>
              <li>With insurance companies (if necessary)</li>
              <li>With emergency services in urgent situations</li>
              <li>As required by law enforcement or court orders</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We do NOT sell your data to third parties.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Cookies & Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies to improve your experience and maintain security. You can control cookie
              preferences through your browser settings. Non-essential cookies can be disabled without
              affecting platform functionality.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              MediCare is not intended for users under 18. We will not knowingly collect information
              from minors. If we become aware of such collection, we will delete the information immediately.
              Parents or guardians may create accounts for minors with their consent.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your data as long as your account is active and for a reasonable period afterward
              for legal and business purposes. Medical records are retained per applicable laws and
              regulations. You can request deletion of your account and data at any time.
            </p>
          </section>

          {/* International Data Transfer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. International Data Transfer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than where you reside.
              By using MediCare, you consent to transfers subject to appropriate safeguards and legal frameworks.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Policy Changes
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy periodically. Significant changes will be communicated
              via email or through the platform. Continued use of MediCare constitutes acceptance of
              the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Contact Us
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>For privacy concerns, contact our Data Protection Officer:</p>
              <ul className="space-y-2 ml-4">
                <li>📧 Privacy: privacy@medigit.com</li>
                <li>📧 DPO: dpo@medigit.com</li>
                <li>🏢 Data Protection Office, Healthcare Way, Medical City, MC 12345</li>
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
            I Understand
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
