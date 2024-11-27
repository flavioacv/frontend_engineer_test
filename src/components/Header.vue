<template>
  <div class="d-flex align-items-center justify-content-between py-3 ">
    <!-- Botão ou ícone na esquerda -->
    <button class="btn p-0 btn-custom" :style="{ color: iconBack ? '#DA3468' : '#FFFFFF' }" @click="onClick">
      <i class="bi bi-arrow-left icon-large "></i>
    </button>

    <!-- Título centralizado -->
    <h1 class="fs-5 mb-0 text-center flex-grow-1">{{ title }}</h1>

    <button class="btn p-0" style=" color:#FFFFFF ">
      <i class="bi bi-arrow-left icon-large "></i>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Recebe o título como propriedade
defineProps({
  title: {
    type: String,
    required: true,
  },
  iconBack: {
    type: Boolean,
    required: true,
    default: false,
  },
  onClick: {
    type: Function,
    default: null,
  },
});


</script>

<style scoped>
.btn-custom {
  color: #DA3468;
  /* Texto branco */
  border: none;
  /* Sem borda */

}

/* Ícone com tamanho maior */
.icon-large {
  font-size: 1.5rem;
  /* Aumenta o tamanho do ícone */
}
</style>