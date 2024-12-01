/* eslint-disable @typescript-eslint/no-explicit-any */
export default class SubcategoryModel {
  constructor(readonly id: string, public name: string) { }



  static fromMap(map: Record<string, any>): SubcategoryModel {
    return new SubcategoryModel(map.id, map.name);
  }
}
