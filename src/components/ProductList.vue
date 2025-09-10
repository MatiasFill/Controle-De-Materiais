<template>
  <div>
    <!-- Seção do cabeçalho com título e botões de ação -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-4 sm:mb-0">Lista de Produtos</h2>
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <!-- Botão para abrir o modal de adição de produto. O parâmetro "null" indica que é um novo produto. -->
        <button
          @click="openModal(null)"
          class="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          + Adicionar Produto
        </button>
        <!-- Botão para gerar o relatório em PDF. Chama a função generatePDF. -->
        <button
          @click="generatePDF"
          class="bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
        >
          Gerar Relatório (PDF)
        </button>
        <!-- Botão para alternar a visibilidade do card de totais. O texto muda dinamicamente. -->
        <button
          @click="showTotalsCard = !showTotalsCard"
          class="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
        >
          {{ showTotalsCard ? 'Ocultar Totais' : 'Ver Totais' }}
        </button>
      </div>
    </div>
    
    <!-- Card de Totais. Exibido ou ocultado com base no valor de showTotalsCard. -->
    <div v-if="showTotalsCard" class="bg-indigo-50 p-6 rounded-2xl shadow-xl mb-6 border border-indigo-200 transition-all duration-300 transform scale-100">
      <h3 class="text-xl font-bold text-indigo-800 mb-4">Resumo do Estoque</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col">
          <span class="text-lg font-semibold text-indigo-700">Total de Produtos</span>
          <!-- Exibe o número total de produtos filtrados. -->
          <span class="text-3xl font-bold text-indigo-600 mt-1">{{ totalProducts }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-lg font-semibold text-indigo-700">Valor Total do Estoque</span>
          <!-- Exibe o valor total do estoque, formatado como moeda. -->
          <span class="text-3xl font-bold text-indigo-600 mt-1">{{ formattedTotalValue }}</span>
        </div>
      </div>
    </div>

    <!-- Barra de Pesquisa. O v-model vincula o valor do input à variável searchQuery. -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        placeholder="Pesquisar produtos..."
        class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>

    <!-- Tabela de Produtos VISÍVEL na tela -->
    <div id="product-table-container" class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-blue-100">
            <tr>
              <!-- Cabeçalhos da tabela. Algumas colunas são ocultadas em telas menores (sm, md). -->
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider hidden sm:table-cell"
              >
                SKU
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider"
              >
                Quantidade
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider hidden md:table-cell"
              >
                Preço
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Loop para renderizar cada produto filtrado. A chave :key ajuda o Vue a rastrear cada item. -->
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ product.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {{ product.sku }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <!-- Estilo dinâmico com base na quantidade. Fica vermelho se for < 10, verde se for >= 10. -->
                <span
                  :class="{'text-red-500 font-bold': product.quantity < 10, 'text-green-600 font-bold': product.quantity >= 10}"
                >
                  {{ product.quantity }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                {{ formatPrice(product.price) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <!-- Botão de edição. Abre o modal com os dados do produto clicado. -->
                <button
                  @click="openModal(product)"
                  class="text-blue-600 hover:text-blue-900 transition-colors"
                >
                  Editar
                </button>
                <!-- Botão de exclusão. Abre o modal de confirmação. -->
                <button
                  @click="confirmDelete(product.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                >
                  Excluir
                </button>
              </td>
            </tr>
            <!-- Linha exibida se a lista de produtos filtrados estiver vazia. -->
            <tr v-if="filteredProducts.length === 0">
              <td colspan="5" class="text-center py-8 text-gray-500">
                Nenhum produto encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Tabela de Produtos OCULTA. Usada exclusivamente para gerar o PDF, com um layout diferente. -->
    <div id="report-table-container" class="hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-blue-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
              Nome
            </th>
            <th class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
              Quantidade
            </th>
            <th class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
              Preço
            </th>
            <th class="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in filteredProducts" :key="product.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ product.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ product.quantity }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatPrice(product.price) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatPrice(product.price * product.quantity) }}
            </td>
          </tr>
          <tr>
              <td colspan="3" class="px-6 py-4 text-left text-base font-bold text-blue-800">Valor Total do Estoque:</td>
              <td class="px-6 py-4 text-right text-base font-bold text-blue-800">
                {{ formatPrice(totalValue) }}
              </td>
            </tr>
        </tbody>
      </table>
    </div>

    <!-- Componente modal para adicionar/editar produtos. O 'v-if' controla sua visibilidade. -->
    <ProductForm v-if="isModalOpen" :product="currentProduct" @close-modal="closeModal" />

    <!-- Componente de modal de confirmação para exclusão. O 'v-if' controla sua visibilidade. -->
    <ConfirmModal
      v-if="isConfirmModalOpen"
      message="Tem certeza que deseja excluir este produto?"
      @confirm="deleteConfirmed"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'; // Importa funcionalidades reativas do Vue
import { useProductStore } from '../stores/ProductStore.js'; // Importa o Pinia Store para gerenciar o estado
import ProductForm from './ProductForm.vue'; // Importa o componente do formulário
import ConfirmModal from './ConfirmModal.vue'; // Importa o componente do modal de confirmação
import jsPDF from 'jspdf'; // Importa a biblioteca para gerar PDF
import html2canvas from 'html2canvas'; // Importa a biblioteca para converter HTML em imagem

// Inicializa o store do Pinia
const store = useProductStore();

// Variáveis reativas (Refs) para gerenciar o estado da interface
const isModalOpen = ref(false); // Flag para abrir/fechar o modal de formulário
const isConfirmModalOpen = ref(false); // Flag para abrir/fechar o modal de confirmação
const currentProduct = ref(null); // Objeto do produto selecionado para edição
const productToDeleteId = ref(null); // ID do produto a ser excluído, temporariamente armazenado
const searchQuery = ref(''); // Armazena a string de pesquisa do usuário
const showTotalsCard = ref(false); // Flag para mostrar/ocultar o card de totais

// Propriedade computada para filtrar a lista de produtos
const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return store.products; // Retorna todos os produtos se a pesquisa estiver vazia
  }
  const query = searchQuery.value.toLowerCase();
  // Filtra a lista verificando se o nome ou SKU do produto inclui o texto da pesquisa
  return store.products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.sku.toLowerCase().includes(query)
  );
});

// Propriedade computada que retorna o número de produtos filtrados
const totalProducts = computed(() => filteredProducts.value.length);

// Propriedade computada que calcula o valor total do estoque dos produtos filtrados
const totalValue = computed(() => {
  return filteredProducts.value.reduce((acc, product) => acc + (product.quantity * product.price), 0);
});

// Propriedade computada que formata o valor total para o padrão monetário (BRL)
const formattedTotalValue = computed(() => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue.value);
});

// Função para abrir o modal de formulário
const openModal = (product = null) => {
  currentProduct.value = product; // Define o produto a ser editado (ou null para adição)
  isModalOpen.value = true;
};

// Função para fechar o modal de formulário
const closeModal = () => {
  isModalOpen.value = false;
  currentProduct.value = null; // Limpa o produto selecionado
};

// Função para abrir o modal de confirmação antes de excluir
const confirmDelete = (id) => {
  productToDeleteId.value = id;
  isConfirmModalOpen.value = true;
};

// Função para deletar um produto após a confirmação do usuário
const deleteConfirmed = () => {
  store.deleteProduct(productToDeleteId.value); // Chama a ação do store para excluir o produto
  isConfirmModalOpen.value = false; // Fecha o modal de confirmação
  productToDeleteId.value = null; // Limpa o ID do produto
};

// Função para cancelar a exclusão (fechar o modal de confirmação sem excluir)
const cancelDelete = () => {
  isConfirmModalOpen.value = false;
  productToDeleteId.value = null;
};

// Função utilitária para formatar valores numéricos como moeda
const formatPrice = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// Função assíncrona para gerar o PDF
const generatePDF = async () => {
  // Acessa o contêiner da tabela "escondida" no template
  const reportContainer = document.getElementById('report-table-container');

  // Temporariamente remove a classe 'hidden' para que o html2canvas possa "ver" e renderizar a tabela
  reportContainer.classList.remove('hidden');

  // Converte o contêiner HTML em uma imagem (canvas)
  const canvas = await html2canvas(reportContainer, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  // Adiciona a classe 'hidden' de volta para esconder a tabela novamente
  reportContainer.classList.add('hidden');

  // Cria um novo documento PDF com a biblioteca jsPDF
  const pdf = new jsPDF('p', 'mm', 'a4'); 
  const imgWidth = 200; 
  const imgHeight = (canvas.height * imgWidth) / canvas.width; 

  // Adiciona um título e a data de geração ao PDF
  pdf.setFontSize(22);
  pdf.text("Relatório de Estoque", 10, 20);
  pdf.setFontSize(10);
  pdf.text(`Gerado em: ${new Date().toLocaleDateString()}`, 10, 28);
  
  // Adiciona a imagem da tabela ao PDF
  pdf.addImage(imgData, 'PNG', 5, 35, imgWidth, imgHeight);

  // Salva o PDF no computador do usuário com o nome 'relatorio-estoque.pdf'
  pdf.save('relatorio-estoque.pdf');
};
</script>
