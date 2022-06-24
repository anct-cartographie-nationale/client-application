import { Model } from '../model';

const urlRegexp: RegExp =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export class UrlError extends Error {
  constructor(url: string) {
    super(`Le format de l'url ${url} n'est pas valide`);
  }
}

export type Url = Model<'Url', string>;

const throwUrlError = (url: string) => {
  throw new UrlError(url);
};

const isValidUrl = (url: string) => urlRegexp.test(url);

export const Url = (url: string) => (isValidUrl(url) ? (url as Url) : throwUrlError(url));
