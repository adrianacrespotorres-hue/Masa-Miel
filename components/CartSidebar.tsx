import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem,
  onUpdateQuantity 
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-bakery-50">
          <h2 className="text-lg font-serif font-bold text-bakery-900 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" /> Tu Pedido
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
              <ShoppingBag size={48} className="mb-4 text-bakery-200" />
              <p>Tu canasta está vacía.</p>
              <button onClick={onClose} className="mt-4 text-accent-600 font-medium hover:underline">
                Volver al menú
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex py-2 animate-fadeIn">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3 className="line-clamp-1">{item.name}</h3>
                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        <span className="px-2 py-1 text-gray-900 font-medium">{item.quantity}</span>
                        <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                        >
                            +
                        </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="font-medium text-red-500 hover:text-red-700 flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-6 bg-bakery-50">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mb-6">
              Impuestos y envío calculados al finalizar.
            </p>
            <button
              className="w-full flex items-center justify-center rounded-md border border-transparent bg-bakery-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-bakery-900 transition-colors"
            >
              Pagar Ahora
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;