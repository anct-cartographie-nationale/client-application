import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SET_TITLE_ACTION, SetTitleAction } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gestion-des-cookies.page.html'
})
export class GestionDesCookiesPage {
  public constructor(@Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction) {
    setTitle(['Gestion des cookies']);
  }
}
