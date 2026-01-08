# 🌟 Tranças - E-commerce de Tranças

Desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## ✨ Funcionalidades

- 🔍 **Filtros Avançados**: Filtre por tipo de trança, cor e tamanho
- 🛒 **Carrinho de Compras**: Adicione, remova e gerencie quantidades
- 📱 **Responsivo**: Funciona em desktop e mobile
- 💬 **Integração WhatsApp**: Finalização de pedido direto no WhatsApp

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar WhatsApp

Abra o arquivo `components/CarrinhoModal.tsx` e altere o número do WhatsApp na linha 50:

```typescript
const numeroWhatsApp = 'SEU_NUMERO_AQUI'; // Formato: 5511999999999
```

### 3. Executar o Projeto

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 📦 Estrutura do Projeto

```
trancas-store/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   └── globals.css         # Estilos globais
├── components/
│   ├── Header.tsx          # Cabeçalho com carrinho
│   ├── Filtros.tsx         # Componente de filtros
│   ├── ProdutoCard.tsx     # Card de produto
│   └── CarrinhoModal.tsx   # Modal do carrinho
├── context/
│   └── CarrinhoContext.tsx # Gerenciamento de estado do carrinho
├── data/
│   └── produtos.ts         # Dados dos produtos (hardcoded)
├── types/
│   └── index.ts            # Tipos TypeScript
└── package.json
```

## 🎨 Personalização

### Adicionar Novos Produtos

Edite o arquivo `data/produtos.ts` e adicione novos produtos ao array:

```typescript
{
  id: '16',
  nome: 'Nome do Produto',
  tipo: 'jumbo', // jumbo | box-braids | twist | crochet
  cor: 'preto', // preto | castanho | loiro | ruivo | colorido | ombre
  tamanho: 'grande', // pequeno | medio | grande | extra-grande
  preco: 45.00,
  descricao: 'Descrição do produto',
  imagemUrl: 'URL_DA_IMAGEM',
  emEstoque: true,
}
```

### Alterar Cores do Tema

Edite `tailwind.config.ts` para mudar as cores principais:

```typescript
colors: {
  primary: { ... }, // Laranja/Coral
  secondary: { ... }, // Rosa/Roxo
}
```

## 📸 Adicionar Imagens dos Produtos

As imagens estão usando URLs do Unsplash como placeholder. Para adicionar suas próprias imagens:

1. Coloque as imagens na pasta `public/images/`
2. Altere a propriedade `imagemUrl` em `data/produtos.ts`:

```typescript
imagemUrl: '/images/minha-tranca.jpg'
```

## 🌈 Tipos de Filtros

- **Tipos**: Jumbo, Box Braids, Twist, Crochet
- **Cores**: Preto, Castanho, Loiro, Ruivo, Colorido, Ombré
- **Tamanhos**: Pequeno, Médio, Grande, Extra Grande

## 💡 Dicas

- A integração com WhatsApp envia automaticamente os detalhes do pedido
- O carrinho é mantido em memória (reinicia ao recarregar a página)
- Todas as cores e estilos podem ser personalizados no Tailwind
- Use imagens de alta qualidade para melhor apresentação

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **React Context** - Gerenciamento de estado

## 📝 Notas

Este é um projeto frontend apenas, sem backend. Todos os dados são hardcoded e o carrinho não persiste entre sessões. Para uma loja completa, considere adicionar:

- Backend com API
- Banco de dados
- Autenticação
- Sistema de pagamento
- Persistência do carrinho

---

Desenvolvido com 💜 para celebrar a beleza natural
