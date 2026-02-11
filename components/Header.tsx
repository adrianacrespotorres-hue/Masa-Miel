import React from 'react';
import { ShoppingBag, Menu, Croissant } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onMenuClick, onLogoClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-bakery-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button - Hidden on Desktop */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={onMenuClick} 
              className="text-bakery-700 hover:text-bakery-900 p-2 rounded-md focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={onLogoClick}>
            <div className="bg-bakery-100 p-2 rounded-full mr-3 group-hover:bg-bakery-200 transition-colors">
              <Croissant className="text-bakery-800" size={28} />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-bakery-800 tracking-tight">Masa & Miel</h1>
              <p className="text-xs text-bakery-600 tracking-widest uppercase">Artesanal & Consciente</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={onLogoClick} className="text-bakery-600 hover:text-accent-600 font-medium transition-colors">Inicio</button>
            <button onClick={onMenuClick} className="text-bakery-600 hover:text-accent-600 font-medium transition-colors">Menú</button>
            <a href="#about" className="text-bakery-600 hover:text-accent-600 font-medium transition-colors">Nosotros</a>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-bakery-700 hover:text-accent-600 transition-colors focus:outline-none"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;