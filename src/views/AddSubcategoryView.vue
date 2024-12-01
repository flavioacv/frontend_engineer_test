<template>
  <div class=" col-12 col-sm-10 col-md-8 col-lg-8  d-flex flex-column">
    <!-- Header -->
    <HeaderCustom title="Subcategoria" :iconBack=true :onClick="backButton" />

    <!-- Conteúdo -->
    <div class="text-center mt-4 flex-grow-1 d-flex flex-column justify-content-center align-items-bottom">
      <!-- Mensagem caso não haja categorias -->
      <p style="color: #737F9C;">
        Adicione as subcategorias abaixo das categorias pai
      </p>

      <!-- Lista de categorias -->
      <div v-if="categorias.length > 0" class="">
        <transition-group name="fade" tag="div">
          <SubcategoriaItem v-for="(categoria, index) in categorias" :key="index" :categoryName="categoria.name"
            :category="categoria" :onCreate="(value: string) => adicionarSubcategoria(value, index)"
            :onGetIdEdit="(index) => { editIndexCategory = index }"
            :onDelete="(indexSub: number) => { removeSubcategory(index, indexSub) }"
            :onEdit="(payload) => { editarSubcategoria(payload) }" :onTap="(parentId) => { onTap(parentId) }" />
        </transition-group>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import SubcategoriaItem from '@/components/CardSubcategoryComponent.vue'; // Importa o componente CategoryIte
import HeaderCustom from '@/components/HeaderCustomComponent.vue'; // Importa o Header
import type SubcategoryController from '@/controllers/subcategory_controller';
import { useCategoryStore } from '@/stores/category_store';
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

// Instância do Vue Router
const router = useRouter();

const subcategoryController = inject<SubcategoryController>('subcategoryController');

// Acessa a store do Pinia
const categoryStore = useCategoryStore();

const editIndexCategory = ref(0);

// Computed para acessar as categorias da store
const categorias = computed(() => categoryStore.getCategory);


// Função para adicionar categoria (com integração ao Pinia)
async function adicionarSubcategoria(value: string, index: number) {
  // Solicita o nome da nova subcategoria
  const novoNome = value;

  if (novoNome && novoNome.trim() !== '') {
    // Faz uma cópia da lista de categorias para preservar a imutabilidade


    if (!subcategoryController) {
      throw new Error('SubcategoryController não foi provido!');
    }
    await subcategoryController.createSubcategory(categorias.value[index].id, novoNome);
  }
}
// Editar categoria

async function editarSubcategoria(payload: { index: number, valueEdit: string }) {

  const { index, valueEdit } = payload;

  if (valueEdit && valueEdit.trim() !== '') {
    if (!subcategoryController) {
      throw new Error('CategoryController not provided');
    }
    await subcategoryController.updateSubcategory(editIndexCategory.value, index, valueEdit.trim());

  }
}

async function onTap(parentId: string) {
  if (!subcategoryController) {
    throw new Error('SubcategoryController não foi provido!');
  }
  await subcategoryController.loadSubcategories(parentId);
}

// Função para remover uma subcategoria pelo índice
async function removeSubcategory(indexC: number, indexSub: number) {
  // console.log(indexC, indexSub)
  // const categoriasAtualizadas = [...categorias.value];
  // categoriasAtualizadas[indexC].subCategory.splice(indexSub, 1);

  if (!subcategoryController) {
    throw new Error('SubcategoryController não foi provido!');
  }
  await subcategoryController.deleteSubcategory(indexC, indexSub);

};


// Função para navegar para outra rota
const backButton = () => {
  router.push({ name: 'Category' }); // Nome da rota (deve estar definida no seu arquivo de rotas)
};
</script>

<style>
/* Ajustes opcionais para garantir responsividade */
.container {
  max-width: 480px;
}

.btn-enabled {
  background-color: #DA3468;
  color: white;
  border: none;
  font-weight: 600;
}

/* Estilo para o estado "disable" */
.btn-disabled {
  background-color: #DDE2EF;
  color: #8693B4;
  border: none;
  font-weight: 600;
}

/* Ajuste para garantir centralização */
.flex-grow-1 {
  flex-grow: 1;
}

.text-center {
  text-align: center;
}

/* Transições suaves para adicionar/remover categorias */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Placeholder inativo (padrão) */
input::placeholder {
  color: #8693B4 !important;
  opacity: 1;
  /* Garante opacidade total */
}

/* Placeholder ativo (quando o campo está em foco) */
input:focus::placeholder {
  color: black;
  opacity: 1;
  /* Garante opacidade total */
}
</style>
