<template>
  <div class="category-item d-flex align-items-center justify-content-between p-3 mb-2 e">
    <!-- Nome da categoria -->
    <span class="text-dark" style="font-weight: 500; color: #DA3468 !important;">{{ categoryName }}</span>

    <!-- Botões de ação (editar e excluir) -->
    <a class="btn btn-sm  me-2  " style="border: none;" role="button">
      <i class="bi bi-plus" style="font-size: 1.4rem ; color: #DA3468;"></i>
    </a>
  </div>
</template>

<script setup lang="ts">


// Propriedades
defineProps({
  categoryName: {
    type: String,
    required: true,
  },
});



</script>

<style scoped>
.category-item {
  background-color: #F3F3F5;
  border-radius: 20px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  cursor: pointer;
  transition: background-color 0.3s ease;
}



.text-custom {
  color: #DA3468;
  font-size: 1.2rem;
}

.dropdown-item.text-danger {
  color: #dc3545;
}
</style>
