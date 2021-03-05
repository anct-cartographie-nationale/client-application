import { Component, OnInit } from '@angular/core';
import { WindowScrollService } from '../../../shared/service/windowscroll.service';
import { TagEnum } from '../../enum/tag.enum';
import { Pagination } from '../../models/pagination.model';
import { Post } from '../../models/post.model';
import { PostWithMeta } from '../../models/postWithMeta.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  constructor(private postService: PostService, private windowScrollService: WindowScrollService) {
    this.windowScrollService.scrollY$.subscribe((evt: any) => {
      if (evt && evt.target.offsetHeight + evt.target.scrollTop >= evt.target.scrollHeight - 200) {
        if (!this.isLoading) {
          this.loadMore();
        }
      }
    });
  }
  public postsMobileView: Post[] = [];
  public leftColumnPosts: Post[] = [];
  public rightColumnPosts: Post[] = [];
  public projectsNew: Post[] = [];
  public bigNews: Post;
  public pagination: Pagination;
  public isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(1).subscribe((news) => {
      this.setNews(news);
    });
    this.postService.getPosts(1, [TagEnum.aLaUne]).subscribe((news) => {
      this.bigNews = this.addAuthorToPost(news.posts[0]);
    });
    this.postService.getPosts(1, [TagEnum.appels]).subscribe((news) => {
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

  // Load more news on scroll event.
  private loadMore(): void {
    if (this.pagination.page < this.pagination.pages) {
      this.isLoading = true;
      this.postService.getPosts(this.pagination.next).subscribe((news) => {
        this.setNews(news);
      });
    }
  }

  // Split news on two columns on desktop mode or one column in mobile mode.
  private setNews(news: PostWithMeta): void {
    this.pagination = news.meta.pagination;
    const customIndex = this.postsMobileView.length; // For scroll loading, start with previous index.
    news.posts.forEach((val, index) => {
      val = this.addAuthorToPost(val);
      index += customIndex;
      if (index % 2 == 0) {
        this.leftColumnPosts.push(val);
      } else {
        this.rightColumnPosts.push(val);
      }
      this.postsMobileView.push(val);
    });
    this.isLoading = false;
  }
}
