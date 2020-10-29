export class Time {
  openning: number;
  closing: number;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  public formatOpenningDate(): string {
    return this.formatDate(this.openning);
  }

  public formatClosingDate(): string {
    return this.formatDate(this.closing);
  }

  private formatDate(n: number): string {
    if (n.toString().length === 3) {
      const tabNum = n.toString().match(/.{1,1}/g);
      return tabNum[0] + 'h' + tabNum[1] + tabNum[2];
    } else if (n.toString().length === 4) {
      const tabNum = n.toString().match(/.{1,2}/g);
      return tabNum[0] + 'h' + tabNum[1];
    }
  }
}
