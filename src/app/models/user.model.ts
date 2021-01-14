export class User {
  _id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  password?: string;
  emailVerified: boolean;
  role: number;
  validationToken: string;
  structuresLink: number[];
  pendingStructuresLink: number[] = [];

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
