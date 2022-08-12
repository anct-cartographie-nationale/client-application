import { Url, UrlError } from './url';

describe('url model', (): void => {
  it('should create a valid url', (): void => {
    const urlData = 'http://www.cartographienationale.fr';

    const url = Url(urlData);

    expect(url).toStrictEqual(urlData as Url);
  });

  it('should throw UrlError when url is invalid', (): void => {
    const urlData = 'error';

    expect(() => {
      Url(urlData);
    }).toThrow(new UrlError(urlData));
  });
});
