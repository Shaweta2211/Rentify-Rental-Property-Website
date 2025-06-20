import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/contact`, formData);

      if (response.status === 200) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormError(response.data.error);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFormError('Server error. Please try again later.');
    }
  };

  return (
    <div className="w-full py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Contact Us</h1>

        <div className="flex flex-col md:flex-row gap-10 mb-16">
          {/* Left: Info and Map */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600">
              We would love to hear from you! Whether you have a question, suggestion, or just want to say hello,
              feel free to reach out using the form below.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">📍</span>
                <p className="text-gray-600">Connaught Place, New Delhi, India</p>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">📞</span>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">✉️</span>
                <p className="text-gray-600">contact@rentify.com</p>
              </div>
            </div>

            <div className="w-full h-64 mt-6 rounded-lg overflow-hidden">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83924124616!2d77.0688997!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0db20f6fb1%3A0xa2e5bdb3c5c210c9!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001%2C%20India!5e0!3m2!1sen!2sin!4v1686567745642!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>

            {isSubmitted && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                <p>Thank you for reaching out! We will get back to you shortly.</p>
              </div>
            )}

            {formError && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                <p>{formError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
