import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TagEnum } from '../enum/tag.enum';
import { PostWithMeta } from '../models/postWithMeta.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = 'api/posts';
  constructor(private http: HttpClient) {}

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
        tagsString += ',';
      }
    });
    return this.http
      .get<PostWithMeta>(`${this.baseUrl}?include=tags,authors&filter=tag:[${tagsString}]`)
      .pipe(map((item: PostWithMeta) => new PostWithMeta(item)));
  }
}
