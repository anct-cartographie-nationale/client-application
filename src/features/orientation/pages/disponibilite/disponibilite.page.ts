import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import { OpeningHours } from '../../../core';
import { OrientationLayout } from '../../layouts';
import { OrientationInformationContent } from '../../presenters';

const DISPLAY_CARTOGRAPHIE_MODAL_CONTENT: OrientationInformationContent = {
  titre: 'J’affiche les résultats',
  description:
    'En accédant aux résultats, vous quiterez l’outil d’orientation et accèderez à la carte, filtré selon tous les critères séléctionnés'
};

const OPENING_HOURS_MODAL_CONTENT: OrientationInformationContent = {
  titre: 'Rechercher à des horaires précis',
  description:
    'Vous pouvez choisir plusieurs plage horaire dans cet onglet interagissant avec les menus déroulants. L’outil ne sélectionnera que des structures disponibles à l’une ou l’autre des plages horaires que vous avez renseigné'
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
