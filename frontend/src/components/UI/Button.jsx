import React from 'react';

const Button = ({ children, type = 'button', onClick, disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-500 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

export default Button;