import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoimg from "../images/logoimage.png";
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Header = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => onLogout();

  return (
    <header className="w-screen top-0 bg-white text-black h-auto relative z-50 shadow-md py-1">
      <div className="flex items-center justify-between w-full relative">

        {/* Logo */}
        <div className="flex items-center space-x-2 ml-4">
          <Link to="/" className="text-2xl font-bold text-black flex items-center">
            <img
              src={logoimg}
              alt="Rentify Logo"
              className="object-cover mr-2 logo"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-semibold mr-4 text-xl">
          {!isLoggedIn && (
            <li className="list-none">
              <Link to="/Rent-Property" className="hover:text-blue-500">
                Browse Properties
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li className="list-none">
                <Link to="/" className="hover:text-blue-500">Home</Link>
              </li>
              <li className="list-none">
                <Link to="/list-property" className="hover:text-blue-500">List Your Property</Link>
              </li>
              <li className="list-none">
                <Link to="/rent-property" className="hover:text-blue-500">Rent Property</Link>
              </li>
              <li className="list-none">
                <Link to="/profile" className="hover:text-blue-500 flex items-center space-x-1">
                  <UserIcon className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </li>
              <li className="list-none">
                <button
                  onClick={handleLogout}
                  className="hover:text-blue-500 flex items-center space-x-1"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden mr-4">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`absolute top-full left-0 right-0 mt-2 bg-white text-black rounded-md shadow-md w-full py-2 z-20 transform transition-all duration-500 ease-in-out font-bold ${
            isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <ul className="flex flex-col space-y-2 px-4">
            {!isLoggedIn && (
              <li>
                <Link to="/Rent-Property" className="hover:text-blue-500">
                  Browse Properties
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/" className="hover:text-blue-500">Home</Link>
                </li>
                <li>
                  <Link to="/rent-property" className="hover:text-blue-500">Rent Property</Link>
                </li>
                <li>
                  <Link to="/list-property" className="hover:text-blue-500">List Your Property</Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-blue-500 flex items-center space-x-1">
                    <UserIcon className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-500 flex items-center space-x-1"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
