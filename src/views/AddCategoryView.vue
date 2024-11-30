<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class=" col-12 col-sm-10 col-md-8 col-lg-8  d-flex flex-column">
    <!-- Header -->
    <HeaderCustom title="Categorias" :iconBack=true :onClick="backButton" />

    <!-- Conteúdo -->
    <div class="text-center mt-4 flex-grow-1 d-flex flex-column justify-content-center align-items-bottom">
      <!-- Input para criar categoria -->
      <div class="w-100 d-flex mb-5">
        <input v-model="novaCategoria" type="text" class="form-control rounded-pill p-3 py-3 me-2" maxlength="48"
          style="border-color:#DDE2EF ; font-weight: 600;" placeholder="Crie uma categoria" />

        <button class="btn rounded-pill" style="padding: 10px 30px;"
          :class="novaCategoria === '' ? 'btn-disabled' : 'btn-enabled'" @click="adicionarCategoria">
          <span v-if="!isLoading">Criar</span>
          <span v-else>
            <i class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></i>
          </span>
        </button>
      </div>

      <!-- Mensagem caso não haja categorias -->
      <p v-if="categorias.length === 0" class=" mt-5" style="color: #8693B4;">
        <strong style="color: #586893;">Ainda não existem categorias criadas</strong><br />
        Digite no campo acima as categorias que <br> deseja criar
      </p>

      <!-- Lista de categorias -->
      <div v-if="categorias.length > 0" class="">
        <transition-group name="fade" tag="div">
          <div v-for="(categoria, index) in categorias" :key="index">
            <CategoryItem v-if="!isEditing[index]" :categoryName="categoria.name" :onEdit="() => toggleEdit(index)"
              :onDelete="() => removerCategoria(index)" />
            <div v-else class=" category-menu d-flex align-items-center justify-content-between p-3 mb-2 border">
              <!-- Modo de edição -->
              <div class=" d-flex align-items-center w-100 ">
                <input v-model="categoria.name" autofocus type="text" class="form-control p-2 no-focus-outline"
                  maxlength="48" style="border: none; font-weight: 600; " placeholder="Categoria" />
                <button @click="() => { toggleEdit(index) }" class="btn  me-1 rounded-pill"
                  style="background-color: #FFE2EB; color: #DA3468; border: none;">
                  <i class="bi bi-x"></i>
                </button>
                <button @click="() => { toggleEdit(index) }" class="btn btn-success rounded-pill"
                  style="background-color: #F24F82; border: none;">
                  <i class="bi bi-check2"></i>
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <ToastComponent :toast-message="toastMessage" :toast-class="toastClass"></ToastComponent>
  </div>
</template>

<script setup lang="ts">
import CategoryItem from '@/components/CategoryItemComponent.vue'; // Importa o componente CategoryItem
import HeaderCustom from '@/components/HeaderCustomComponent.vue'; // Importa o Header
import ToastComponent from '@/components/ToastComponent.vue'; // Importa o Header
import type CategoryController from '@/controllers/category_controller';
import { useCategoryStore } from '@/stores/category_store';
import * as bootstrap from 'bootstrap';
import { computed, inject, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

// Instância do Vue Router
const router = useRouter();

// Estado local
const novaCategoria = ref('');
const toastMessage = ref(''); // Mensagem que será exibida no Toast
const toastClass = ref('');

// Acessa a store do Pinia
const categoryStore = useCategoryStore();

// Computed para acessar as categorias da store
const categorias = computed(() => categoryStore.getCategory);
const isLoading = computed(() => categoryStore.isLoading);


const categoryController = inject<CategoryController>('categoryController');

// Controle de edição por categoria
const isEditing = ref<boolean[]>([]);

// Atualiza `isEditing` sempre que `categorias` muda
watch(categorias, (newCategorias) => {
  isEditing.value = new Array(newCategorias.length).fill(false);
}, { immediate: true });

watch(() => categoryStore.getError, (error) => {
  if (error) {
    showToast(error, 'danger');
  }
});


function toggleEdit(index: number) {
  isEditing.value[index] = !isEditing.value[index];
}

// Função para adicionar categoria (com integração ao Pinia)
async function adicionarCategoria() {
  if (novaCategoria.value.trim() !== '') {
    if (!categoryController) {
      throw new Error('CategoryController not provided');
    }
    //const nova = new CategoryModel(novaCategoria.value.trim(), '', []); // Ajuste o modelo de acordo com sua estrutura
    //categoryStore.setCategories([...categorias.value, nova]);
    await categoryController.createCategory((novaCategoria.value.trim()));
    novaCategoria.value = '';



  }
}

// // Editar categoria
// function editarCategoria(index: number) {
//   const novoNome = prompt('Renomear categoria:', categorias.value[index]?.name || '');
//   if (novoNome && novoNome.trim() !== '') {
//     const categoriasAtualizadas = [...categorias.value];
//     categoriasAtualizadas[index] = { ...categoriasAtualizadas[index], name: novoNome.trim() };
//     categoryStore.setCategories(categoriasAtualizadas);
//   }
// }

// Remover categoria
function removerCategoria(index: number) {
  const categoriasAtualizadas = categorias.value.filter((_, i) => i !== index);
  categoryStore.setCategories(categoriasAtualizadas);
}



// Função para exibir o Toast
function showToast(message: string, type: 'success' | 'danger') {
  toastMessage.value = message;
  toastClass.value = type === 'success' ? 'text-success' : 'text-danger';

  // Exibe o Toast
  const toastElement = document.getElementById('liveToast');
  if (toastElement) {
    const toastInstance = new bootstrap.Toast(toastElement);
    toastInstance.show();
  }
}
// Função para navegar para outra rota
const backButton = () => {
  router.back(); // Nome da rota (deve estar definida no seu arquivo de rotas)
};
</script>

<style>
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
