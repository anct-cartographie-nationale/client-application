export class Job {
  _id?: string;
  name: string;
  hasPersonalOffer: boolean = true;
  validated: boolean = false;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
