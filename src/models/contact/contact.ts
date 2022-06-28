import { Model } from '../model';
import { Url } from '../url/url';

export class CourrielError extends Error {
  constructor(courriel: string) {
    super(`Le format du courriel ${courriel} n'est pas valide`);
  }
}

export class TelephoneError extends Error {
  constructor(telephone: string) {
    super(`Le format du telephone ${telephone} n'est pas valide`);
  }
}

const courrielRegexp: RegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const telephoneRegexp: RegExp =
  /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

export const Contact = (contactData: Omit<Contact, 'isContact'>): Contact => {
  if (contactData.courriel && !courrielRegexp.test(contactData.courriel)) {
    throw new CourrielError(contactData.courriel);
  }

  if (contactData.telephone && !telephoneRegexp.test(contactData.telephone)) {
    throw new TelephoneError(contactData.telephone);
  }

  return { ...contactData } as Contact;
};

export type Contact = Model<
  'Contact',
  {
    telephone?: string;
    courriel?: string;
    site_web?: Url;
  }
>;
