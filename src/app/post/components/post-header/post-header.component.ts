import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tag } from '../../models/tag.model';
import { TagWithMeta } from '../../models/tagWithMeta.model';
import * as _ from 'lodash';
import { TypeModalNews } from '../../enum/typeModalNews.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { TagEnum } from '../../enum/tag.enum';
import { parseSlugToTag } from '../utils/NewsUtils';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss'],
})
export class PostHeaderComponent implements OnInit {
  public modalTypeOpened: TypeModalNews;
  public tags: TagWithMeta;
  public mainActiveTag: Tag = new Tag({ slug: TagEnum.aLaUne });
  public tagEnum = TagEnum;

  public checkedPublicTags: Tag[] = [];
  public checkedLocationTags: Tag[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data.tags) {
        this.tags = data.tags;
        this.tags.others.forEach((tag) => {
          tag.slug == TagEnum.aLaUne ? (tag.name = 'Les + récentes') : tag.name;
        });
        this.tags.commune.sort((tagA, tagB) => {
          return this.sortArray(tagA, tagB);
        });
      }
    });

    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.mainTag) {
        this.mainActiveTag = new Tag({ slug: queryParams.mainTag });
      }
      if (queryParams.publicTags) {
        this.checkedPublicTags = parseSlugToTag(queryParams.publicTags);
      }
      if (queryParams.locationTags) {
        this.checkedLocationTags = parseSlugToTag(queryParams.locationTags);
      }
    });
  }

  private sortArray(tagA: Tag, tagB: Tag): number {
    const nameTagA = tagA.name.toUpperCase();
    const nameTagB = tagB.name.toUpperCase();
    if (nameTagA < nameTagB) {
      return -1;
    }
    return 1;
  }
  // Open the modal and display the list according to the right filter button
  public openModal(modalType: TypeModalNews): void {
    // if modal already opened, reset type
    if (this.modalTypeOpened === modalType) {
      this.closeModal();
    } else if (this.modalTypeOpened !== modalType) {
      this.modalTypeOpened = modalType;
    }
  }

  public closeModal(): void {
    this.modalTypeOpened = undefined;
  }

  // Accessor to template angular.
  public get TypeModal(): typeof TypeModalNews {
    return TypeModalNews;
  }

  public getModalData(): Tag[] {
    if (this.modalTypeOpened === this.TypeModal.public) {
      return this.tags.public;
    }
    return this.tags.commune;
  }

  public getCheckedModalData(): Tag[] {
    if (this.modalTypeOpened === this.TypeModal.public) {
      return this.checkedPublicTags;
    }
    return this.checkedLocationTags;
  }

  public activateTag(tag: Tag): void {
    this.mainActiveTag = tag;
    this.setQueryParam();
  }

  public filter(data: Tag[]): void {
    if (this.modalTypeOpened === this.TypeModal.public) {
      this.checkedPublicTags = data;
    } else {
      this.checkedLocationTags = data;
    }

    this.setQueryParam();
    this.closeModal();
  }

  private setQueryParam(): void {
    this.router.navigate(['/news'], {
      relativeTo: this.route,
      queryParams: {
        mainTag: this.mainActiveTag.slug == this.tagEnum.etudes ? this.mainActiveTag.name : this.mainActiveTag.slug,
        publicTags: this.checkedPublicTags.map((tag) => tag.slug),
        locationTags: this.checkedLocationTags.map((tag) => tag.slug),
      },
      queryParamsHandling: 'merge',
    });
  }
}
