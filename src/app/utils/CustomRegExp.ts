export class CustomRegExp {
  /**
   * Validate a password (at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character)
   */
  public static readonly PASSWORD: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  /**
   * Validate an email
   */
  public static readonly EMAIL: RegExp = /^[a-z0-9.-]+@[a-z0-9.-]+[.][a-z]{2,3}/;
  public static readonly TEXT_WITHOUT_NUMBER: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ- ]{1,}/;
  public static readonly PHONE: RegExp = /^([0-9]{2} ){4}[0-9]{2}/;
  public static readonly WEBSITE: RegExp = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  public static readonly LINKEDIN: string = '(linkedin.com/in/.{1,})';
  public static readonly FACEBOOK: string = '(facebook.com/.{1,})';
  public static readonly TWITTER: string = '(twitter.com/.{1,})';
  public static readonly INSTAGRAM: string = '(instagram.com/.{1,})';
  public static readonly NO_NULL_NUMBER: string = '[1-9]{1}[0-9]*?';
  /**
   * Validate a location request in search bar
   */
  public static readonly LOCATION: RegExp = /^\d+\s[A-z]+\s[A-z]+/g;
}
