import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrientationLayout } from '../../layouts';
import fraisACharge from './frais-a-charge.json';
import accompagnements from './accompagnements.json';
import accueilSpecifique from './accueil-specifique.json';
import publicPrecis from './public-precis.json';

type OrientationOption<T> = {
  label: string;
  value: T;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accessibilite.page.html'
})
export class AccessibilitePage {
  public fraisAChargeOptions: OrientationOption<string>[] = fraisACharge;
  public accompagnementsOptions: OrientationOption<string>[] = accompagnements;
  public accueilSpecifiqueOptions: OrientationOption<string>[] = accueilSpecifique;
  public publicPrecisOptions: OrientationOption<string>[] = publicPrecis;

  public constructor(public readonly orientationLayout: OrientationLayout) {}
}
