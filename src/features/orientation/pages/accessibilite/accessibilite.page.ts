import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PublicAccueilli } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OrientationLayout } from '../../layouts';
import { OrientationItemPresentation } from '../../presenters';
import conditionAcces from './condition-acces.json';
import modaliteAccompagnements from './modalite-accompagnements.json';
import publicSpecifiqueAcceuilli from './public-specifique-accueilli.json';
import publicAccueilli from './public-accueilli.json';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accessibilite.page.html'
})
export class AccessibilitePage {
  public conditionAccesOptions: OrientationItemPresentation<string>[] = conditionAcces;
  public modaliteAccompagnementsOptions: OrientationItemPresentation<string>[] = modaliteAccompagnements;
  public publicSpecifiqueAcceuilliOptions: OrientationItemPresentation<string>[] = publicSpecifiqueAcceuilli;
  public publicAccueilliOptions: OrientationItemPresentation<string>[] = publicAccueilli;

  public publicsAccueillisCompteur = (filter: PublicAccueilli[], target: OrientationItemPresentation<string>[]): number => {
    const publicsAcceuillisCount = target.filter((item: { label: string; value: string }) =>
      filter.includes(item.value as PublicAccueilli)
    );
    return publicsAcceuillisCount.length;
  };

  public constructor(public readonly orientationLayout: OrientationLayout) {}
}
