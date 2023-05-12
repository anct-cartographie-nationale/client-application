import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OrientationLayout } from '../../layouts';
import {
  OrientationInformationContent,
  OrientationItemPresentation,
  AccessibiliteOrientationInformationTypes
} from '../../presenters';
import conditionAcces from './condition-acces.json';
import publicSpecifiqueAcceuilli from './public-specifique-accueilli.json';
import { ACCESSIBILITE_INFORMATION_MODAL_TEXTS } from './accessibilite-information-modal-texts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accessibilite.page.html'
})
export class AccessibilitePage {
  public selectedOrientationInformation: OrientationInformationContent | null = null;

  public selectedOrientationInformationType: Service | null = null;

  public conditionAccesOptions: OrientationItemPresentation<string>[] = conditionAcces;

  public publicSpecifiqueAcceuilliOptions: OrientationItemPresentation<string>[] = publicSpecifiqueAcceuilli;

  public constructor(public readonly orientationLayout: OrientationLayout) {}

  public readonly orientationInformations: Record<AccessibiliteOrientationInformationTypes, OrientationInformationContent> =
    ACCESSIBILITE_INFORMATION_MODAL_TEXTS;
}
