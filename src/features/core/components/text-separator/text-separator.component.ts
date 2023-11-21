import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-text-separator',
  templateUrl: './text-separator.component.html'
})
export class TextSeparatorComponent {
  @HostBinding('style.display') public color: string = 'block';

  @Input() public background: 'white' | 'light' = 'white';
}
