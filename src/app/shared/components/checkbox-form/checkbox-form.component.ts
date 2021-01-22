import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.scss'],
})
export class CheckboxFormComponent implements OnInit {
  @Input() public isChecked: boolean;
  @Input() public text: string;
  @Input() public iconSvg: string;
  @Output() checkEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  clicked() {
    this.isChecked = !this.isChecked;
    this.checkEvent.emit(this.isChecked);
  }
}
