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
  structuresLink: string[];
  pendingStructuresLink: string[] = [];
  profileImage: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
