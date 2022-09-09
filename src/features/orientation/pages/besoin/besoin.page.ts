import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrientationItemPresentation } from '../../presenters';
import { OrientationLayout } from '../../layouts';
import demarches from './demarches.json';
import apprentissageDeBase from './apprentissage-de-base.json';
import cultureNumerique from './culture-numerique.json';
import manqueDeMateriel from './manque-de-materiel.json';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './besoin.page.html'
})
export class BesoinPage {
  public demarchesOrientationItems: OrientationItemPresentation<string>[] = demarches;

  public cultureNumeriqueOrientationItems: OrientationItemPresentation<string>[] = cultureNumerique;

  public apprentissageDeBaseOrientationItems: OrientationItemPresentation<string>[] = apprentissageDeBase;

  public manqueDeMaterielOrientationItems: OrientationItemPresentation<string>[] = manqueDeMateriel;

  public constructor(public readonly orientationLayout: OrientationLayout) {}
}
