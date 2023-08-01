import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SET_TITLE_ACTION, SetTitleAction } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donnees-personnelles.page.html'
})
export class DonneesPersonnellesPage {
  public constructor(@Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction) {
    setTitle(['Données personnelles']);
  }
}
