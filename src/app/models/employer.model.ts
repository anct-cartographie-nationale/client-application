export class Employer {
  _id: string;
  name: string;
  validated: boolean = false;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
