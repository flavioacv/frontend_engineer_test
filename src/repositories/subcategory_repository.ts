import type SubCategoryModel from "@/models/subcategory_model";

export default interface SubcategoryRepository {
  getSubcategories(parentCategoryId: string): Promise<SubCategoryModel[]>;
  createSubcategory(name: string, parentId: string): Promise<SubCategoryModel>;
  updateSubcategory(id: string, name: string): Promise<SubCategoryModel>;
  deleteSubcategory(id: string): Promise<void>;

}
