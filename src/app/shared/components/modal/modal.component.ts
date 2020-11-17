import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor() {}

  @Input() public openned: boolean;
  @Input() public content: string;
  @Output() closed = new EventEmitter();
  ngOnInit(): void {}

  public closeModal(): void {
    this.closed.emit();
  }
}
