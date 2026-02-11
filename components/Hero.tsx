import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative bg-bakery-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-60"
          src="https://picsum.photos/id/431/1920/1080" 
          alt="Panadería Artesanal"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bakery-900/90 to-transparent mix-blend-multiply" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[600px]">
        <h1 className="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 shadow-black drop-shadow-lg">
          El Arte de lo <br/>
          <span className="text-accent-500">Simple y Natural</span>
        </h1>
        <p className="mt-6 text-xl text-bakery-100 max-w-xl font-light leading-relaxed">
          Pan de masa madre fermentado lentamente, repostería sin culpas y ingredientes que nutren. 
          Descubre el equilibrio perfecto entre salud y sabor.
        </p>
        <div className="mt-10 max-w-sm sm:flex sm:max-w-none">
          <button
            onClick={onCtaClick}
            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-bakery-900 bg-bakery-50 hover:bg-accent-500 hover:text-white transition-all duration-300 md:text-lg md:px-10 shadow-lg"
          >
            Ver Menú del Día
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;