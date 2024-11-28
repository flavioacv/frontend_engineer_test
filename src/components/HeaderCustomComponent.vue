<template>
  <div class="d-flex align-items-center justify-content-between py-3">
    <!-- Botão ou ícone na esquerda -->
    <button class="btn p-0 btn-custom" :style="{ color: iconBack ? '#DA3468' : '#FFFFFF' }" @click="iconClick">
      <i class="bi bi-arrow-left icon-large"></i>
    </button>

    <!-- Título centralizado -->
    <h1 class="fs-5 mb-0 text-center flex-grow-1" style="color: #29354F;">{{ title }}</h1>

    <!-- Placeholder para botão direito -->
    <button class="btn p-0" style="color: #FFFFFF">
      <i class="bi bi-arrow-left icon-large"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from "vue";

// Tipagem para o evento de clique
type IconClickHandler = (event: MouseEvent) => void;

// Recebe propriedades do componente
defineProps({
  title: {
    type: String,
    required: true,
  },
  iconBack: {
    type: Boolean,
    default: false,
  },
  iconClick: {
    type: Function as PropType<IconClickHandler>, // Define o tipo corretamente
    default: () => { }, // Função vazia padrão
  },
});
</script>

<style scoped>
.btn-custom {
  color: #DA3468;
  border: none;
}

.icon-large {
  font-size: 1.5rem;
}
</style>
