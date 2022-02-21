import { Component, Input } from '@angular/core';
import { TagEnum } from '../../enum/tag.enum';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-tag',
  templateUrl: './post-tag.component.html',
  styleUrls: ['./post-tag.component.scss'],
})
export class PostTagComponent {
  @Input() post: Post;

  public displayTag(post: Post): string {
    if (post.tags.length > 1) {
      return post.tags.filter((tag) => tag.slug !== TagEnum.aLaUne)[0].name;
    }
    return post.tags[0].name;
  }
}
