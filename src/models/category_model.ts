/* eslint-disable @typescript-eslint/no-explicit-any */
import SubCategoryModel from "./subcategory_model";

export default class CategoryModel {
  constructor(
    readonly name: string,
    readonly id: string,
    public subCategory: SubCategoryModel[]
  ) { }


  // toMap(): Record<string, any> {
  //   return {
  //     name: this.name,
  //     id: this.id,
  //     subCategory: this.subCategory.map((sub) => sub.toMap()), // Converter cada subcategoria
  //   };
  // }


  static fromMap(map: Record<string, any>): CategoryModel {
    return new CategoryModel(
      map.name,
      map.id,
      (map.subCategory || []).map((sub: any) =>
        SubCategoryModel.fromMap(sub) // Criar instâncias de SubCategoryModel
      )
    );
  }
}
