import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss'],
})
export class ModalConfirmationComponent {
  @Input() public openned: boolean;
  @Input() public content: string;
  @Output() closed = new EventEmitter<boolean>();

  constructor() {}

  public closeModal(value: boolean): void {
    this.closed.emit(value);
  }
}
