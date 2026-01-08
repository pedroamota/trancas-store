export type TipoTranca = 'jumbo' | 'box-braids' | 'twist' | 'crochet';

export type CorTranca = 
  | 'preto'
  | 'castanho'
  | 'loiro'
  | 'ruivo'
  | 'colorido'
  | 'ombre';

export type TamanhoTranca = 'pequeno' | 'medio' | 'grande' | 'extra-grande';

export interface Produto {
  id: string;
  nome: string;
  tipo: TipoTranca;
  cor: CorTranca;
  tamanho: TamanhoTranca;
  preco: number;
  descricao: string;
  imagemUrl: string;
  emEstoque: boolean;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

export interface Filtros {
  tipo?: TipoTranca;
  cor?: CorTranca;
  tamanho?: TamanhoTranca;
}
