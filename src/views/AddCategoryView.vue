<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class=" col-12 col-sm-10 col-md-8 col-lg-8  d-flex flex-column">
    <!-- Header -->
    <HeaderCustom title="Categorias" :iconBack=true :onClick="backButton" aria-label="Voltar para a página anterior" />

    <!-- Conteúdo -->
    <div class="text-center mt-4 flex-grow-1 d-flex flex-column justify-content-center align-items-bottom">
      <!-- Input para criar categoria -->
      <div class="w-100 d-flex mb-5">
        <input v-model="novaCategoria" type="text" class="form-control rounded-pill p-3 py-3 me-2" maxlength="48"
          style="border-color:#DDE2EF ; font-weight: 600;" placeholder="Crie uma categoria"
          :aria-invalid="novaCategoria.trim() === '' ? 'true' : 'false'" aria-labelledby="novaCategoria" />

        <button class="btn rounded-pill" style="padding: 10px 30px;"
          :class="novaCategoria === '' ? 'btn-disabled' : 'btn-enabled'" @click="adicionarCategoria"
          aria-label="Criar nova categoria">
          <span v-if="!isLoading">Criar</span>
          <span v-else>
            <i class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></i>
          </span>
        </button>
      </div>

      <!-- Mensagem caso não haja categorias -->
      <p v-if="categorias.length === 0" class=" mt-5" style="color: #8693B4;" role="status">
        <strong style="color: #586893;">Ainda não existem categorias criadas</strong><br />
        Digite no campo acima as categorias que <br> deseja criar
      </p>

      <!-- Lista de categorias -->
      <div v-if="categorias.length > 0" class="">
        <transition-group name="fade" tag="div">
          <div v-for="(categoria, index) in categorias" :key="index" aria-label="Item de categoria">
            <CategoryItem v-if="!isEditing[index]" :key="index" :categoryName="categoria.name"
              :onEdit="() => toggleEdit(index)" :onGetIdToDelete="() => { indexDeleteCategoria = index }"
              :onDelete="() => { removerCategoria() }" />
            <div v-else class=" category-menu d-flex align-items-center justify-content-between p-3 mb-2 border"
              aria-labelledby="editCategoria">
              <!-- Modo de edição -->
              <div class=" d-flex align-items-center w-100 ">
                <input v-model="editCategoria" autofocus type="text" class="form-control p-2 no-focus-outline"
                  maxlength="48" style="border: none; font-weight: 600; " placeholder="Categoria"
                  aria-labelledby="editCategoria" />
                <button @click="() => { toggleEdit(index) }" class="btn  me-1 rounded-pill"
                  style="background-color: #FFE2EB; color: #DA3468; border: none;"
                  aria-label="Cancelar edição da categoria">
                  <i class="bi bi-x"></i>
                </button>
                <button @click="() => { editarCategoria(index) }" class="btn btn-success rounded-pill"
                  style="background-color: #F24F82; border: none;" aria-label="Salvar edição da categoria">
                  <i class="bi bi-check2"></i>
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <ToastComponent :toast-message="toastMessage" :toast-class="toastClass" aria-live="assertive" aria-atomic="true">
    </ToastComponent>
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
const editCategoria = ref('');
const indexDeleteCategoria = ref(0);
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
  editCategoria.value = categorias.value[index].name;
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

// Editar categoria
async function editarCategoria(index: number) {
  if (editCategoria.value && editCategoria.value.trim() !== '') {
    if (!categoryController) {
      throw new Error('CategoryController not provided');
    }
    await categoryController.updateCategory(index, categorias.value[index], editCategoria.value.trim());
    isEditing.value[index] = false;
  }
}

// Remover categoria
async function removerCategoria() {
  await categoryController?.deleteCategory(indexDeleteCategoria.value, categorias.value[indexDeleteCategoria.value]);
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
/* Desativa mudanças no hover */
.btn-enabled:hover {
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
.btn-disabled:hover {
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}

input:focus,
button:focus {
  outline: 2px solid #4d90fe;

}
</style>
