import type SubCategoryModel from "./subcategory_model";

export default class CategoryModel {
	constructor(readonly name: string, readonly id: String, readonly subCategory: SubCategoryModel[]) {
	}
}	