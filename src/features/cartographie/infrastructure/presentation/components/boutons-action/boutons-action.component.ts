import { Component, Input } from '@angular/core';
import { Url } from 'projects/client-application/src/models';

@Component({
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
