import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss'],
})
export class ModalConfirmationComponent implements OnInit {
  constructor() {}
  @Input() public openned: boolean;
  @Input() public content: string;
  @Output() closed = new EventEmitter<boolean>();
  ngOnInit(): void {}

  public closeModal(value: boolean): void {
    this.closed.emit(value);
  }
}
