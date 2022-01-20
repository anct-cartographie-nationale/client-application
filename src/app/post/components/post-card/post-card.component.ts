import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagEnum } from '../../enum/tag.enum';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post: Post;
  @Input() class: string;
  public tagEnum = TagEnum;
  constructor(private router: Router) {}

  public showDetails(post: Post): void {
    this.router.navigateByUrl('news/details/' + post.id, { state: { data: post } });
  }

  public isAppelAProjet(): boolean {
    return this.post.tags[0].slug === this.tagEnum.appels;
  }
}
