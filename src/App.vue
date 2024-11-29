<script setup lang="ts">
import { RouterView } from 'vue-router';
import { setupCategoryInjection } from './injects/category_inject';

// Chama a configuração de injeção
setupCategoryInjection();

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
