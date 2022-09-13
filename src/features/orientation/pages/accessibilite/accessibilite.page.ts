import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrientationLayout } from '../../layouts';
import { OrientationItemPresentation } from '../../presenters';
import conditionFinancieres from './conditions-financieres.json';
import typeAccompagnements from './type-accompagnements.json';
import accueilSpecifique from './accueil-specifique.json';
import typePublic from './type-de-public.json';
import { PublicAccueilli } from '@features/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accessibilite.page.html'
})
export class AccessibilitePage {
  public conditionFinancieresOptions: OrientationItemPresentation<string>[] = conditionFinancieres;
  public typeAccompagnementsOptions: OrientationItemPresentation<string>[] = typeAccompagnements;
  public accueilSpecifiqueOptions: OrientationItemPresentation<string>[] = accueilSpecifique;
  public typePublicOptions: OrientationItemPresentation<string>[] = typePublic;

  public publicsAccueillisCompteur = (filter: PublicAccueilli[], target: OrientationItemPresentation<string>[]): number => {
    const publicsAcceuillisCount = target.filter((item: { label: string; value: string }) =>
      filter.includes(item.value as PublicAccueilli)
    );
    return publicsAcceuillisCount.length;
  };

  public constructor(public readonly orientationLayout: OrientationLayout) {}
}
