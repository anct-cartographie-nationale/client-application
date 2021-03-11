import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-publish',
  templateUrl: './post-publish.component.html',
  styleUrls: ['./post-publish.component.scss'],
})
export class PostPublishComponent implements OnInit {
  @Output() closePublish = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  public backToPosts(): void {
    this.closePublish.emit(true);
  }
}
