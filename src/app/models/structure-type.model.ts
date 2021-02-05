export class StructureType {
  values: string[];
  name: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
