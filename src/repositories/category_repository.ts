import type CategoryModel from "@/models/category_model";

export default interface CategoryRepository {
    getCategory(): Promise<CategoryModel[]>;
}