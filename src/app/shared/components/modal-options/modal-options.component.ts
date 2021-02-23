import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FunctionTypeModalOptions } from '../../enum/functionTypeModalOptions.enum';

@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  styleUrls: ['./modal-options.component.scss'],
})
export class ModalOptionsComponent implements OnInit {
  functionType = FunctionTypeModalOptions;

  constructor() {}
  @Input() isModalProfileOpts = false;
  @Input() hasOwners = true;
  @Output() closed = new EventEmitter<number>();
  ngOnInit(): void {}

  public closeModal(value: number): void {
    this.closed.emit(value);
  }
}
