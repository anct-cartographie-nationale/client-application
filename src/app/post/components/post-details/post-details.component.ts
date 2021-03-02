import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private postService: PostService) {}
  post: Post;
  ngOnInit(): void {
    if (history.state.data) {
      this.post = new Post(history.state.data);
    } else {
      const postId = this.activatedRoute.snapshot.paramMap.get('id');
      this.postService.getPost(postId).subscribe((post) => {
        this.post = post.posts[0];
        console.log(this.post);
      });
    }
  }

  public backToPosts(): void {
    this.router.navigateByUrl('/posts');
  }
}
