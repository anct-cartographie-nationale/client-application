import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FilterPresentation } from '../../../core/presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {
  @Input() filter?: FilterPresentation;

  @Input() size: 'sm' | 'auto' = 'auto';
}
