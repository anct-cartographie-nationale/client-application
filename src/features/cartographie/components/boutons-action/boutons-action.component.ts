import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-boutons-action',
  templateUrl: './boutons-action.component.html'
})
export class BoutonsActionComponent {
  @Input() public courriel?: string;
  @Input() public siteWeb?: string[];
  @Input() public priseRdv?: string;

  public printPage() {
    window.print();
  }
}
