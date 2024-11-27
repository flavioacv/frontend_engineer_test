import type CategoryModel from '@/models/category_model';
import { defineStore } from 'pinia';


export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [] as CategoryModel[],
        isLoading: false,
        error: null as string | null,
    }),

    actions: {
        setCategories(categories: CategoryModel[]) {
            this.categories = categories;
        },
    },

    getters:{
        getCategory: (state) => state.categories as  CategoryModel[],
    }
});