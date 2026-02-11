import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import ProductGrid from './components/ProductGrid.tsx';
import CartSidebar from './components/CartSidebar.tsx';
import AIChat from './components/AIChat.tsx';
import Footer from './components/Footer.tsx';
import { Product, CartItem } from './types.ts';
import { PRODUCTS } from './constants.ts';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
        if (item.id === id) {
            return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
    }));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bakery-50 flex flex-col font-sans">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => scrollToSection('menu')}
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      
      <main className="flex-grow">
        <Hero onCtaClick={() => scrollToSection('menu')} />
        
        <ProductGrid 
          products={PRODUCTS} 
          onAddToCart={addToCart} 
        />
      </main>

      <Footer />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <AIChat />
    </div>
  );
};

export default App;