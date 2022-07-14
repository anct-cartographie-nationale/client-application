import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrientationLayout } from '../../layouts';
import { OrientationItemPresentation } from '../../../../domain/presenters';
import demarches from './demarches.json';
import miseANiveau from './miseANiveau.json';
import manqueDeMateriel from './manqueDeMateriel.json';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './besoin.page.html'
})
export class BesoinPage {
  public demarcheOrientationItems: OrientationItemPresentation<string>[] = demarches;

  public miseANiveauOrientationItems: OrientationItemPresentation<string>[] = miseANiveau;

  public manqueDeMaterielItems: OrientationItemPresentation<string>[] = manqueDeMateriel;

  public constructor(public readonly orientationLayout: OrientationLayout) {}
}
