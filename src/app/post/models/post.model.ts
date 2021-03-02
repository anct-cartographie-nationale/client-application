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
}
