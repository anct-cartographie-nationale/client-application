import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Service } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  @Input() public services?: Service[];
}
