export enum Regex {
  email = '[a-z0-9.-]+@[a-z0-9.-]+[.][a-z]{2,3}',
  textWithoutNumber = '[A-Za-zÀ-ÖØ-öø-ÿ- ]{1,}',
  phone = '([0-9]{2} ){4}[0-9]{2}',
  website = '(www[.])[a-z0-9.-]*[.][a-z]{2,3}',
  linkedIn = '(linkedin.com/in/[a-z0-9A-Z.-]{1,})',
  facebook = '(facebook.com/[a-z0-9A-Z.-]{1,})',
  twitter = '(twitter.com/[a-z0-9A-Z.-]{1,})',
  instagram = '(instagram.com/[a-z0-9A-Z.-]{1,})',
  noNullNumber = '[1-9]{1}[0-9]*',
}
