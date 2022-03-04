import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostWithMeta } from '../models/postWithMeta.model';
import { TagWithMeta } from '../models/tagWithMeta.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = 'api/posts';
  constructor(private http: HttpClient) {}

  public getPost(idPost: string): Observable<PostWithMeta> {
    return this.http.get<PostWithMeta>(`${this.baseUrl}/` + idPost).pipe(
      map((item: PostWithMeta) => {
        item.posts.forEach((post) => this.addAuthorToPost(post));
        return new PostWithMeta(item);
      })
    );
  }

  public getPosts(page: number, tags?: string[]): Observable<PostWithMeta> {
    let tagsFilter = '';

    if (tags) {
      let tagsString = '';
      // Transform tab filters to string filters
      tags.forEach((tag, index) => {
        tagsString += tag;
        if (index != tags.length - 1) {
          tagsString += '+tags:';
        }
      });
      tagsFilter = `&filter=tags:${encodeURIComponent(tagsString)}`;
    }

    return this.http.get<PostWithMeta>(`${this.baseUrl}?page=${page}&include=tags,authors${tagsFilter}`);
  }

  public getTags(): Observable<TagWithMeta> {
    return this.http.get<TagWithMeta>(`${this.baseUrl}/tags`);
  }

  private addAuthorToPost(post: Post): Post {
    post.author = post.excerpt;
    post.excerpt = post.html.replace(/<[^>]*>/g, '');
    return post;
  }
}
