/* eslint-disable @typescript-eslint/no-explicit-any */
import AppException from "@/exception/app_exception";
import SubCategoryModel from "@/models/subcategory_model";
import type HttpService from "@/services/http_service/http_service";
import type SubcategoryRepository from "../subcategory_repository";


export default class SubcategoryRepositoryImpl implements SubcategoryRepository {

  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }


  async getSubcategories(parentCategoryId: string): Promise<SubCategoryModel[]> {
    try {
      const resCategories = await this.httpService.get<any[]>('/categories', {
        "parentCategoryId": parentCategoryId,
      });
      const categories = resCategories.map(SubCategoryModel.fromMap);
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

  async createSubcategory(name: string, parentId: string): Promise<SubCategoryModel> {
    try {
      const resCategory = await this.httpService.post<any>('/categories', {
        "name": name,
        "parent": {
          "id": parentId
        },
      });
      const subcategory = SubCategoryModel.fromMap(resCategory);
      return subcategory;
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
  async updateSubcategory(id: string, name: string): Promise<SubCategoryModel> {
    try {
      const resCategory = await this.httpService.put<any>(`/categories/${id}`, {
        "name": name,
      });
      const category = SubCategoryModel.fromMap(resCategory);
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

  async deleteSubcategory(id: string): Promise<void> {
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
