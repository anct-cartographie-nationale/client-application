import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterListenerService } from '../../../services/routerListener.service';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private routerListener: RouterListenerService
  ) {}
  post: Post;
  ngOnInit(): void {
    if (history.state.data) {
      this.post = new Post(history.state.data);
      this.post.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.post.html);
    } else {
      const postId = this.activatedRoute.snapshot.paramMap.get('id');
      this.postService.getPost(postId).subscribe((post) => {
        this.post = post.posts[0];
        this.post.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.post.html);
      });
    }
  }

  public backToPosts(): void {
    this.routerListener.goToPreviousUrl();
  }
}
