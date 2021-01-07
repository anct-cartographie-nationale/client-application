export class TclStopPoint {
  public tramLines: string[];
  public subLines: string[];
  public busLines: string[];
  public _id: string;
  public id: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
