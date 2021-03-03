import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostWithMeta } from '../../models/postWithMeta.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  constructor(private postService: PostService) {}
  postsMobileView: Post[] = [];
  leftColumnPosts: Post[] = [];
  rightColumnPosts: Post[] = [];
  projectsNew: Post[] = [];
  bigNews: Post;

  ngOnInit(): void {
    this.postService.getPosts().subscribe((news) => {
      news.posts.forEach((val, index) => {
        this.postsMobileView.push(val);
        if (index % 2 == 0) {
          this.leftColumnPosts.push(val);
        } else {
          this.rightColumnPosts.push(val);
        }
      });
    });
    this.postService.getPosts(['a-la-une']).subscribe((news) => {
      this.bigNews = news.posts[0];
    });
    this.postService.getPosts(['appels']).subscribe((news) => {
      this.projectsNew = news.posts;
    });
  }

  public publishNews(): void {}
}
