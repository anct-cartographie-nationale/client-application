export class Filter {
  name: string;
  value: string;

  constructor(name: string, value: any) {
    this.name = name;
    this.value = value.toString();
  }
}
