import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrientationLayout } from '../../layouts';
import fraisACharge from './frais-a-charge.json';
import accompagnements from './accompagnements.json';
import accueilSpecifique from './accueil-specifique.json';
import publicPrecis from './public-precis.json';
import { OrientationItemPresentation } from '@features/orientation/domain/presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accessibilite.page.html'
})
export class AccessibilitePage {
  public fraisAChargeOptions: OrientationItemPresentation<string>[] = fraisACharge;
  public accompagnementsOptions: OrientationItemPresentation<string>[] = accompagnements;
  public accueilSpecifiqueOptions: OrientationItemPresentation<string>[] = accueilSpecifique;
  public publicPrecisOptions: OrientationItemPresentation<string>[] = publicPrecis;

  public constructor(public readonly orientationLayout: OrientationLayout) {}
}
