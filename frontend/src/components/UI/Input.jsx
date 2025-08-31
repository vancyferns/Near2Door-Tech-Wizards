import React from 'react';

const Input = ({ label, name, type = 'text', value, onChange, error }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={`shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all duration-300 ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

export default Input;