'use client';

import { ShoppingCart, Sparkles } from 'lucide-react';
import { useCarrinho } from '@/context/CarrinhoContext';
import { useState } from 'react';
import CarrinhoModal from './CarrinhoModal';

export default function Header() {
  const { totalItens } = useCarrinho();
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Tranças Divinas</h1>
                <p className="text-xs md:text-sm text-white/90">Beleza Natural, Estilo Único</p>
              </div>
            </div>
            
            <button
              onClick={() => setMostrarCarrinho(true)}
              className="relative bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItens > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                  {totalItens}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CarrinhoModal 
        isOpen={mostrarCarrinho} 
        onClose={() => setMostrarCarrinho(false)} 
      />
    </>
  );
}
