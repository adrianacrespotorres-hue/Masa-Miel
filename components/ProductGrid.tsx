import React, { useState } from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  const [filter, setFilter] = useState<'all' | 'pan' | 'dulce' | 'saludable'>('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'pan', label: 'Panadería' },
    { id: 'dulce', label: 'Dulces' },
    { id: 'saludable', label: 'Saludable' },
  ];

  return (
    <section id="menu" className="py-16 bg-bakery-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-bakery-900 sm:text-4xl">
            Nuestros Horneados
          </h2>
          <p className="mt-4 text-bakery-600 max-w-2xl mx-auto">
            Preparados cada mañana con ingredientes locales y orgánicos.
          </p>
          
          {/* Filters */}
          <div className="mt-8 flex justify-center space-x-2 sm:space-x-4 flex-wrap gap-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat.id
                    ? 'bg-bakery-800 text-white shadow-md'
                    : 'bg-white text-bakery-600 hover:bg-bakery-200 border border-bakery-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
              {/* Image */}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  {product.tags.map(tag => (
                     <span key={tag} className="bg-white/90 backdrop-blur-sm text-bakery-800 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-sm">
                       {tag}
                     </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-bakery-900 font-serif">
                    {product.name}
                  </h3>
                  <p className="text-lg font-medium text-accent-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-bakery-600 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                
                <div className="mt-6 flex items-center justify-between">
                   <span className="text-xs text-bakery-400">
                     {product.calories} kcal
                   </span>
                   <button
                    onClick={() => onAddToCart(product)}
                    className="flex items-center space-x-2 bg-bakery-100 hover:bg-bakery-800 hover:text-white text-bakery-800 px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                   >
                     <Plus size={16} />
                     <span>Agregar</span>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;