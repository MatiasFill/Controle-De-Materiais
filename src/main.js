import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Importa os estilos principais do projeto, incluindo as diretivas do Tailwind CSS.
import './assets/style.css';

// Cria a instância da aplicação Vue.
const app = createApp(App);

// Adiciona o Pinia para gerenciamento de estado global.
const pinia = createPinia();
app.use(pinia);

// Adiciona o Vue Router para gerenciar a navegação entre as páginas.
app.use(router);

// Monta a aplicação no elemento <div id="app"> do index.html.
app.mount('#app');




/*
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
*/