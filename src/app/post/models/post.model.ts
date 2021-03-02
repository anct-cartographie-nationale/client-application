import { Tag } from './tag.model';

export class Post {
  id: number;
  published_at: Date;
  title: string;
  excerpt: string;
  feature_image: string;
  html: string;
  author: string;
  tags: Tag[];

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
