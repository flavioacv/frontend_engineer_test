import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CategoryController from '../../../src/controllers/category_controller';
import type CategoryModel from '../../../src/models/category_model';
import type CategoryRepository from '../../../src/repositories/category_repository';
import { useCategoryStore } from '../../../src/stores/category_store';

// Mockando o CategoryRepository
const mockCategoryRepository = {
    getCategory: vi.fn(),
};

describe('CategoryController', () => {
    let categoryController: CategoryController;
    let categoryStore: ReturnType<typeof useCategoryStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        categoryStore = useCategoryStore();
        categoryController = new CategoryController(mockCategoryRepository as unknown as CategoryRepository);
    });

    it('deve carregar categorias e armazená-las no store', async () => {
        const mockCategories: CategoryModel[] = [
            { id: "1", name: 'Category 1', subCategory: [] },
            { id: "2", name: 'Category 2', subCategory: [] },
        ];
        mockCategoryRepository.getCategory.mockResolvedValue(mockCategories);

        await categoryController.loadCategories();

        expect(categoryStore.categories).toEqual(mockCategories);
        expect(categoryStore.isLoading).toBe(false);
        expect(categoryStore.error).toBeNull();
        expect(mockCategoryRepository.getCategory).toHaveBeenCalledOnce();
    });


});
