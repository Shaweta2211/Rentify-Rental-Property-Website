import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="w-full py-12 px-4 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-6 text-gray-600">
          At Rentify, your privacy is one of our top priorities. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to safeguard it.
        </p>

        <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc ml-6 mb-6 text-gray-600">
          <li>Personal information such as your name, email address, phone number, etc., submitted via forms.</li>
          <li>Technical data like IP address, browser type, device information, and usage data.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-6 text-gray-600">
          <li>To respond to your queries and provide customer support.</li>
          <li>To improve our services and website performance.</li>
          <li>To send promotional emails if you have opted in.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Data</h2>
        <p className="mb-6 text-gray-600">
          We do not sell or trade your personal information. We may share it with trusted third-party services to help operate our site, provided they keep it confidential.
        </p>

        <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
        <p className="mb-6 text-gray-600">
          Rentify uses cookies to enhance your user experience. You can disable cookies through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mb-2">5. Security</h2>
        <p className="mb-6 text-gray-600">
          We implement appropriate security measures to protect your data. However, no online method is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mb-2">6. Your Consent</h2>
        <p className="mb-6 text-gray-600">
          By using our website, you consent to this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mb-2">7. Changes to this Policy</h2>
        <p className="mb-6 text-gray-600">
          We may update this Privacy Policy occasionally. Changes will be posted on this page with a revised effective date.
        </p>

        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p className="text-gray-600">
          If you have questions regarding this Privacy Policy, please contact us at <strong>contact@rentify.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
