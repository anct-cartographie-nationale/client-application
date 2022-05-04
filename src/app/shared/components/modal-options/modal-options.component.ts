import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  styleUrls: ['./modal-options.component.scss']
})
export class ModalOptionsComponent implements OnInit {
  constructor() {}
  @Input() isModalProfileOpts = false;
  @Input() hasOwners = true;
  @Input() public isEditFormView? = false;
  @Output() closed = new EventEmitter<number>();
  ngOnInit(): void {}

  public closeModal(value: number): void {
    this.closed.emit(value);
  }
}
