import { SafeHtml } from '@angular/platform-browser';
import { Tag } from './tag.model';

export class Post {
  id: number;
  published_at: Date;
  updated_at: Date;
  title: string;
  excerpt: string;
  feature_image: string;
  html: string;
  author: string;
  tags: Tag[];
  safeHtml: SafeHtml;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
