export enum Regex {
  email = '[a-z0-9.-]+@[a-z0-9.-]+[.][a-z]{2,3}',
  textWithoutNumber = '[A-Za-zÀ-ÖØ-öø-ÿ- ]{1,}',
  phone = '([0-9]{2} ){4}[0-9]{2}',
  website = '(www[.])?(https://)?(http://)?[a-zA-Z0-9.-]*[.][a-z]{2,3}((/)[a-zA-Z0-9-/]*)?',
  linkedIn = '(linkedin.com/in/.{1,})',
  facebook = '(facebook.com/.{1,})',
  twitter = '(twitter.com/.{1,})',
  instagram = '(instagram.com/.{1,})',
  noNullNumber = '[1-9]{1}[0-9]*',
}
