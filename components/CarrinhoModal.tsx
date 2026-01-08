'use client';

import { X, Plus, Minus, Trash2, Send } from 'lucide-react';
import { useCarrinho } from '@/context/CarrinhoContext';
import { useEffect } from 'react';

interface CarrinhoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CarrinhoModal({ isOpen, onClose }: CarrinhoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const {
    itens,
    removerDoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    totalPreco,
    limparCarrinho,
  } = useCarrinho();

  const finalizarCompra = () => {
    if (itens.length === 0) return;

    let mensagem = '🛍️ *Olá! Gostaria de fazer um pedido:*\n\n';
    
    itens.forEach((item, index) => {
      mensagem += `*${index + 1}. ${item.produto.nome}*\n`;
      mensagem += `   • Quantidade: ${item.quantidade}\n`;
      mensagem += `   • Tipo: ${item.produto.tipo}\n`;
      mensagem += `   • Cor: ${item.produto.cor}\n`;
      mensagem += `   • Tamanho: ${item.produto.tamanho}\n`;
      mensagem += `   • Valor: R$ ${(item.produto.preco * item.quantidade).toFixed(2)}\n\n`;
    });

    mensagem += `💰 *Total: R$ ${totalPreco.toFixed(2)}*\n\n`;
    mensagem += '📍 Aguardo informações sobre entrega e pagamento!';

    // Substitua pelo seu número do WhatsApp (formato: 5511999999999)
    const numeroWhatsApp = '5535988428827';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(urlWhatsApp, '_blank');
    limparCarrinho();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Meu Carrinho</h2>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {itens.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🛒</span>
              </div>
              <p className="text-gray-600 text-lg">Seu carrinho está vazio</p>
              <p className="text-gray-400 text-sm mt-2">Adicione produtos para continuar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {itens.map((item) => (
                <div
                  key={item.produto.id}
                  className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4 flex gap-4"
                >
                  <img
                    src={item.produto.imagemUrl}
                    alt={item.produto.nome}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{item.produto.nome}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.produto.tipo} • {item.produto.cor} • {item.produto.tamanho}
                    </p>
                    <p className="text-primary-600 font-bold">
                      R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removerDoCarrinho(item.produto.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center space-x-2 bg-white rounded-full shadow-md">
                      <button
                        onClick={() => diminuirQuantidade(item.produto.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-8 text-center">{item.quantidade}</span>
                      <button
                        onClick={() => aumentarQuantidade(item.produto.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {itens.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-700">Total:</span>
              <span className="text-3xl font-bold text-primary-600">
                R$ {totalPreco.toFixed(2)}
              </span>
            </div>
            
            <button
              onClick={finalizarCompra}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Send className="w-6 h-6" />
              <span>Finalizar no WhatsApp</span>
            </button>

            <button
              onClick={limparCarrinho}
              className="w-full mt-3 text-gray-600 hover:text-gray-800 py-2 text-sm font-medium transition-colors"
            >
              Limpar Carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
