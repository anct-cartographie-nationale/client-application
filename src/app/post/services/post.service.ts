import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostWithMeta } from '../models/postWithMeta.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = 'api/posts';
  constructor(private http: HttpClient) {}

  public getPost(idPost: string): Observable<PostWithMeta> {
    return this.http.get<PostWithMeta>(`${this.baseUrl}/` + idPost).pipe(
      map((item: PostWithMeta) => {
        item.posts.forEach((post) => {
          post = this.addAuthorToPost(post);
        });
        return new PostWithMeta(item);
      })
    );
  }

  public getPosts(tags?: string[]): Observable<PostWithMeta> {
    if (!tags) {
      return this.http.get<PostWithMeta>(`${this.baseUrl}?include=tags,authors&filter=tag:-[appels,a-la-une]`).pipe(
        map((item: PostWithMeta) => {
          item.posts.forEach((post) => {
            post = this.addAuthorToPost(post);
          });
          return new PostWithMeta(item);
        })
      );
    }
    let tagsString = '';
    // Transform tab filters to string filters
    tags.forEach((tag, index) => {
      tagsString += tag;
      if (index != tags.length - 1) {
        tagsString += ',';
      }
    });
    return this.http.get<PostWithMeta>(`${this.baseUrl}?include=tags,authors&filter=tag:[${tagsString}]`).pipe(
      map((item: PostWithMeta) => {
        item.posts.forEach((post) => {
          post = this.addAuthorToPost(post);
        });
        return new PostWithMeta(item);
      })
    );
  }

  private addAuthorToPost(post: Post): Post {
    post.author = post.excerpt;
    post.excerpt = post.html.replace(/<[^>]*>/g, '');
    return post;
  }
}
