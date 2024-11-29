/* eslint-disable @typescript-eslint/no-explicit-any */
export default class SubCategoryModel {
  constructor(readonly id: string, public name: string) { }


  toMap(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
    };
  }


  static fromMap(map: Record<string, any>): SubCategoryModel {
    return new SubCategoryModel(map.id, map.name);
  }
}
