import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-description',
  templateUrl: './description.component.html'
})
export class DescriptionComponent {
  @Input() public resume?: string;
  @Input() public detail?: string;
}
