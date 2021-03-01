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
  news: PostWithMeta;
  leftColumnPosts: Post[] = [];
  rightColumnPosts: Post[] = [];
  projectsNew: Post[] = [];
  bigNews: Post;
  ngOnInit(): void {
    this.postService.getPosts().subscribe((news) => {
      console.log(news);
      news.posts.forEach((val, index) => {
        if (index % 2 == 0) {
          this.leftColumnPosts.push(val);
        } else {
          this.rightColumnPosts.push(val);
        }
      });
    });
    this.postService.getPosts(['bignew']).subscribe((news) => {
      this.bigNews = news.posts[0];
      console.log(this.bigNews);
    });
  }

  public publishNews(): void {}
}
