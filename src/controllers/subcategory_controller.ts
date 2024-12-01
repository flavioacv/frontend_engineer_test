import AppException from "@/exception/app_exception";
import type SubcategoryRepository from "@/repositories/subcategory_repository";

import { useCategoryStore } from "@/stores/category_store";



export default class SubcategoryController {
  private subcategoryRepository: SubcategoryRepository;
  private categoryStore = useCategoryStore();
  constructor(subcategoryRepository: SubcategoryRepository) {
    this.subcategoryRepository = subcategoryRepository;
  }

  async loadSubcategories(parentId: string, refresh: boolean = false): Promise<void> {
    const category = this.categoryStore.categories.find((item) => item.id === parentId);
    if (!category) {
      throw new Error('Categoria não encontrada');
    }
    ;
    if (category.subCategory.length === 0 || refresh) {
      this.categoryStore.isLoading = true;
      this.categoryStore.error = null;
      try {
        const subcategories = await this.subcategoryRepository.getSubcategories(parentId);
        this.categoryStore.setSubcategories(parentId, subcategories);
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

  async createSubcategory(parentId: string, name: string): Promise<void> {
    this.categoryStore.isLoading = true;
    this.categoryStore.error = null;
    try {
      const resCategory = await this.subcategoryRepository.createSubcategory(name, parentId);
      this.categoryStore.setSubcategory(parentId, resCategory);
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

  async updateSubcategory(
    categoryIndex: number,
    subcategoryIndex: number,
    name: string
  ): Promise<void> {
    this.categoryStore.error = null;
    try {
      const category = this.categoryStore.categories[categoryIndex]
      const subcategory = category.subCategory[subcategoryIndex];
      const updatedSubcategory = await this.subcategoryRepository.updateSubcategory(subcategory.id, name);
      // Clona as categorias para evitar mutação direta
      const updatedCategories = [...this.categoryStore.categories];
      // Encontra a categoria-alvo
      const targetCategory = updatedCategories[categoryIndex];
      if (!targetCategory) {
        throw new Error('Categoria não encontrada.');
      }
      // Atualiza a subcategoria no array da categoria
      targetCategory.subCategory[subcategoryIndex] = {
        ...subcategory,
        name: updatedSubcategory.name,
      };
      // Atualiza a store com as categorias modificadas
      this.categoryStore.setCategories(updatedCategories);
    } catch (error) {
      if (error instanceof AppException) {
        // Trata erros de negócio
        this.categoryStore.error = error.message.includes('Category already exists')
          ? 'A subcategoria já existe.'
          : error.message;
      } else {

        this.categoryStore.error = 'Ocorreu um erro inesperado.';
      }

      console.error(this.categoryStore.error, error);
    }
  }

  async deleteSubcategory(
    categoryIndex: number,
    subcategoryIndex: number
  ): Promise<void> {

    this.categoryStore.error = null;

    try {
      // Obtem a subcategoria pelo índice
      const targetCategory = this.categoryStore.categories[categoryIndex];

      if (!targetCategory) {
        throw new Error('Categoria não encontrada.');
      }

      const targetSubcategory = targetCategory.subCategory[subcategoryIndex];
      if (!targetSubcategory) {
        throw new Error('Subcategoria não encontrada.');
      }

      // Remove a subcategoria no repositório
      await this.subcategoryRepository.deleteSubcategory(targetSubcategory.id);

      // Clona as categorias e remove a subcategoria do array da categoria
      const updatedSubcategories = targetCategory.subCategory.filter((_, index) => index !== subcategoryIndex)
      this.categoryStore.setSubcategories(targetCategory.id, updatedSubcategories);
    } catch (error) {
      if (error instanceof AppException) {
        // Trata erros de negócio
        this.categoryStore.error = error.message.includes('Category has children')
          ? 'A subcategoria possui itens vinculados.'
          : error.message;
      } else {

        this.categoryStore.error = 'Ocorreu um erro inesperado.';
      }

      console.error(this.categoryStore.error, error);
    }
  }

}
