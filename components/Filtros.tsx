'use client';

import { Filtros, TipoTranca, CorTranca, TamanhoTranca } from '@/types';
import { tiposTranca, coresTranca, tamanhosTranca } from '@/data/produtos';
import { X, Filter } from 'lucide-react';

interface FiltrosComponentProps {
  filtros: Filtros;
  onFiltrosChange: (filtros: Filtros) => void;
}

export default function FiltrosComponent({ filtros, onFiltrosChange }: FiltrosComponentProps) {
  const atualizarFiltro = (key: keyof Filtros, value: any) => {
    onFiltrosChange({
      ...filtros,
      [key]: filtros[key] === value ? undefined : value,
    });
  };

  const limparFiltros = () => {
    onFiltrosChange({});
  };

  const temFiltrosAtivos = Object.values(filtros).some(v => v !== undefined);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
        </div>
        {temFiltrosAtivos && (
          <button
            onClick={limparFiltros}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* Tipo de Trança */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Tipo</h3>
        <div className="space-y-2">
          {tiposTranca.map((tipo) => (
            <button
              key={tipo.value}
              onClick={() => atualizarFiltro('tipo', tipo.value)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                filtros.tipo === tipo.value
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tipo.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cor */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Cor</h3>
        <div className="grid grid-cols-3 gap-2">
          {coresTranca.map((cor) => (
            <button
              key={cor.value}
              onClick={() => atualizarFiltro('cor', cor.value)}
              className={`relative flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                filtros.cor === cor.value
                  ? 'ring-2 ring-primary-500 shadow-lg'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full shadow-md mb-2"
                style={{
                  background: cor.hex.includes('gradient') ? cor.hex : cor.hex,
                }}
              />
              <span className="text-xs text-gray-700 font-medium text-center">{cor.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tamanho */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Tamanho</h3>
        <div className="space-y-2">
          {tamanhosTranca.map((tamanho) => (
            <button
              key={tamanho.value}
              onClick={() => atualizarFiltro('tamanho', tamanho.value)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                filtros.tamanho === tamanho.value
                  ? 'bg-gradient-to-r from-secondary-500 to-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tamanho.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
