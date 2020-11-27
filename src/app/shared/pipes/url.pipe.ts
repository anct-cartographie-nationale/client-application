import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'url' })
export class UrlPipe implements PipeTransform {
  transform(value: string): string {
    const valueSplitted = value.split('/');
    if (value.includes('//')) {
      value = valueSplitted[2];
    } else {
      value = valueSplitted[0];
    }
    return value;
  }
}
