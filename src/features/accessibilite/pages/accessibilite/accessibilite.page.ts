import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SET_TITLE_ACTION, SetTitleAction } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accessibilite.page.html'
})
export class AccessibilitePage {
  public constructor(@Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction) {
    setTitle(['Accessibilité']);
  }
}
