import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: 'collapse.html'
})
export class CollapseComponent {
  @Input() public isCollapsed: boolean = true;
  @Input() public title: string = '';
  @Input() public icon: string = '';
}
