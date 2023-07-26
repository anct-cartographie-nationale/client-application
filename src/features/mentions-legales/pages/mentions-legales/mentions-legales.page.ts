import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SET_TITLE_ACTION, SetTitleAction } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mentions-legales.page.html'
})
export class MentionsLegalesPage {
  public constructor(@Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction) {
    setTitle(['Mentions légales']);
  }
}
