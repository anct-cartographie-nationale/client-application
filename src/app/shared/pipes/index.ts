import { DayPipe } from './day.pipe';
import { PhonePipe } from './phone.pipe';
import { UrlPipe } from './url.pipe';

export { DayPipe, PhonePipe, UrlPipe };

// tslint:disable-next-line:variable-name
export const SharedPipes = [DayPipe, PhonePipe, UrlPipe];
