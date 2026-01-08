'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Filtros from '@/components/Filtros';
import ProdutoCard from '@/components/ProdutoCard';
import { produtos } from '@/data/produtos';
import { Filtros as FiltrosType } from '@/types';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [filtros, setFiltros] = useState<FiltrosType>({});

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      if (filtros.tipo && produto.tipo !== filtros.tipo) return false;
      if (filtros.cor && produto.cor !== filtros.cor) return false;
      if (filtros.tamanho && produto.tamanho !== filtros.tamanho) return false;
      return true;
    });
  }, [filtros]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10" />
              Sua Beleza, Seu Estilo
              <Sparkles className="w-10 h-10" />
            </h2>
            <p className="text-lg md:text-xl text-white/90">
              Tranças de qualidade premium para realçar sua beleza natural. 
              Escolha entre diversos estilos, cores e tamanhos!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Filtros */}
          <aside className="lg:col-span-1">
            <Filtros filtros={filtros} onFiltrosChange={setFiltros} />
          </aside>

          {/* Grid de Produtos */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'Produto' : 'Produtos'} Encontrados
              </h3>
              <p className="text-gray-600">
                {Object.keys(filtros).length === 0 
                  ? 'Mostrando todos os produtos' 
                  : 'Filtrando produtos por suas preferências'}
              </p>
            </div>

            {produtosFiltrados.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-5xl">😔</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar os filtros para ver mais opções
                </p>
                <button
                  onClick={() => setFiltros({})}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-xl font-bold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {produtosFiltrados.map((produto) => (
                  <ProdutoCard key={produto.id} produto={produto} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <h3 className="text-2xl font-bold">Tranças Divinas</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Celebrando a beleza natural da mulher negra
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Tranças Divinas. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
