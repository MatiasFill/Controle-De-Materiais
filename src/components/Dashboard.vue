<template>
  <!-- Este é o contêiner principal da seção de dashboard, com estilo de card. -->
  <!-- Utiliza classes Tailwind para fundo branco, cantos arredondados, sombra e espaçamento responsivo. -->
  <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
    <!-- Título principal da página. -->
    <h2 class="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-6">Visão Geral do Estoque</h2>

    <!-- Grid para os cards de estatísticas. O layout se adapta a diferentes tamanhos de tela. -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card: Total de Produtos. -->
      <!-- O estilo do card é definido com classes de fundo, borda e sombra. -->
      <div class="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-200">
        <h3 class="text-lg font-semibold text-indigo-800">Total de Produtos</h3>
        <!-- Exibe o número total de produtos, calculado pela propriedade computada `totalProducts`. -->
        <p class="text-4xl font-bold text-indigo-600 mt-2">{{ totalProducts }}</p>
      </div>

      <!-- Card: Itens de Baixo Estoque. -->
      <div class="bg-orange-50 p-6 rounded-xl shadow-md border border-orange-200">
        <h3 class="text-lg font-semibold text-orange-800">Itens de Baixo Estoque</h3>
        <!-- Exibe a contagem de produtos com baixo estoque, calculada por `lowStockItems`. -->
        <p class="text-4xl font-bold text-orange-600 mt-2">{{ lowStockItems }}</p>
      </div>

      <!-- Card: Valor Total do Estoque. -->
      <div class="bg-green-50 p-6 rounded-xl shadow-md border border-green-200">
        <h3 class="text-lg font-semibold text-green-800">Valor Total do Estoque</h3>
        <!-- Exibe o valor total do estoque, formatado como moeda pela propriedade `formattedTotalValue`. -->
        <p class="text-4xl font-bold text-green-600 mt-2">{{ formattedTotalValue }}</p>
      </div>
    </div>

    <!-- Seção de botões. -->
    <div class="mt-8 text-center">
      <!-- O `router-link` é um componente do Vue Router que cria um link para outra rota. -->
      <!-- Ele navega para a rota '/products' quando clicado. -->
      <router-link
        to="/products"
        class="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
      >
        Gerenciar Produtos
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Importa `computed` para criar propriedades reativas e `useStockStore` para acessar o estado global do Pinia.
import { computed } from 'vue';
import { useStockStore } from '../stores/stock.js';

// Cria uma instância do store.
const store = useStockStore();

// Propriedade computada para calcular o número total de produtos.
const totalProducts = computed(() => store.products.length);

// Propriedade computada para calcular o número de itens com estoque abaixo de 10.
const lowStockItems = computed(() => {
  return store.products.filter(p => p.quantity < 10).length;
});

// Propriedade computada para calcular o valor total do estoque.
const totalValue = computed(() => {
  return store.products.reduce((acc, product) => acc + (product.quantity * product.price), 0);
});

// Propriedade computada para formatar o valor total para a moeda brasileira (BRL).
const formattedTotalValue = computed(() => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue.value);
});
</script>
