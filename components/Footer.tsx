import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bakery-900 text-bakery-100" id="about">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-serif font-bold text-white mb-4">Masa & Miel</h3>
          <p className="text-bakery-300 text-sm">
            Horneando con amor y consciencia desde 2015. Ingredientes orgánicos, procesos lentos y sabores inolvidables.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Horarios</h3>
          <ul className="space-y-2 text-sm text-bakery-300">
            <li>Lunes - Viernes: 7:00 AM - 8:00 PM</li>
            <li>Sábado: 8:00 AM - 6:00 PM</li>
            <li>Domingo: 9:00 AM - 2:00 PM</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-bakery-300 hover:text-white transition-colors"><Instagram /></a>
            <a href="#" className="text-bakery-300 hover:text-white transition-colors"><Facebook /></a>
            <a href="#" className="text-bakery-300 hover:text-white transition-colors"><Twitter /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-bakery-800 py-6 text-center text-xs text-bakery-500">
        &copy; {new Date().getFullYear()} Masa & Miel Panadería Artesanal. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;