import { OptionalPropertyError } from '../../utilities';
import { Model } from '../model';
import { Url } from '../url/url';

export type Contact = Model<
  'Contact',
  {
    telephone?: string;
    courriel?: string;
    site_web?: Url[];
  }
>;

export class CourrielError extends OptionalPropertyError {
  constructor(courriel: string) {
    super('courriel', `Le courriel ${courriel} n'est pas valide`);
  }
}

export class TelephoneError extends OptionalPropertyError {
  constructor(telephone: string) {
    super('telephone', `Le telephone ${telephone} n'est pas valide`);
  }
}

const courrielRegexp: RegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;

const telephoneRegexp: RegExp =
  /^(?:(?:\+|00)(?:33|59\d)[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

const isValidCourriel = (courriel: string): boolean => courrielRegexp.test(courriel);

const isValidTelephone = (telephone: string): boolean => telephoneRegexp.test(telephone);

const isValidContact = (contact: Omit<Contact, 'isContact'>): contact is Contact =>
  (contact.courriel == null || isValidCourriel(contact.courriel)) &&
  (contact.telephone == null || isValidTelephone(contact.telephone));

const throwContactError = (contact: Omit<Contact, 'isContact'>): Contact => {
  if (contact.courriel && !isValidCourriel(contact.courriel)) {
    throw new CourrielError(contact?.courriel ?? 'indéfini');
  }

  if (contact.telephone && !isValidTelephone(contact.telephone)) {
    throw new TelephoneError(contact?.telephone ?? 'indéfini');
  }

  throw new Error();
};

export const Contact = (contact: Omit<Contact, 'isContact'>): Contact =>
  isValidContact(contact) ? { ...contact } : throwContactError(contact);
