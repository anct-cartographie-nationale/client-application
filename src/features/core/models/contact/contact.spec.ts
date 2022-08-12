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

  it('should create a valid contact with only telephone property', (): void => {
    const contactData = {
      telephone: '+33145896378'
    };

    const contact = Contact(contactData);

    expect(contact).toStrictEqual({ ...contactData } as Contact);
  });

  it('should create a valid contact with only courriel property', (): void => {
    const contactData = {
      courriel: 'contact@cartographienationale.fr'
    };

    const contact = Contact(contactData);

    expect(contact).toStrictEqual({ ...contactData } as Contact);
  });

  it('should create a valid contact with a phone from French Guiana', (): void => {
    const contactData = {
      telephone: '+594694020905',
      courriel: 'direction.yenkumu.lutu@gmail.com',
      site_web: [Url('https://www.facebook.com/YenkumuLutuPapaichton/')]
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
