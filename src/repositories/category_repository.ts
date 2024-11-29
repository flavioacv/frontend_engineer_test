import type CategoryModel from "@/models/category_model";

export default interface CategoryRepository {
  getCategories(): Promise<CategoryModel[]>;
  createCategory(): Promise<void>;
  updateCategory(): Promise<void>;

}
