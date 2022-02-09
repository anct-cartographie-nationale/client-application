import { SafeHtml } from '@angular/platform-browser';

export class Page {
  pages: Page[];
  id: number;
  published_at: Date;
  updated_at: Date;
  title: string;
  excerpt: string;
  feature_image: string;
  html: string;
  safeHtml: SafeHtml;
  meta_description: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
