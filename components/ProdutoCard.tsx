'use client';

import { Produto } from '@/types';
import { ShoppingCart, Check } from 'lucide-react';
import { useCarrinho } from '@/context/CarrinhoContext';
import { useState } from 'react';

interface ProdutoCardProps {
  produto: Produto;
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
  const { adicionarAoCarrinho, itens } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);

  const itemNoCarrinho = itens.find(item => item.produto.id === produto.id);

  const handleAdicionar = () => {
    adicionarAoCarrinho(produto);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-primary-100 to-secondary-100">
        <img
          src={produto.imagemUrl}
          alt={produto.nome}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!produto.emEstoque && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
              Fora de Estoque
            </span>
          </div>
        )}
        {itemNoCarrinho && (
          <div className="absolute top-3 right-3 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 animate-bounce">
            <span>{itemNoCarrinho.quantidade}</span>
            <ShoppingCart className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
            {produto.nome}
          </h3>
          <span className="text-2xl font-bold text-primary-600">
            R$ {produto.preco.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {produto.descricao}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
            {produto.tipo}
          </span>
          <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">
            {produto.cor}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
            {produto.tamanho}
          </span>
        </div>

        <button
          onClick={handleAdicionar}
          disabled={!produto.emEstoque || adicionado}
          className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 ${
            adicionado
              ? 'bg-green-500 text-white'
              : produto.emEstoque
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {adicionado ? (
            <>
              <Check className="w-5 h-5" />
              <span>Adicionado!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Adicionar ao Carrinho</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
