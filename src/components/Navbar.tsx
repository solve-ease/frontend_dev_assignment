import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white shadow-md p-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">MyBrand</div>

        {/* Desktop links */}
        <div className="space-x-4 hidden md:flex">
          <a href="#home" className="hover:text-blue-600">Home</a>
          <a href="#services" className="hover:text-blue-600">Services</a>
          <a href="#about" className="hover:text-blue-600">About</a>
        </div>

        {/* Mobile hamburger button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu" 
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <div className="md:hidden px-4 py-2 space-y-2">
          <a href="#home" className="block py-1 hover:text-blue-600">Home</a>
          <a href="#services" className="block py-1 hover:text-blue-600">Services</a>
          <a href="#about" className="block py-1 hover:text-blue-600">About</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
