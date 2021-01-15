export class User {
  _id: string;
  email: string;
  password?: string;
  emailVerified: boolean;
  role: number;
  validationToken: string;
  structuresLink: string[];
  pendingStructuresLink: string[] = [];

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
