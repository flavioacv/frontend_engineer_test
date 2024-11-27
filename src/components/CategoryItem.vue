<template>
    <div class="category-item d-flex align-items-center justify-content-between p-3 mb-2 e">
        <!-- Nome da categoria -->
        <span class="text-dark fw-semibold">{{ categoryName }}</span>

        <!-- Botões de ação (editar e excluir) -->
        <div class="dropdown">
            <!-- <button class="btn btn-sm  me-2 " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                @click="handleEdit">
                <i class="bi bi-three-dots" style="font-size: 1.2rem ; color: #DA3468;"></i>
            </button> -->
            <a class="btn btn-sm  me-2  " style="border: none;" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="bi bi-three-dots" style="font-size: 1.2rem ; color: #DA3468;"></i>
            </a>

            <ul class="dropdown-menu">
                <li><a class="dropdown-item mb-2 " style="font-weight: 600;" href="#" @click="handleEdit"><i
                            class="bi bi-pen mx-2" style="color: #DA3468;"></i>Renomear</a></li>
                <li><a class="dropdown-item " style="font-weight: 600;" href="#" @click="handleDelete"><i
                            class="bi bi-trash3 mx-2" style="color: #DA3468;"></i>Excluir</a></li>
            </ul>
        </div>
        <!-- <div>
            <button class="btn btn-sm  me-2" >
                <i class="bi bi-three-dots" style="font-size: 1.2rem ; color: #DA3468;"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" >
          Excluir
        </button>
        </div> -->
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

// Propriedades
const props = defineProps({
    categoryName: {
        type: String,
        required: true,
    },
});

// Emitir eventos
const emit = defineEmits(['edit', 'delete']);

// Funções de evento para editar e excluir
function handleEdit() {
    emit('edit');
}


function handleDelete() {
    emit('delete');
}

function rename() {
    alert("Renomear item");
}
function deleteItem() {
    alert("Excluir item");
}
</script>

<style scoped>
.category-item {
    background-color: #F3F3F5;
    border-radius: 15px;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.category-item:hover {
    background-color: #ECEEF4;
}

.text-custom {
    color: #DA3468;
    font-size: 1.2rem;
}

.dropdown-item.text-danger {
    color: #dc3545;
}
</style>