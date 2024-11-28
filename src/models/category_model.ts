import SubCategoryModel from "./subcategory_model";

export default class CategoryModel {
	constructor(readonly name: string, readonly id: string, public subCategory: SubCategoryModel[]) {
	}

    // // Método para criar uma instância de CategoryModel a partir de um objeto JSON
    // static fromJson(json: any): CategoryModel {
    //   const subCategory = json.subCategory.map((item: any) => SubCategoryModel.fromJson(item));
    //   return new CategoryModel(json.name, json.id, subCategory);
    // }

    // // Método para converter uma instância de CategoryModel para um objeto JSON
    // toJson(): object {
    //   return {
    //     name: this.name,
    //     id: this.id,
    //     subCategory: this.subCategory.map((sub) => sub.toJson()), // Assume que SubCategoryModel também tenha o método toJson
    //   };
    // }
}
