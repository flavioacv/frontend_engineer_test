<script setup lang="ts">
import { RouterView } from 'vue-router';
import { setupInjection } from './injects/inject';

// Chama a configuração de injeção
setupInjection();

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
