import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Tag } from '../../models/tag.model';
import { TypeModalNews } from '../../enum/typeModalNews.enum';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-post-modal-filters',
  templateUrl: './post-modal-filters.component.html',
  styleUrls: ['./post-modal-filters.component.scss'],
})
export class PostModalFiltersComponent implements OnInit, OnChanges {
  @Input() public modalType: TypeModalNews;
  @Input() public tags: Tag[];
  @Output() searchEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();
  // Checkbox variable
  @Input() public inputCheckedTags: Tag[] = [];
  public checkedTags: Tag[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputCheckedTags) {
      this.checkedTags = this.inputCheckedTags;
    }
  }

  ngOnInit(): void {
    this.checkedTags = this.inputCheckedTags;
  }

  // Management of the checkbox event (Check / Uncheck)
  public onCheckboxChange(event, tag: Tag): void {
    if (event.target.checked) {
      this.checkedTags.push(tag);
    } else {
      // Check if the module is present in the list and remove it
      if (this.getIndex(this.checkedTags, tag.slug) > -1) {
        this.checkedTags.splice(this.getIndex(this.checkedTags, tag.slug), 1);
      }
    }
  }

  // Clear only filters in the current modal
  public clearFilters(): void {
    this.checkedTags = [];
    this.searchEvent.emit(this.checkedTags);
  }

  public getModalType(): string {
    switch (this.modalType) {
      case TypeModalNews.location:
        return 'location';
      case TypeModalNews.public:
        return 'public';
      default:
        return '';
    }
  }

  public emit(data: Tag[]): void {
    this.searchEvent.emit(data);
  }

  public getIndex(array: Tag[], slug: string): number {
    return array.findIndex((tag: Tag) => tag.slug === slug);
  }

  public closeModal(): void {
    this.closeEvent.emit();
  }
}
