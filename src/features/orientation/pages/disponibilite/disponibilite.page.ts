import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import { OpeningHours } from '../../../core/presenters';
import { OrientationLayout } from '../../layouts';
import { OrientationInformationContent } from '../../presenters';

const DISPLAY_CARTOGRAPHIE_MODAL_CONTENT: OrientationInformationContent = {
  titre: 'Afficher tous les résultats',
  description:
    'En affichant les résultats, vous terminez le parcours d’orientation et accédez à la carte, filtrée selon tous les critères précédemment sélectionnés.'
};

const OPENING_HOURS_MODAL_CONTENT: OrientationInformationContent = {
  titre: 'Recherche de lieux ouverts à des horaires précis',
  description: "Vous pouvez ici choisir de filtrer la cartographie selon les jours et horaires d'ouverture des lieux."
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disponibilite.page.html'
})
export class DisponibilitePage {
  public selectedOrientationInformation: OrientationInformationContent | null = null;

  public displayCartographieLink: boolean = false;

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    public readonly route: ActivatedRoute,
    public readonly orientationLayout: OrientationLayout
  ) {}

  public hasOpeningsHours: boolean = this.orientationLayout.filterForm.controls['horaires_ouverture'].value?.length > 0;

  public onSelectOpeningHours(openingHours: OpeningHours[]): void {
    this.orientationLayout.filterForm.get('horaires_ouverture')?.setValue(openingHours);
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  public selectOrientationInformation(displayCartographie: boolean): void {
    this.displayCartographieLink = displayCartographie;
    this.selectedOrientationInformation = displayCartographie
      ? DISPLAY_CARTOGRAPHIE_MODAL_CONTENT
      : OPENING_HOURS_MODAL_CONTENT;
  }
}
