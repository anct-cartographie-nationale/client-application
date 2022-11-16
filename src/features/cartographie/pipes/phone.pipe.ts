import { Pipe, PipeTransform } from '@angular/core';

const groupByTwoDigits = (phoneEnd: string): string[] => phoneEnd.match(/..?/g) ?? [];

const internationalDialingCode = (phoneNumber: string): string => phoneNumber.slice(0, -9);

const firstNumber = (phoneNumber: string): string => {
  const phoneStart = phoneNumber.slice(0, -8);
  return phoneStart[phoneStart.length - 1];
};

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(phoneNumber: string): string {
    const [_, phoneEnd] = phoneNumber.split(/^\+(?:33|59\d)\d/);

    if (!phoneEnd) return '';

    return [internationalDialingCode(phoneNumber), firstNumber(phoneNumber), ...groupByTwoDigits(phoneEnd)].join(' ');
  }
}
