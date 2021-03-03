import { Component, OnInit } from '@angular/core';
import { TagEnum } from '../../enum/tag.enum';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  constructor(private postService: PostService) {}
  public postsMobileView: Post[] = [];
  public leftColumnPosts: Post[] = [];
  public rightColumnPosts: Post[] = [];
  public projectsNew: Post[] = [];
  public bigNews: Post;

  ngOnInit(): void {
    this.postService.getPosts().subscribe((news) => {
      news.posts.forEach((val, index) => {
        val = this.addAuthorToPost(val);
        this.postsMobileView.push(val);
        if (index % 2 == 0) {
          this.leftColumnPosts.push(val);
        } else {
          this.rightColumnPosts.push(val);
        }
      });
    });
    this.postService.getPosts([TagEnum.aLaUne]).subscribe((news) => {
      this.bigNews = this.addAuthorToPost(news.posts[0]);
    });
    this.postService.getPosts([TagEnum.appels]).subscribe((news) => {
      let projectNews = news.posts.map((news) => (news = this.addAuthorToPost(news)));
      this.projectsNew = projectNews;
    });
  }

  public publishNews(): void {}

  //Transform excerpt post to have a custom author.
  private addAuthorToPost(post: Post): Post {
    post.author = post.excerpt;
    post.excerpt = post.html.replace(/<[^>]*>/g, '');
    return post;
  }
}
