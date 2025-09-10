import { defineStore } from 'pinia'; // Importa a função defineStore do Pinia

// Define e exporta o store, dando a ele o nome único 'products'
export const useProductStore = defineStore('products', {
  // A seção 'state' define o estado (dados) do seu store
  state: () => ({
    // 'products' é um array que armazena a lista de produtos
    products: [
      { id: 1, name: 'Lápis Faber-Castell', sku: 'LAPIS-001', quantity: 200, price: 1.50 },
      { id: 2, name: 'Caneta Bic Preta', sku: 'CANT-002', quantity: 15, price: 1.20 },
      { id: 3, name: 'Borracha Mercur', sku: 'BORRA-003', quantity: 5, price: 0.80 },
      { id: 4, name: 'Caderno 10 Matérias', sku: 'CAD-004', quantity: 50, price: 22.90 },
      { id: 5, name: 'Post-it Amarelo', sku: 'POST-005', quantity: 90, price: 4.50 },
      { id: 6, name: 'Grampeador Grande', sku: 'GRAM-006', quantity: 8, price: 18.00 },
    ],
    // 'nextId' é uma variável para gerar IDs únicos para novos produtos
    nextId: 7,
  }),
  // A seção 'actions' define as funções que modificam o estado
  actions: {
    // Adiciona um novo produto ao array 'products'
    addProduct(product) {
      // Cria um novo objeto com os dados do produto e adiciona um novo ID
      this.products.push({ ...product, id: this.nextId++ });
    },
    // Atualiza um produto existente no array
    updateProduct(updatedProduct) {
      // Encontra o índice do produto com o mesmo ID
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      // Se o produto for encontrado, ele é substituído pelos dados atualizados
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
    },
    // Deleta um produto do array com base no seu ID
    deleteProduct(productId) {
      // Cria um novo array que exclui o produto com o ID fornecido
      this.products = this.products.filter(p => p.id !== productId);
    },
  },
});
// Agora você pode usar este store em seus componentes Vue para gerenciar produtos