import { createPinia, setActivePinia } from 'pinia';
import { beforeEach } from 'vitest';

// Configurar Pinia para ser usado antes de cada teste
beforeEach(() => {
    setActivePinia(createPinia());
});