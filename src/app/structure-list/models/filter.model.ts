export class Filter {
  name: string;
  value: string;
  isStrict: boolean;

  constructor(name: string, value: any, isStrict: boolean) {
    this.name = name;
    this.value = value.toString();
    this.isStrict = isStrict;
  }
}
