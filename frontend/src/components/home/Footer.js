import React from 'react';

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-4 mb-0">
      <div className="container mx-auto px-4">
        <p className="text-center text-xl">
          &copy; {year} BahirDar University all rights reserved 
        </p>
        <p className="text-center text-xl">
          developed by boost plc partner
        </p>
      </div>
    </footer>
  );
};

export default Footer;