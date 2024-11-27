<template>
  <div class="col-12 d-flex flex-column">
    <!-- Header -->
    <Header title="Categorias" :iconBack=true :onClick="backButton" />

    <!-- Conteúdo -->
    <div class="text-center mt-4 flex-grow-1 d-flex flex-column justify-content-center align-items-bottom">
      <!-- Input para criar categoria -->
      <div class="w-100 d-flex mb-5">
        <input v-model="novaCategoria" type="text" class="form-control rounded-pill p-3 py-3"
          placeholder="Crie uma categoria" />
        <button class="btn rounded-pill px-4" :class="novaCategoria.length <= 0 ? 'btn-disabled' : 'btn-enabled'"
          @click="adicionarCategoria">
          Criar
        </button>
      </div>

      <!-- Mensagem caso não haja categorias -->
      <p v-if="categorias.length === 0" class="text-muted mt-5">
        <strong>Ainda não existem categorias criadas</strong><br />
        Digite no campo acima as categorias que deseja criar
      </p>

      <!-- Lista de categorias -->
      <div v-if="categorias.length > 0" class="w-100">
        <transition-group name="fade" tag="div">
          <CategoryItem v-for="(categoria, index) in categorias" :key="index" :categoryName="categoria"
            :onEdit="() => editarCategoria(index)" :onDelete="() => removerCategoria(index)" />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CategoryItem from '../components/CategoryItem.vue'; // Importa o componente CategoryItem
import Header from '../components/Header.vue'; // Importa o Header

// Instância do Vue Router
const router = useRouter();

// Estado reativo
const novaCategoria = ref('');
const categorias = ref([]);

// Função para adicionar categoria
function adicionarCategoria() {
  if (novaCategoria.value.trim() !== '') {
    categorias.value.push(novaCategoria.value.trim());
    novaCategoria.value = '';
  }
}

// Editar categoria
function editarCategoria(index) {
  const novoNome = prompt('Renomear categoria:', categorias.value[index]);
  if (novoNome && novoNome.trim() !== '') {
    categorias.value[index] = novoNome.trim();
  }
}

// Remover categoria
function removerCategoria(index) {
  categorias.value.splice(index, 1);
}

// Função para navegar para outra rota
const backButton = () => {
  router.push({ name: 'Category' }); // Nome da rota (deve estar definida no seu arquivo de rotas)
};
</script>

<style>
/* Ajustes opcionais para garantir responsividade */
.container {
  max-width: 480px;
}

.btn-enabled {
  background-color: #DA3468;
  color: white;
  border: none;
}

/* Estilo para o estado "disable" */
.btn-disabled {
  background-color: #DDE2EF;
  color: #8693B4;
  border: none;
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
</style>
