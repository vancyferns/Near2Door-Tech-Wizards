import React from 'react';

const Footer = () => (
  <footer className="bg-slate-900 border-t border-slate-700 shadow-2xl text-gray-400 py-6 text-center mt-12 rounded-t-2xl">
    <p className="text-sm">&copy; {new Date().getFullYear()} Near2Door. All rights reserved.</p>
  </footer>
);

export default Footer;
