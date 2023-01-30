import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HorairesPresentation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-horaires',
  templateUrl: './horaires.component.html'
})
export class HorairesComponent {
  @Input() public horaires?: HorairesPresentation;
}
