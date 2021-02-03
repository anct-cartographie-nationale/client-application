import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss'],
})
export class ModalConfirmationComponent implements OnInit {
  constructor() {}

  @Output() closeModalEvent = new EventEmitter<boolean>();
  ngOnInit(): void {}

  onDismiss() {
    this.closeModalEvent.emit(false);
  }

  onConfirm() {
    this.closeModalEvent.emit(true);
  }
}
