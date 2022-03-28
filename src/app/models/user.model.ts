import { Employer } from './employer.model';
import { Job } from './job.model';

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
  personalOffers: string[] = [];
  job: Job;
  employer: Employer;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
