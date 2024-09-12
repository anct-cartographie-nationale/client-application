import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SET_TITLE_ACTION, SetTitleAction } from '../../../../root';
import { OrientationLayout } from '../../layouts';
import {
  AccessibiliteOrientationInformationTypes,
  OrientationInformationContent,
  OrientationItemPresentation
} from '../../presenters';
import priseEnChargeSpecifique from './prise-en-charge-specifique.json';
import { ACCESSIBILITE_INFORMATION_MODAL_TEXTS } from './accessibilite-information-modal-texts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accessibilite.page.html'
})
export class AccessibilitePage {
  public selectedOrientationInformation: OrientationInformationContent | null = null;

  public priseEnChargeSpecifiqueOptions: OrientationItemPresentation<string>[] = priseEnChargeSpecifique;

  public readonly orientationInformations: Record<AccessibiliteOrientationInformationTypes, OrientationInformationContent> =
    ACCESSIBILITE_INFORMATION_MODAL_TEXTS;

  public constructor(
    public readonly orientationLayout: OrientationLayout,
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction
  ) {
    setTitle(['Accessibilité', 'Orientation']);
  }
}
