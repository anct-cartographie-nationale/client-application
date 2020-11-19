import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() public style: string;
  @Input() public text: string;
  @Input() public type: string;
  @Input() public iconBtn: string;
  @Output() public action = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public doAction(): void {
    this.action.emit();
  }
}
