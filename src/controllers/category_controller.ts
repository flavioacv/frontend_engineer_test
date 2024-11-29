import AppException from "@/exception/app_exception";
import type CategoryRepository from "@/repositories/category_repository";

import { useCategoryStore } from "@/stores/category_store";



export default class CategoryController {
  private categoryRepository: CategoryRepository;
  private categoryStore = useCategoryStore();
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }


  // getCategory(refresh: Boolean = false) {
  //     if (this.$state.categories && this.$state.categories.length > 0 && !refresh) {
  //         return this.categories;
  //     }

  // }

  async loadCategories(refresh: boolean = false): Promise<void> {
    if (this.categoryStore.getCategory.length === 0 || refresh) {
      this.categoryStore.isLoading = true;
      this.categoryStore.error = null;
      try {
        const categories = await this.categoryRepository.getCategories();
        this.categoryStore.setCategories(categories);
      } catch (error) {
        if (error instanceof AppException) {
          this.categoryStore.error = `Failed to load categories: ${error.message}`;
        } else {
          this.categoryStore.error = 'An unexpected error occurred.';
        }
        console.error(this.categoryStore.error, error);
      } finally {
        this.categoryStore.isLoading = false;
      }
    }


  }
}
