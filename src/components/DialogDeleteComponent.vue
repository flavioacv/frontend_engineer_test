<template>
  <div class="modal fade" id="ModalDelete" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" style="border-radius: 20px;">
      <div class="modal-content">

        <div class="modal-body " style="justify-content: start !important;">
          <div>
            <i class="bi bi-exclamation-triangle-fill" style="font-size: 80px; color: #EEBB39;"></i>
          </div>

          <h2 class="fw-bold fs-5 mb-2" style="color: #29354F;">{{ title }}</h2>
          <p style="color: #586893;">{{ description }}
          </p>
        </div>
        <div class="modal-footer" style="border: none; justify-content: center;">
          <button class="btn rounded-pill " data-bs-dismiss="modal" @click="onCancel"
            style="border: none;padding: 10px 30px; background-color: #FFE2EB; color: #DA3468;">
            {{ textCancel }}
          </button>
          <button class="btn rounded-pill" @click="onConfirm" data-bs-dismiss="modal"
            style="border: none;padding: 10px 35px; background-color: #F24F82; color: #FFFFFF;">
            {{ textConfirm }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// Importa o tipo correto
import type { PropType } from "vue";

// Props para controlar ações
defineProps({
  onConfirm: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true, // Função a ser chamada ao clicar em "Excluir"
  },
  onCancel: {
    type: Function as PropType<(event: MouseEvent) => void>,
    default: () => { }, // Função opcional ao clicar em "Cancelar"
  },
  textConfirm: {
    type: String,
    default: 'Excluir',
  },
  textCancel: {
    type: String,
    default: 'Cancelar',
  },
  title: {
    type: String,
    default: 'Deseja excluir a categoria?',
  },
  description: {
    type: String,
    default: 'Essa ação é irreversível e implica na exclusão das subcategorias vinculadas. Os produtos ligados a essa categoria não serão excluídos.',
  },

});
</script>


<style scoped>
.modal-content {
  background-color: #fff;
  border-radius: 20px;
}
</style>
