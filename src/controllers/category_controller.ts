import AppException from "@/exception/app_exception";
import type CategoryModel from "@/models/category_model";
import type CategoryRepository from "@/repositories/category_repository";

import { useCategoryStore } from "@/stores/category_store";



export default class CategoryController {
  private categoryRepository: CategoryRepository;
  private categoryStore = useCategoryStore();
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

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

  async createCategory(name: string): Promise<void> {
    this.categoryStore.isLoading = true;
    this.categoryStore.error = null;
    try {
      const resCategory = await this.categoryRepository.createCategory(name);
      this.categoryStore.setCategory(resCategory);
    } catch (error) {
      if (error instanceof AppException) {
        this.categoryStore.error = error.message.includes('Category already exists')
          ? 'A categoria já existe.'
          : error.message
      } else {
        this.categoryStore.error = 'An unexpected error occurred.';
      }
      console.error(this.categoryStore.error, error);
    } finally {
      this.categoryStore.isLoading = false;
    }

  }

  async updateCategory(index: number, category: CategoryModel, name: string): Promise<void> {
    //this.categoryStore.isLoading = true;
    this.categoryStore.error = null;
    try {
      const resCategory = await this.categoryRepository.updateCategory(category.id, name);
      const categoriasAtualizadas = [...this.categoryStore.categories];
      categoriasAtualizadas[index] = {
        ...categoriasAtualizadas[index], name: resCategory.name
      };
      this.categoryStore.setCategories(categoriasAtualizadas);
    } catch (error) {
      if (error instanceof AppException) {
        this.categoryStore.error = error.message.includes('Category already exists')
          ? 'A categoria já existe.'
          : error.message
      } else {
        this.categoryStore.error = 'An unexpected error occurred.';
      }
      console.error(this.categoryStore.error, error);
    } finally {
      // this.categoryStore.isLoading = false;
    }

  }

  async deleteCategory(id: number, category: CategoryModel): Promise<void> {
    // this.categoryStore.isLoading = true;
    this.categoryStore.error = null;
    try {
      await this.categoryRepository.deleteCategory(category.id);
      const categoriasAtualizadas = this.categoryStore.categories.filter((_, i) => i !== id);
      this.categoryStore.setCategories(categoriasAtualizadas);
    } catch (error) {
      if (error instanceof AppException) {
        this.categoryStore.error = error.message.includes('Category has children')
          ? 'A categoria tem Subcategorias vinculadas'
          : error.message
      } else {
        this.categoryStore.error = 'An unexpected error occurred.';
      }
      console.error(this.categoryStore.error, error);
    } finally {
      //this.categoryStore.isLoading = false;
    }

  }
}
