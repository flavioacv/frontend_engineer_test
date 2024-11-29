import AppException from "@/exception/app_exception";
import CategoryRepositoryImpl from "@/repositories/impl/category_repository_impl";
import HttpServiceImpl from "@/services/http_service/impl/http_service_impl";
import { useCategoryStore } from "@/stores/category_store";



export default class CategoryController {
  private httpService = new HttpServiceImpl();
  private categoryRepository = new CategoryRepositoryImpl(this.httpService);
  private categoryStore = useCategoryStore();


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
        const categories = await this.categoryRepository.getCategory();
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
