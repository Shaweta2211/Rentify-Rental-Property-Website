

import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Rentify</h2>
          <p className="text-sm text-gray-400">
            Your trusted rental platform for all kinds of properties. Safe, secure, and easy.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-gray-400">Home</a></li>
            <li><a href="/about-us" className="hover:text-gray-400">About</a></li>
            <li><a href="contact-us" className="hover:text-gray-400">Contact</a></li>
            <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <p className="text-sm text-gray-400">
            Email: support@rentify.com<br />
            Phone: +1 234 567 8901<br />
            Address: 123 Main Street, City, Country
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target='_blant' className="hover:text-gray-400"><i className="fab fa-facebook fa-lg"></i></a>
            <a href="https://x.com/"  target='_blant' className="hover:text-gray-400"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.instagram.com/"  target='_blant'  className="hover:text-gray-400"><i className="fab fa-instagram fa-lg"></i></a>
            <a href="https://in.linkedin.com/"   target='_blant'  className="hover:text-gray-400"><i className="fab fa-linkedin fa-lg"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Rentify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
