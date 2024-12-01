import CategoryController from '@/controllers/category_controller';
import SubcategoryController from '@/controllers/subcategory_controller';
import type CategoryRepository from '@/repositories/category_repository';
import CategoryRepositoryImpl from '@/repositories/impl/category_repository_Impl';
import SubcategoryRepositoryImpl from '@/repositories/impl/subcategory_repository_Impl';
import type SubcategoryRepository from '@/repositories/subcategory_repository';
import type HttpService from '@/services/http_service/http_service';
import HttpServiceImpl from '@/services/http_service/impl/http_service_impl';
import { provide } from 'vue';

export function setupInjection() {
  const httpService: HttpService = new HttpServiceImpl();

  const categoryRepository: CategoryRepository = new CategoryRepositoryImpl(httpService);
  const subcategoryRepository: SubcategoryRepository = new SubcategoryRepositoryImpl(httpService);


  const categoryController: CategoryController = new CategoryController(categoryRepository);
  const subcategoryController: SubcategoryController = new SubcategoryController(subcategoryRepository);


  provide('categoryController', categoryController);
  provide('subcategoryController', subcategoryController);
}
