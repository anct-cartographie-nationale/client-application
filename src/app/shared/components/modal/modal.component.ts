import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppModalType } from './modal-type.enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor() {}

  @Input() public openned: boolean;
  @Input() public content: string;
  @Input() public modalType: AppModalType;
  @Output() closed = new EventEmitter<boolean>();
  public modalTypeEnum = AppModalType;

  public closeModal(value: boolean): void {
    this.closed.emit(value);
  }
}
