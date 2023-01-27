import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-description',
  templateUrl: './description.component.html'
})
export class DescriptionComponent {
  @Input() public resumee?: string;
  @Input() public detail?: string;
}
