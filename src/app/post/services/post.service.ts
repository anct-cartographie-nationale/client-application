import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { TagEnum } from '../enum/tag.enum';
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
        item.posts.map((post) => this.addAuthorToPost(post));
        return new PostWithMeta(item);
      })
    );
  }

  public getPosts(page: number, tags?: string[]): Observable<PostWithMeta> {
    if (!tags) {
      return this.http
        .get<PostWithMeta>(
          `${this.baseUrl}?page=${page}&include=tags,authors&filter=tag:-[${TagEnum.aLaUne},${TagEnum.appels}]`
        )
        .pipe(map((item: PostWithMeta) => new PostWithMeta(item)));
    }
    let tagsString = '';
    // Transform tab filters to string filters
    tags.forEach((tag, index) => {
      tagsString += tag;
      if (index != tags.length - 1) {
        tagsString += '+tags:';
      }
    });
    return this.http
      .get<PostWithMeta>(`${this.baseUrl}?include=tags,authors&filter=tags:${encodeURIComponent(tagsString)}`)
      .pipe(map((item: PostWithMeta) => new PostWithMeta(item)));
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
