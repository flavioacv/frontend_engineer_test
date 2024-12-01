<template>
  <div class="card shadow-sm py-2">
    <div class="card-header d-flex justify-content-between align-items-center" @click="() => { handleTap(category.id) }"
      style="border: none;background-color: transparent;">
      <span style="font-size: 16px;" class="fw-bold">{{ categoryName }}</span>
      <button class="btn btn-link p-0" type="button">

        <i v-if="isOpen" class="bi bi-chevron-up" style="font-size: 1.2rem ; color: #DA3468;"></i>
        <i v-else class="bi bi-chevron-down" style="font-size: 1.2rem ; color: #DA3468;"></i>

      </button>


    </div>
    <div v-if="isOpen" class="card-body">
      <ul class="list-group">
        <li v-for="(subcategory, index) in category.subCategory" :key="index" style="border: none; padding: 0;"
          class="list-group-item d-flex justify-content-between align-items-center pb-2 px-3 row">
          <CategoryItem v-if="!isEditing[index]" :categoryName="subcategory.name"
            :onEdit="() => { toggleEdit(index); handleGetIdEdit(index) }" :onDelete="() => { handleDelete(index) }"
            textConfirm="Excluir categoria" title="Deseja excluir a subcategoria?"
            description="Essa ação é irreversível.  Lembre-se os produtos ligados a essa categoria não serão excluídos." />
          <div v-else class="category-menu d-flex align-items-center justify-content-between p-3 mb-2 border">
            <!-- Modo de edição -->
            <div class=" d-flex align-items-center w-100">
              <input v-model="editSubcategoria" autofocus type="text" class="form-control p-2 no-focus-outline"
                maxlength="48" style="border: none; font-weight: 600; " placeholder="Subcategoria" />
              <button @click="() => { toggleEdit(index); editSubcategoria = '' }" class="btn  me-1 rounded-pill"
                style="background-color: #FFE2EB; color: #DA3468; border: none;">
                <i class="bi bi-x"></i>
              </button>
              <button @click="handleEdit(index)" class="btn btn-success rounded-pill"
                style="background-color: #F24F82; border: none;">
                <i class="bi bi-check2"></i>
              </button>
            </div>
          </div>

        </li>
        <li v-if="!isCreated" class="list-group-item" style="border: none; padding: 0;">
          <ButtonAdd @click="() => { isCreated = true }" categoryName="Adicionar subcategoria" />
        </li>
        <li v-else class="list-group-item" style="border: none; padding: 0;">
          <div class="category-menu d-flex align-items-center justify-content-between p-3 mb-2 border">
            <!-- Modo de edição -->
            <div class=" d-flex align-items-center w-100">
              <input v-model="inputValue" autofocus type="text" class="form-control  p-2 no-focus-outline"
                maxlength="48" style="border: none; font-weight: 600; font-size: 16px;" placeholder="Subcategoria" />
              <button @click="() => { isCreated = false; inputValue = '' }" class="btn  me-1 rounded-pill"
                style="background-color: #FFE2EB; color: #DA3468; border: none;">
                <i class="bi bi-x"></i>
              </button>
              <button @click="() => { handleCreate(), isCreated = false }" class="btn btn-success rounded-pill"
                style="background-color: #F24F82; border: none;">
                <i class="bi bi-check2"></i>
              </button>
            </div>

          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonAdd from '@/components/ButtonAddSubcategoryComponent.vue';
import CategoryItem from '@/components/CategoryItemComponent.vue';
import CategoryModel from '@/models/category_model';

import { defineProps, ref } from 'vue';

// Propriedades
const props = defineProps({
  categoryName: {
    type: String,
    required: true,
  },
  category: {
    type: CategoryModel,
    required: true,
  },
});




// Estado para controlar a visibilidade da lista
const isOpen = ref<boolean>(false);
const editSubcategoria = ref('');

// Controle de edição
//const isEditing = ref(false); // Define se está no modo de edição
// Controle de criar
const isCreated = ref(false); // Define se está no modo de criacao

const isEditing = ref<boolean[]>(new Array(props.category.subCategory.length).fill(false)); // Controle de edição por subcategoria


// Estado local para capturar o valor
const inputValue = ref('');
//Emitir eventos
const emit = defineEmits(['create', 'delete', 'tap', 'edit', 'getIdEdit']);


function handleCreate() {
  emit('create', inputValue.value);
  inputValue.value = ''
}

//Funções de evento para editar e excluir
function handleDelete(index: number) {
  emit('delete', index);

}

function handleTap(parentId: string) {
  emit('tap', parentId);
  isOpen.value = !isOpen.value;
}

// Funções de evento para editar e excluir
function handleEdit(index: number) {
  const valueEdit = editSubcategoria.value;
  emit('edit', { index, valueEdit });
  isEditing.value[index] = false
}
function handleGetIdEdit(index: number) {
  emit('getIdEdit', index);
}


// Funções de manipulação
function toggleEdit(index: number) {
  isEditing.value[index] = !isEditing.value[index]; // Alterna o estado de edição de cada subcategoria
  editSubcategoria.value = props.category.subCategory[index].name

}

</script>

<style>
.category-menu {
  border: 1;
  border-radius: 20px;
  border-color: #DDE2EF;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card {
  /* max-width: 400px; */
  margin: 1rem auto;
  border: 1;
  border-radius: 20px;
  border-color: #DDE2EF;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Remove a borda padrão ao focar */
.no-focus-outline:focus {
  outline: none !important;
  /* Remove o contorno padrão */
  box-shadow: none !important;
  /* Remove a sombra do Bootstrap */
  border-color: inherit !important;
  /* Mantém a borda padrão do campo */
}
</style>
