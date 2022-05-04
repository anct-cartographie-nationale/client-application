import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-copy-paste',
  templateUrl: './copy-paste.component.html',
  styleUrls: ['./copy-paste.component.scss']
})
export class CopyPasteComponent implements OnInit {
  @Input() copiedDayName = '';
  @Input() day = null;

  @Output() copyEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();
  @Output() pasteEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  public copy(): void {
    this.copyEvent.emit(this.day);
  }

  public paste(): void {
    this.pasteEvent.emit(this.day);
  }

  public cancel(): void {
    this.cancelEvent.emit();
  }
}
