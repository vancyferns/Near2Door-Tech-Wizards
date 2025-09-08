import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

// ShopLogo (unchanged)
const ShopLogo = ({ name, imageUrl, onClick }) => {
  const initials = name ? name[0].toUpperCase() : 'S';
  return (
    <div
      onClick={onClick}
      className="relative w-12 h-12 flex items-center justify-center rounded-full overflow-hidden font-bold text-lg text-white bg-lime-600 border-2 border-lime-400 cursor-pointer"
    >
      {imageUrl ? (
        <img src={imageUrl} alt="Shop Profile" className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

const Header = ({ onNavigate, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, shopProfile } = useAuth();
  const role = user?.role || 'guest';

  const publicLinks = [
    { name: 'Home', path: 'landing' },
    { name: 'About', path: 'about' },
    { name: 'How It Works', path: 'how-it-works' },
  ];

  const privateLinks = (userRole) => {
    switch (userRole) {
      case 'shop':
        return [{ name: 'Dashboard', path: 'shop-dashboard' }];
      case 'customer':
        return [
          { name: 'Dashboard', path: 'customer-dashboard' },
          { name: 'Browse Shops', path: 'browse-shops' },
          { name: 'Cart', path: 'cart' },
        ];
      case 'admin':
        return [{ name: 'Admin Dashboard', path: 'admin-dashboard' }];
      case 'agent':
        return [{ name: 'Agent Dashboard', path: 'agent-dashboard' }];
      default:
        return [];
    }
  };

  const links = user ? [...publicLinks, ...privateLinks(role)] : publicLinks;

  const handleLinkClick = (path) => {
    onNavigate(path);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const getUserProfile = () => {
    if (user?.role === 'shop') {
      return { name: shopProfile?.name, imageUrl: shopProfile?.profileImage };
    } else {
      return { name: user?.name || user?.email, imageUrl: null };
    }
  };
  const profile = getUserProfile();

  return (
    <header className="bg-gray-900 text-white shadow-2xl sticky top-0 z-50">
      <nav className="flex items-center justify-between flex-wrap p-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <button onClick={() => onNavigate('landing')} className="flex items-center">
            <span className="font-extrabold text-2xl tracking-tight text-lime-400 drop-shadow-lg">
              Near2Door
            </span>
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 border rounded text-lime-400 border-lime-400 hover:text-lime-400 hover:border-lime-400 transition"
          >
            <svg
              className="fill-current h-5 w-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/* Links and User Controls */}
        <div className="hidden lg:flex lg:items-center lg:w-auto w-full">
          {/* Desktop Links */}
          <div className="text-base flex flex-row items-center space-x-6 font-bold flex-grow justify-center">
            {links.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link.path)}
                className="text-white font-bold px-4 py-2 rounded transition duration-300 hover:text-lime-400 hover:bg-slate-800 focus:outline-none"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop User Controls */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm px-2 py-1 bg-lime-400 text-slate-900 rounded-full font-bold">
                  {user.role}
                </span>
                <div className="relative">
                  <ShopLogo
                    name={profile.name}
                    imageUrl={profile.imageUrl}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  />
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                      {role === 'shop' && (
                        <button
                          onClick={() => handleLinkClick('manage-shop-profile')}
                          className="block w-full text-left px-4 py-2 hover:bg-lime-100"
                        >
                          Profile
                        </button>
                      )}
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleLinkClick('signin')}
                  className="inline-block text-sm px-4 py-2 border-2 rounded-lg text-white border-lime-400 bg-slate-900 hover:text-lime-400 hover:border-lime-400 hover:bg-slate-800 font-bold transition duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleLinkClick('signup')}
                  className="inline-block text-sm px-4 py-2 border-2 rounded-lg text-white border-lime-400 bg-lime-600 hover:text-lime-400 hover:border-lime-400 hover:bg-lime-700 font-bold transition duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-900 shadow-lg px-6 pb-6"
          >
            <div className="flex flex-col items-center space-y-4 font-bold">
              {links.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.path)}
                  className="w-full text-center text-white font-bold px-4 py-2 rounded transition duration-300 hover:text-lime-400 hover:bg-slate-800"
                >
                  {link.name}
                </button>
              ))}

              {/* Mobile User Controls */}
              {user ? (
                <>
                  <span className="text-sm px-2 py-1 bg-lime-400 text-slate-900 rounded-full font-bold">
                    {user.role}
                  </span>
                  <button
                    onClick={onLogout}
                    className="w-full text-center px-4 py-2 text-red-600 hover:bg-red-100 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleLinkClick('signin')}
                    className="w-full text-center px-4 py-2 border-2 rounded-lg text-white border-lime-400 bg-slate-900 hover:text-lime-400 hover:border-lime-400 hover:bg-slate-800 font-bold transition duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleLinkClick('signup')}
                    className="w-full text-center px-4 py-2 border-2 rounded-lg text-white border-lime-400 bg-lime-600 hover:text-lime-400 hover:border-lime-400 hover:bg-lime-700 font-bold transition duration-300"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
