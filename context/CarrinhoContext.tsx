'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ItemCarrinho, Produto } from '@/types';

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (produtoId: string) => void;
  aumentarQuantidade: (produtoId: string) => void;
  diminuirQuantidade: (produtoId: string) => void;
  limparCarrinho: () => void;
  totalItens: number;
  totalPreco: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.produto.id === produto.id);
      
      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      
      return [...itensAtuais, { produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId: string) => {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.produto.id !== produtoId));
  };

  const aumentarQuantidade = (produtoId: string) => {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const diminuirQuantidade = (produtoId: string) => {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === produtoId && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);
  const totalPreco = itens.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        limparCarrinho,
        totalItens,
        totalPreco,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (context === undefined) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
}
