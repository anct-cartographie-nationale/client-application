export class Address {
  public id: number;
  public text: string;
  public type: string;
  public city: string;
  public citycode: string;
  public zipcode: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  public queryString(): string {
    return this.text + ' ' + this.citycode;
  }
}
