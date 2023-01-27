import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhoneStubPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    return phoneNumber;
  }
}
