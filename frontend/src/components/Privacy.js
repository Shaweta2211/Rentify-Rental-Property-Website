import React from 'react';
import img1 from "../images/privacy1.avif"; // Correct path to the image inside src/images
import img2 from "../images/privacy2.avif"; // Correct path to the image inside src/images
import img3 from "../images/privacy3.avif"; // Correct path to the image inside src/images
import img4 from "../images/privacy4.avif"; // Correct path to the image inside src/images

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: img1, // Using imported image
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li>Personal data like name, email, and contact details.</li>
          <li>Technical data including IP address, browser type, device ID, and location.</li>
          <li>Cookies and similar tracking technologies for improving site functionality.</li>
        </ul>
      ),
    },
    {
      title: "How We Use Your Information",
      icon: img2, // Using imported image
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li>To provide, operate, and maintain our services.</li>
          <li>To communicate updates, offers, or respond to inquiries.</li>
          <li>To analyze usage and improve user experience.</li>
        </ul>
      ),
    },
    {
      title: "Data Sharing",
      icon: img3, // Using imported image
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li>With trusted service providers under confidentiality agreements.</li>
          <li>When legally required (e.g., court orders or regulatory compliance).</li>
          <li>During business transitions such as mergers or acquisitions.</li>
        </ul>
      ),
    },
    {
      title: "Security",
      icon: img4, // Using imported image
      content: (
        <p>
          We use industry-standard encryption, access controls, and secure servers to protect your information. However, no method of transmission is 100% secure.
        </p>
      ),
    },
  ];

  return (
    <div className="w-full py-12 px-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Privacy Policy</h1>
        <p className="text-center text-gray-600 mb-12">
          Your privacy is important to us. Here's how we protect and manage your data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sections.map((section, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition bg-gray-50"
            >
              <div className="flex items-center mb-4">
                <img
                  src={section.icon}
                  alt={`${section.title} icon`}
                  className="w-20 h-20 mr-4" // Increased width and height to 20
                />
                <h2 className="text-2xl font-semibold">{section.title}</h2>
              </div>
              <div className="text-gray-600">{section.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
