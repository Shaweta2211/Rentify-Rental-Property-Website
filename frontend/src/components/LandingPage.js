// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Pic1 from '../images/imag3.jpg';
import Pic2 from '../images/img2.jpeg';
import Pic3 from '../images/img1.avif';
import '../App.css';

const LandingPage = () => {
  const settings = {
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    pauseOnHover: false,
  };

  return (
    <div className="flex flex-col flex-grow">
      {/* Autoplay Carousel */}
      <div className="w-full h-[500px]">
        <Slider {...settings}>
          <div>
            <img
              src={Pic1}
              alt="Pic1"
              className="w-full h-[500px] object-cover"
              draggable={false}
            />
          </div>
          <div>
            <img
              src={Pic2}
              alt="Pic2"
              className="w-full h-[500px] object-cover"
              draggable={false}
            />
          </div>
          <div>
            <img
              src={Pic3}
              alt="Pic3"
              className="w-full h-[500px] object-cover"
              draggable={false}
            />
          </div>
        </Slider>
      </div>

      {/* Buttons and Text */}
      <div className="text-center my-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-5">Find Your Perfect Rental</h1>
        <p className="text-stone-800 mb-8">
          Browse through thousands of properties and book your dream rental with ease.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-x-4 md:space-y-0">
          <Link
            to="/rent-property"
            className="bg-blue-500 hover:bg-blue-600 text-white h-12 w-40 flex items-center justify-center rounded"
          >
            Rent a Property
          </Link>
          <Link
            to="/list-property"
            className="bg-gray-500 hover:bg-gray-600 text-white h-12 w-40 flex items-center justify-center rounded"
          >
            List Your Property
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
