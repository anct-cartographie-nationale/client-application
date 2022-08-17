import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Url } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-boutons-action',
  templateUrl: './boutons-action.component.html'
})
export class BoutonsActionComponent {
  @Input() public courriel?: string;
  @Input() public siteWeb?: Url[];

  public printPage() {
    window.print();
  }
}
