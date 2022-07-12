import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-collapse',
  templateUrl: './collapse.component.html'
})
export class CollapseComponent {
  @Input() public isCollapsed: boolean = true;
  @Input() public title: string = '';
  @Input() public icon: string = '';
}
