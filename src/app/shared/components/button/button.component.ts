import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public style = 'regular';
  @Input() public text: string;
  @Input() public type: string;
  @Input() public iconType = 'ico';
  @Input() public iconBtn: string;
  @Input() public iconPos = 'left';
  @Input() public extraClass: string;
  @Input() public disabled = false;
  @Output() public action = new EventEmitter();

  public doAction(): void {
    this.action.emit();
  }
}
