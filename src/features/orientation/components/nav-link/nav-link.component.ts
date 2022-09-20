import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html'
})
export class NavLinkComponent {
  @Input() filtersCount: number = 0;

  @Input() link: string[] = [];
}
