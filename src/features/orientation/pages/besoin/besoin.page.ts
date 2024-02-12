import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { SET_TITLE_ACTION, SetTitleAction } from '../../../../root';
import {
  filterNotFoundEmailBody,
  OrientationInformationContent,
  BesoinOrientationInformationTypes,
  OrientationItemPresentation
} from '../../presenters';
import { OrientationLayout } from '../../layouts';
import demarches from './demarches.json';
import apprentissageDeBase from './apprentissage-de-base.json';
import cultureNumerique from './culture-numerique.json';
import manqueDeMateriel from './manque-de-materiel.json';
import { BESOIN_INFORMATION_MODAL_TEXTS } from './besoin-information-modal-texts';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './besoin.page.html'
})
export class BesoinPage {
  public readonly orientationInformations: Record<BesoinOrientationInformationTypes, OrientationInformationContent> =
    BESOIN_INFORMATION_MODAL_TEXTS;

  public demarchesOrientationItems: OrientationItemPresentation<string>[] = demarches;

  public cultureNumeriqueOrientationItems: OrientationItemPresentation<string>[] = cultureNumerique;

  public apprentissageDeBaseOrientationItems: OrientationItemPresentation<string>[] = apprentissageDeBase;

  public manqueDeMaterielOrientationItems: OrientationItemPresentation<string>[] = manqueDeMateriel;

  public constructor(
    public readonly orientationLayout: OrientationLayout,
    public readonly route: ActivatedRoute,
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction
  ) {
    setTitle(['Besoin', 'Orientation']);
  }

  public serviceControl: AbstractControl | null = this.orientationLayout.filterForm.get('service');

  public serviceFilter$: Observable<string | null> = this.route.queryParamMap.pipe(
    map((paramMap: ParamMap) => paramMap.get('service'))
  );

  public selectedOrientationInformation: OrientationInformationContent | null = null;

  public selectedOrientationInformationType: Service | null = null;

  public onFilterNotFound(): void {
    document.location.href = `mailto:cartographie.sonum@anct.gouv.fr?subject=[Orientation] Je ne trouve pas mon besoin&body=${filterNotFoundEmailBody()}`;
  }

  public selectOrientationInformation(service: Service): void {
    this.selectedOrientationInformationType = service;
    this.selectedOrientationInformation = this.orientationInformations[service];
  }
}
