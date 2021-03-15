import { Pagination } from './pagination.model';
import { Post } from './post.model';

export class PostWithMeta {
  posts: Post[];
  meta: { pagination: Pagination };

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
