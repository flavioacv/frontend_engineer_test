<template>
  <div class="category-menu d-flex align-items-center justify-content-between p-3 mb-2 border">
    <!-- Nome da categoria -->
    <div><span class="text-dark" style="font-weight: 500;">{{ categoryName }}</span> <span v-if="categoryCount"
        class="badge rounded-pill ms-3"
        style="background-color: #DDE2EF; color: #586893; font-size: 18px; padding: 5px 15px; font-weight: 500; ">{{ categoryCount
        }}</span>
    </div>


    <a class="btn btn-sm  me-2  " role="button">
      <i class="bi bi-chevron-right" style="font-size: 1rem ; color: #8693B4;"></i>

    </a>

  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Propriedades
defineProps({
  categoryName: {
    type: String,
    required: true,
  },
  categoryCount: {
    type: Number,
  },
});

</script>

<style scoped>
.category-menu {
  border: 1;
  border-radius: 20px;
  border-color: #DDE2EF;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-item:hover {
  background-color: #ECEEF4;
}
</style>
