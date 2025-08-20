import React, { useContext } from 'react';
import { AppContext } from '../App';

const Header = ({ onNavigate }) => {
  const { userRole, clearAuthData } = useContext(AppContext);
  const handleLogout = () => {
    clearAuthData();
    onNavigate({ name: 'home' });
  };
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-400 cursor-pointer"
          onClick={() => onNavigate({ name: 'home' })}>
          Near2Door
        </h1>
        <nav className="flex items-center space-x-4">
          <button
              onClick={() => onNavigate({ name: 'home' })}
              className="text-white hover:text-yellow-400 transition-colors"
          >
              Home
          </button>
          <button
              onClick={() => onNavigate({ name: 'about' })}
              className="text-white hover:text-yellow-400 transition-colors"
          >
              About
          </button>
          {!userRole && (
            <>
              <button
                onClick={() => onNavigate({ name: 'login' })}
                className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md border-2 border-transparent hover:border-yellow-400 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate({ name: 'register' })}
                className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all"
              >
                Register
              </button>
            </>
          )}
          {userRole && (
            <>
              <span className="text-gray-300">Welcome, {userRole}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;