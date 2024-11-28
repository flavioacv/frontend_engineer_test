<template>
  <div class=" col-12 col-sm-10 col-md-8 col-lg-8 d-flex flex-column justify-content-center ">
    <!-- Header -->
    <HeaderCustom title="Categorias" />

    <!-- Conteúdo principal -->
    <div class=" text-start mt-4">
      <h2 class="fw-bold fs-5 mb-2" style="color: #31436F;">Organize seu catálogo com categorias e subcategorias</h2>
      <p style="color: #586893;font-weight: 500;">
        Ao usar as categorias e subcategorias do catálogo, você ajuda seus clientes a encontrarem os produtos desejados.
      </p>
      <!-- Botão Criar Categorias -->
      <button v-if="categorias.length === 0" class="btn btn-custom rounded-pill d-flex align-items-center mt-4"
        @click="navegarParaCriarCategorias">
        Criar categorias
        <i class="bi bi-plus ms-2" style="font-size: 2rem"></i>
      </button>
      <div v-else>
        <Menu @click="navegarParaCriarCategorias" categoryName="Categorias" :categoryCount="categorias.length"></Menu>
        <Menu @click="navegarParaCriarSubCategorias" categoryName="Subcategorias"></Menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/CategoryMenuComponent.vue';
import HeaderCustom from '@/components/HeaderCustomComponent.vue'; // Importa o Header
import { useCategoryStore } from '@/stores/category_store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';



// Instância do Vue Router
const router = useRouter();

// Acessa a store do Pinia
const categoryStore = useCategoryStore();

// Computed para acessar as categorias da store
const categorias = computed(() => categoryStore.getCategory);

// Função para navegar para outra rota
const navegarParaCriarCategorias = () => {
  router.push({ name: 'AddCategory' }); // Nome da rota (deve estar definida no seu arquivo de rotas)
};

const navegarParaCriarSubCategorias = () => {
  router.push({ name: 'AddSubcategory' }); // Nome da rota (deve estar definida no seu arquivo de rotas)
};
</script>

<style scoped>
/* Estilo para o botão personalizado */
.btn-custom {
  background-color: #fce4ec;
  /* Cor de fundo rosa claro */
  color: #da3468;
  /* Cor do texto */
  padding: 2px 20px;
  font-weight: bold;
  font-size: 14px;
  border: none;
}

h2 {
  color: #344054;
  /* Cor para o título */
}

.text-secondary {
  color: #667085;
  /* Cor para o texto secundário */
}
</style>
