import type CategoryModel from "@/models/category_model";

export default interface CategoryRepository {
  getCategories(): Promise<CategoryModel[]>;
  createCategory(name: string): Promise<CategoryModel>;
  updateCategory(id: string,name: string): Promise<CategoryModel>;

}
