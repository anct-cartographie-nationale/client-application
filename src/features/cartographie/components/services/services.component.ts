import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  @Input() public services?: Service[];
}
