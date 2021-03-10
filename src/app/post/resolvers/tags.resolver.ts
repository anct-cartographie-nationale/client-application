import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TagWithMeta } from '../models/tagWithMeta.model';
import { PostService } from '../services/post.service';

@Injectable()
export class TagResolver implements Resolve<TagWithMeta> {
  constructor(private postService: PostService, private router: Router) {}

  resolve(): Observable<TagWithMeta> {
    return this.postService.getTags().pipe(
      map((res) => res),
      catchError(() => {
        this.router.navigate(['/home']);
        return new Observable<TagWithMeta>();
      })
    );
  }
}
