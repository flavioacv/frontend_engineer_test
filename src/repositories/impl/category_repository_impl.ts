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


  async getCategory(): Promise<CategoryModel[]> {
    try {
      const rawCategories = await this.httpService.get<any[]>('/categories');
      const categories = rawCategories.map(CategoryModel.fromMap);
      return categories;
    } catch (error) {
      if (error instanceof AppException) {
        // Enriquecendo a mensagem de erro com informações sobre o repositório
        throw new AppException(
          'RepositoryError',
          `Failed to fetch categories: ${error.message}`,
          error.stack
        );
      }
      //Re-lança erros não tratados
      throw error;
    }
  }
}
