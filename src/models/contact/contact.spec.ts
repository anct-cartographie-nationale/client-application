import { Contact, CourrielError, TelephoneError } from './contact';
import { Url } from '../url/url';

describe('contact model', (): void => {
  it('should create a valid contact', (): void => {
    const contactData = {
      telephone: '+33145896378',
      courriel: 'contact@cartographienationale.fr',
      site_web: [Url('http://www.cartographienationale.fr')]
    };

    const contact = Contact(contactData);

    expect(contact).toStrictEqual({ ...contactData } as Contact);
  });

  it('should throw CourrielError when courriel is invalid', (): void => {
    const contactData = {
      courriel: 'error'
    };

    expect(() => {
      Contact(contactData);
    }).toThrow(new CourrielError(contactData.courriel));
  });

  it('should throw TelephoneError when telephone is invalid', (): void => {
    const contactData = {
      telephone: 'error'
    };

    expect(() => {
      Contact(contactData);
    }).toThrow(new TelephoneError(contactData.telephone));
  });
});
