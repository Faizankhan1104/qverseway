// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>QVerse Way</strong>, your privacy is important to us. This
        Privacy Policy explains how we collect, use, and protect your information
        when you use our website, mobile app, or online Quran learning services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6">
        <li>Name, email, phone number, age, country</li>
        <li>Account and course progress information</li>
        <li>Payment and transaction details</li>
        <li>IP address, device, browser, usage data</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
      <ul className="list-disc ml-6">
        <li>Create and manage your account</li>
        <li>Provide Quran classes and materials</li>
        <li>Process payments and send receipts</li>
        <li>Improve platform and user experience</li>
        <li>Send updates and support messages</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
      <p>
        We implement reasonable security measures to protect your data from
        unauthorized access, loss, or misuse.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing of Information</h2>
      <p>We do not sell or rent personal data. We may share data only with:</p>
      <ul className="list-disc ml-6">
        <li>Payment processors</li>
        <li>Technical service providers</li>
        <li>Legal authorities if required by law</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
      <p>
        Cookies may be used to enhance website functionality and personalize
        user experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Children’s Privacy</h2>
      <p>
        Children may use QVerse Way services with parental or guardian consent.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Rights</h2>
      <ul className="list-disc ml-6">
        <li>Access your data</li>
        <li>Correct your data</li>
        <li>Request account deletion</li>
      </ul>

      <p className="mt-4">Contact: support@qverseway.com</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Policy Updates</h2>
      <p>
        We may update this Privacy Policy at any time. Continued use of QVerse Way
        means acceptance of the updated policy.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
