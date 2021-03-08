import { Component, Input, OnInit } from '@angular/core';
import { TagEnum } from '../../enum/tag.enum';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  @Input() class: string;
  public tagEnum = TagEnum;
  constructor() {}

  ngOnInit(): void {}
}
