export class Filter {
  name: string;
  value: string;
  text?: string;

  constructor(name: string, value: any, text?: string) {
    this.name = name;
    this.value = value.toString();
    this.text = text;
  }
}
