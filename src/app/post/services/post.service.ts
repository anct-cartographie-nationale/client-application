import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostWithMeta } from '../models/postWithMeta.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = 'api/posts';
  constructor(private http: HttpClient) {}

  public getAllPosts(): Observable<PostWithMeta> {
    return this.http.get<PostWithMeta>(`${this.baseUrl}`).pipe(map((item: PostWithMeta) => new PostWithMeta(item)));
  }
}
