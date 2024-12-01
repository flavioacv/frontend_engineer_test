/* eslint-disable @typescript-eslint/no-explicit-any */
import AppException from "@/exception/app_exception";
import CategoryModel from "@/models/category_model";
import type HttpService from "@/services/http_service/http_service";
import type CategoryRepository from "../category_repository";


export default class CategoryRepositoryImpl implements CategoryRepository {

  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getCategories(): Promise<CategoryModel[]> {
    try {
      const resCategories = await this.httpService.get<any[]>('/categories');
      const categories = resCategories.map(CategoryModel.fromMap);
      return categories;
    } catch (error) {
      if (error instanceof AppException) {
        throw new AppException(
          'RepositoryError',
          `Failed to fetch categories: ${error.message}`,
          error.stack
        );
      }
      throw error;
    }
  }

  async createCategory(name: string): Promise<CategoryModel> {
    try {
      const resCategory = await this.httpService.post<any>('/categories', {
        "name": name,
      });
      const category = CategoryModel.fromMap(resCategory);
      return category;
    } catch (error) {
      if (error instanceof AppException) {
        throw new AppException(
          'RepositoryError',
          `Failed to create category: ${error.message}`,
          error.stack
        );
      }
      throw error;
    }
  }
  async updateCategory(id: string, name: string): Promise<CategoryModel> {
    try {
      const resCategory = await this.httpService.put<any>(`/categories/${id}`, {
        "name": name,
      });
      const category = CategoryModel.fromMap(resCategory);
      return category;
    } catch (error) {
      if (error instanceof AppException) {
        throw new AppException(
          'RepositoryError',
          `Failed to update category: ${error.message}`,
          error.stack
        );
      }
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<void> {
    try {
      await this.httpService.delete<any>(`/categories/${id}`);

    } catch (error) {
      if (error instanceof AppException) {
        throw new AppException(
          'RepositoryError',
          `Failed to update category: ${error.message}`,
          error.stack
        );
      }
      throw error;
    }
  }

}
