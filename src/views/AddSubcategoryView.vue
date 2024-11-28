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
            :onDelete="(indexSub: number) => { removeSubcategory(index, indexSub) }" />
        </transition-group>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import SubcategoriaItem from '@/components/CardSubcategoryComponent.vue'; // Importa o componente CategoryIte
import HeaderCustom from '@/components/HeaderCustomComponent.vue'; // Importa o Header
import SubCategoryModel from '@/models/subcategory_model';
import { useCategoryStore } from '@/stores/category_store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// Instância do Vue Router
const router = useRouter();



// Acessa a store do Pinia
const categoryStore = useCategoryStore();

// Computed para acessar as categorias da store
const categorias = computed(() => categoryStore.getCategory);

// Função para adicionar categoria (com integração ao Pinia)
function adicionarSubcategoria(value: string, index: number) {
  // Solicita o nome da nova subcategoria
  const novoNome = value;

  if (novoNome && novoNome.trim() !== '') {
    // Faz uma cópia da lista de categorias para preservar a imutabilidade
    const categoriasAtualizadas = [...categorias.value];

    // Adiciona a nova subcategoria dentro da categoria correspondente
    if (!categoriasAtualizadas[index].subCategory) {
      // Garante que a subCategory exista como um array
      categoriasAtualizadas[index].subCategory = [];
    }
    categoriasAtualizadas[index].subCategory.push(new SubCategoryModel('', novoNome.trim()));

    // Atualiza o store ou estado com as categorias atualizadas
    categoryStore.setCategories(categoriasAtualizadas);
    console.log("Due certoo");
  }
}
// // Função para adicionar uma nova subcategoria
// const addSubcategory = (): void => {
//   const newSubcategory = prompt("Digite o nome da nova subcategoria:");
//   if (newSubcategory) {
//     subcategories.value.push(newSubcategory);
//   }
// };

// Função para remover uma subcategoria pelo índice
const removeSubcategory = (indexC: number, indexSub: number): void => {
  console.log(indexC, indexSub)
  const categoriasAtualizadas = [...categorias.value];
  categoriasAtualizadas[indexC].subCategory.splice(indexSub, 1);

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
