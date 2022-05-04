import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.scss']
})
export class CheckboxFormComponent implements OnInit {
  @Input() public isChecked: boolean;
  @Input() public text: string;
  @Input() public iconSvg: string;
  @Input() public iconType: string;
  @Output() checkEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  public clicked(): void {
    this.isChecked = !this.isChecked;
    this.checkEvent.emit(this.isChecked);
  }
}
