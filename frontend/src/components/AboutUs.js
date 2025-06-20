import React from 'react';
import propertyimg from "../images/propertyimage.webp";
import propertyimg1 from "../images/property1.avif";
import propertyimg2 from "../images/property2.avif";

const AboutUs = () => {
  return (
    <div className="w-full py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">About Us</h1>

        {/* Text on top, Full Image on bottom */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="w-full md:w-3/4 text-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">Welcome to Rentify!</h2>
            <p className="text-gray-600 mb-4">
              At Rentify, our mission is to make renting and listing properties as simple as possible.
            </p>
            <p className="text-gray-600">
              Our team is passionate about helping you navigate the rental process smoothly and efficiently.
            </p>
          </div>
          <div className="w-full">
            <img
              src={propertyimg}
              alt="About Us"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Our Vision Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <div className="md:w-1/2 text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              Our vision is to revolutionize the property rental market by offering a seamless and reliable experience
              to users. We aim to build a community where finding or listing a property is stress-free, efficient,
              and secure.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={propertyimg1}
              alt="Our Vision"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-16">
          <div className="md:w-1/2 text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h3>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>Easy-to-use platform for browsing and listing properties</li>
              <li>24/7 customer support</li>
              <li>Wide range of verified properties</li>
              <li>Secure and transparent transactions</li>
              <li>Simple and fast listing process</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <img
              src={propertyimg2}
              alt="Why Choose Us"
              className="w-full h-[350px] object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
