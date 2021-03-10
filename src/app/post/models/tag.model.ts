export class Tag {
  id: string;
  name: string;
  slug: string;
  description: string; // Description is used to ut categories on tags

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
