export class CustomRegExp {
  /**
   * Validate a password (at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character)
   */
  public static readonly DIGIT: RegExp = /^(?=.*[0-9])/; //NOSONAR
  public static readonly SPECHAR: RegExp = /^(?=.*[*.! @#$%^&(){}\[\]:;<>,?\/\\~_+\-=|])/; //NOSONAR
  public static readonly UPPERCASE: RegExp = /^(?=.*[A-Z])/; //NOSONAR
  public static readonly LOWERCASE: RegExp = /^(?=.*[a-z])/; //NOSONAR
  public static readonly MINLENGTH: RegExp = /^(?=.{8,})/; //NOSONAR
  public static readonly PASSWORD: RegExp = new RegExp(
    CustomRegExp.LOWERCASE.source +
      CustomRegExp.UPPERCASE.source +
      CustomRegExp.DIGIT.source +
      CustomRegExp.SPECHAR.source +
      CustomRegExp.MINLENGTH.source
  ); //NOSONAR
  /**
   * Validate an email
   */
  public static readonly EMAIL: RegExp = /^[a-z0-9.\-_]+@[a-z0-9.-]+[.][a-z]{2,3}/; //NOSONAR
  public static readonly TEXT_WITHOUT_NUMBER: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ- ]{1,}$/; //NOSONAR
  /**
   * Validate a password (at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character)
   */
  public static readonly PHONE: RegExp = /^(?:(?:\+|00)|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/; //NOSONAR
  public static readonly WEBSITE: RegExp = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})/; //NOSONAR
  public static readonly LINKEDIN: string = '(linkedin.com/.{1,})';
  public static readonly FACEBOOK: string = '(facebook.com/.{1,})';
  public static readonly TWITTER: string = '(twitter.com/.{1,})';
  public static readonly INSTAGRAM: string = '(instagram.com/.{1,})';
  public static readonly NO_NULL_NUMBER: string = '[1-9]{1}[0-9]*?';
  /**
   * Validate a location request in search bar
   */
  public static readonly LOCATION: RegExp = /^\d+\s[A-z]+\s[A-z]+/g; //NOSONAR
}
