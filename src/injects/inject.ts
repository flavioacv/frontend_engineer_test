import CategoryController from '@/controllers/category_controller';
import type CategoryRepository from '@/repositories/category_repository';
import CategoryRepositoryImpl from '@/repositories/impl/category_repository_Impl';
import type HttpService from '@/services/http_service/http_service';
import HttpServiceImpl from '@/services/http_service/impl/http_service_impl';
import { provide } from 'vue';

export function setupInjection() {
  const httpService: HttpService = new HttpServiceImpl();
  const categoryRepository: CategoryRepository = new CategoryRepositoryImpl(httpService);
  const categoryController: CategoryController = new CategoryController(categoryRepository);

  provide('categoryController', categoryController);
}
