import { defineStore } from 'pinia'; // Importa a função defineStore do Pinia

// Define e exporta o store, dando a ele o nome único 'stock'
export const useStockStore = defineStore('stock', {
  // A seção 'state' define o estado (dados) do seu store
  state: () => ({
    // O array 'products' agora é inicializado como vazio
    products: [],
  }),
  // A seção 'actions' define as funções que modificam o estado
  actions: {
    // Adiciona um novo produto ao array 'products'
    addProduct(product) {
      // Cria um novo objeto com os dados do produto. Adiciona um ID baseado no timestamp para simulação.
      this.products.push({ ...product, id: Date.now() });
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
    // Ação para buscar produtos, simulando uma chamada de API
    fetchProducts() {
      // Dados simulados para preencher o store
      const fetchedData = [
        { id: 1, name: 'Caneta Azul', sku: 'AZ001', quantity: 150, price: 2.50 },
        { id: 2, name: 'Caderno Grande', sku: 'CAD002', quantity: 50, price: 15.00 },
        { id: 3, name: 'Lápis de Cor (12 cores)', sku: 'LAPIS-CORES', quantity: 70, price: 12.00 },
        { id: 4, name: 'Régua de 30cm', sku: 'REGUA-30CM', quantity: 25, price: 3.50 },
        { id: 5, name: 'Corretivo Líquido', sku: 'CORR-LIQ', quantity: 9, price: 5.80 },
        { id: 6, name: 'Tesoura Sem Ponta', sku: 'TESOURA-001', quantity: 40, price: 8.90 },
      ];
      // Atribui os dados buscados ao estado do store
      this.products = fetchedData;
    }
  },
});
