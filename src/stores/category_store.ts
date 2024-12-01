import type CategoryModel from '@/models/category_model';
import type SubcategoryModel from '@/models/subcategory_model';
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
    setCategory(category: CategoryModel) {
      this.categories.push(category);
    },

    setSubcategories(categoryId: string, subcategories: SubcategoryModel[]) {
      const category = this.categories.find(item => item.id === categoryId);
      if (category) {
        category.subCategory = subcategories;
      }
    },
    setSubcategory(categoryId: string, subcategory: SubcategoryModel) {
      const category = this.categories.find(item => item.id === categoryId);
      if (category) {
        category.subCategory.push(subcategory);
      }
    },
    setLoading(value: boolean) {
      this.isLoading = value;
    },
    setError(value: string) {
      this.error = value
    }
  },

  getters: {
    getCategory: (state) => state.categories as CategoryModel[],
    getLoading: (state) => state.isLoading as boolean,
    getError: (state) => state.error as string,
  },

});
