<template>
  <div class="col-12 d-flex flex-column">
    <!-- Header -->
    <Header title="Categorias" :iconBack=false />

    <!-- Conteúdo principal -->
    <div class=" text-start mt-4">
      <h2 class="fw-bold fs-5 mb-2">Organize seu catálogo com categorias e subcategorias</h2>
      <p class="text-secondary">
        Ao usar as categorias e subcategorias do catálogo, você ajuda seus clientes a encontrarem os produtos desejados.
      </p>
      <!-- Botão Criar Categorias -->
      <button 
        class="btn btn-custom rounded-pill d-flex align-items-center mt-4"
        @click="navegarParaCriarCategorias">
        Criar categorias
        <i class="bi bi-plus ms-2" style="font-size: 2rem"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue'; // Importa o Header



// Instância do Vue Router
const router = useRouter();

// Função para navegar para outra rota
const navegarParaCriarCategorias = () => {
  router.push({ name: 'AddCategory' }); // Nome da rota (deve estar definida no seu arquivo de rotas)
};
</script>

<style scoped>
/* Estilo para o botão personalizado */
.btn-custom {
  background-color: #fce4ec; /* Cor de fundo rosa claro */
  color: #da3468; /* Cor do texto */
  padding: 2px 20px;
  font-weight: bold;
  font-size: 14px;
  border: none;
}

h2 {
  color: #344054; /* Cor para o título */
}

.text-secondary {
  color: #667085; /* Cor para o texto secundário */
}
</style>