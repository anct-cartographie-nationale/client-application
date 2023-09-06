import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FEATURES_TOKEN, FeaturesConfiguration, SET_TITLE_ACTION, SetTitleAction } from '../../../../root';
import { OpeningHours } from '../../../core/presenters';
import { OrientationLayout } from '../../layouts';
import { OrientationInformationContent } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disponibilite.page.html'
})
export class DisponibilitePage {
  public selectedOrientationInformation: OrientationInformationContent = {
    titre: 'Recherche de lieux ouverts à des horaires précis',
    description: "Vous pouvez ici choisir de filtrer la cartographie selon les jours et horaires d'ouverture des lieux."
  };

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    public readonly route: ActivatedRoute,
    public readonly orientationLayout: OrientationLayout,
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction
  ) {
    setTitle(['Disponibilité', 'Orientation']);
  }

  public hasOpeningsHours: boolean = this.orientationLayout.filterForm.controls['horaires_ouverture'].value?.length > 0;

  public onSelectOpeningHours(openingHours: OpeningHours[]): void {
    this.orientationLayout.filterForm.get('horaires_ouverture')?.setValue(openingHours);
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}
