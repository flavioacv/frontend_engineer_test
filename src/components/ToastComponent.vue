  <template>
    <!-- Toast de Bootstrap para exibir mensagens -->
    <div id="liveToast" class="toast position-fixed top-0 start-50 translate-middle-x mt-4" role="alert"
      aria-live="assertive" aria-atomic="true">
      <!-- <div class="toast-header">
        <strong class="me-auto">Mensagem</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div> -->
      <div class="toast-body" :class="toastClass">
        {{ toastMessage }}
      </div>
    </div>
  </template>

<script setup lang="ts">
import { defineProps, } from "vue";



// Recebe propriedades do componente
defineProps({
  toastMessage: {
    type: String,
    required: true,
  },
  toastClass: {
    type: String,
    default: 'danger',
  },
});
</script>
