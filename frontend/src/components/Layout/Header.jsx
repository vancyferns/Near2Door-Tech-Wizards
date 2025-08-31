import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onNavigate, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const role = user ? user.role : 'guest';

  // These links are always available
  const publicLinks = [
    { name: 'Home', path: 'landing' },
    { name: 'About', path: 'about' },
    { name: 'How It Works', path: 'how-it-works' },
  ];

  // Links shown only for logged-in users depending on role
  const privateLinks = (userRole) => {
    switch (userRole) {
      case 'shop':
        return [
          { name: 'Dashboard', path: 'shop-dashboard' },
          { name: 'Products', path: 'manage-products' },
        ];
      case 'customer':
        return [
          { name: 'Dashboard', path: 'customer-dashboard' },
          { name: 'Browse Shops', path: 'browse-shops' },
        ];
      case 'admin':
        return [
          { name: 'Admin Dashboard', path: 'admin-dashboard' },
        ];
      case 'agent': // ✅ Added for delivery agents
        return [
          { name: 'Agent Dashboard', path: 'agent-dashboard' },
        ];
      default:
        return [];
    }
  };

  const links = user ? [...publicLinks, ...privateLinks(role)] : publicLinks;

  const handleLinkClick = (path) => {
    onNavigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg">
      <nav className="flex items-center justify-between flex-wrap">
        {/* Logo / Brand */}
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Near2Door</span>
        </div>

        {/* Mobile menu toggle */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            isMenuOpen ? '' : 'hidden'
          }`}
        >
          <div className="text-sm lg:flex-grow">
            {links.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link.path)}
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 p-2 transition duration-300"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* User controls */}
          <div className="relative">
            {user ? (
              <div className="flex items-center mt-4 lg:mt-0">
                <span className="text-gray-300 mr-4 text-sm hidden sm:block">
                  Hello, {user.email}
                </span>
                <span className="text-sm px-2 py-1 bg-gray-700 rounded-full mr-2 hidden sm:block">
                  {user.role}
                </span>
                <button
                  onClick={onLogout}
                  className="inline-block text-sm px-4 py-2 leading-none border rounded-lg text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 mt-4 lg:mt-0">
                <button
                  onClick={() => handleLinkClick('signin')}
                  className="inline-block text-sm px-4 py-2 leading-none border rounded-lg text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white transition duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleLinkClick('signup')}
                  className="inline-block text-sm px-4 py-2 leading-none border rounded-lg text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white transition duration-300"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
