import { Component, OnInit } from '@angular/core';
import { WindowScrollService } from '../../../shared/service/windowScroll.service';
import { TagEnum } from '../../enum/tag.enum';
import { Pagination } from '../../models/pagination.model';
import { Post } from '../../models/post.model';
import { Tag } from '../../models/tag.model';
import { PostWithMeta } from '../../models/postWithMeta.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { parseSlugToTag } from '../utils/NewsUtils';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public selectedMainTagSlug = '';
  public selectedLocationTagSlug = [];
  public selectedPublicTagsSlug = [];
  public filters: Tag[];
  public allPosts: Post[] = [];
  public leftColumnPosts: Post[] = [];
  public rightColumnPosts: Post[] = [];
  public bigNews: Post;
  public pagination: Pagination;
  public isLoading = false;
  public isPublishMode = false;

  constructor(
    private postService: PostService,
    private windowScrollService: WindowScrollService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.windowScrollService.scrollY$.subscribe((evt: any) => {
      if (evt && evt.target.offsetHeight + evt.target.scrollTop >= evt.target.scrollHeight - 200) {
        if (!this.isLoading) {
          this.loadMore();
        }
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    // Init APP news list
    this.postService.getPosts(1, [TagEnum.aLaUne]).subscribe((news) => {
      if (news.posts[0]) {
        this.bigNews = this.addAuthorToPost(news.posts[0]);
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      this.isPublishMode = false;
      // If main tag is in route, set it
      if (queryParams.mainTag) {
        this.selectedMainTagSlug = queryParams.mainTag;
        this.selectedPublicTagsSlug = parseSlugToTag(queryParams.publicTags);
        this.selectedLocationTagSlug = parseSlugToTag(queryParams.locationTags);
        // Set filters for search and display
        this.filters = [
          new Tag({ slug: queryParams.mainTag }),
          ...this.selectedLocationTagSlug,
          ...this.selectedPublicTagsSlug,
        ];
        // Apply search
        this.getPosts(this.filters);
      } else {
        // Init default news list
        this.postService.getPosts(1).subscribe((news) => {
          this.setNews(news);
          this.allPosts.unshift(this.bigNews);
        });
      }
    });
  }

  public getPosts(filters?: Tag[]): void {
    // Parse filter
    let parsedFilters = null;
    if (filters) {
      parsedFilters = filters.map((filter) => {
        return filter.slug;
      });

      if (parsedFilters.length <= 0) {
        parsedFilters = null;
      }
    }

    // Reset posts
    this.resetPosts();

    this.isLoading = true;
    this.postService.getPosts(1, parsedFilters).subscribe((news) => {
      this.setNews(news);
    });
  }

  public getDisplayedTag(): string {
    if (!this.isALaUneTag()) {
      return this.selectedMainTagSlug;
    }
    return 'autres actualités';
  }

  public isALaUneTag(): boolean {
    if (!this.filters || this.filters[0].slug === TagEnum.aLaUne) {
      return true;
    }
    return false;
  }

  public resetPosts(): void {
    this.leftColumnPosts = [];
    this.rightColumnPosts = [];
    this.allPosts = [];
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
    if (this.pagination && this.pagination.page < this.pagination.pages) {
      this.isLoading = true;
      this.postService.getPosts(this.pagination.next).subscribe((news) => {
        this.setNews(news);
      });
    }
  }

  // Split news on two columns on desktop mode or one column in mobile mode.
  private setNews(news: PostWithMeta): void {
    this.pagination = news.meta.pagination;
    const customIndex = this.allPosts.length; // For scroll loading, start with previous index.
    this.allPosts = news.posts.map((val, index) => {
      val = this.addAuthorToPost(val);
      index += customIndex;
      return val;
    });
    this.isLoading = false;
  }

  public removeTag(tagToRemove: Tag): void {
    _.remove(this.selectedPublicTagsSlug, { slug: tagToRemove.slug });
    _.remove(this.selectedLocationTagSlug, { slug: tagToRemove.slug });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        mainTag: this.selectedMainTagSlug,
        publicTags: this.selectedPublicTagsSlug.map((tag) => tag.slug),
        locationTags: this.selectedLocationTagSlug.map((tag) => tag.slug),
      },
      queryParamsHandling: 'merge',
    });
  }

  public displayTags(): boolean {
    return this.selectedLocationTagSlug.length > 0 || this.selectedPublicTagsSlug.length > 0;
  }
}
