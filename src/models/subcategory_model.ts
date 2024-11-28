export default class SubCategoryModel {
    constructor(readonly id: string, readonly name: string) {
    }
//  // Método estático para criar uma instância de SubCategoryModel a partir de um objeto JSON
//  static fromJson(json: any): SubCategoryModel {
//   return new SubCategoryModel(json.id, json.name);
// }

// // Método para converter uma instância de SubCategoryModel para um objeto JSON
// toJson(): object {
//   return {
//     id: this.id,
//     name: this.name
//   };
// }

}
