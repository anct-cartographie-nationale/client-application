import { Component, OnInit } from '@angular/core';
import { Tag } from './models/tag.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public filters: Tag[];
  constructor() {}

  ngOnInit(): void {}

  public setFilters(tags: Tag[]): void {
    this.filters = tags;
  }
}
