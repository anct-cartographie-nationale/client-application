import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input-modal',
  templateUrl: './text-input-modal.component.html',
  styleUrls: ['./text-input-modal.component.scss'],
})
export class TextInputModalComponent {
  @Input() public openned: boolean;
  @Input() public content: string;
  @Input() public placeholder: string;
  @Output() closed = new EventEmitter<boolean>();

  public myContent: string;
  constructor() {}

  public closeModal(value: boolean): void {
    this.closed.emit(value);
  }
}
