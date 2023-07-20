import { CartographieLoaderComponent } from './cartographie-loader/cartographie-loader.component';
import { LabellisationsComponent } from './labellisations/labellisations.component';
import { DepartementsListComponent } from './departements-list/departements-list.component';
import { RegionsListComponent } from './regions-list/regions-list.component';
import {
  LieuxMediationNumeriqueListComponent,
  LieuMediationNumeriqueListItemComponent,
  LieuxMediationNumeriqueListPrintComponent,
  HubModalComponent
} from './lieux-mediation-numerique-list';
import { LieuMediationNumeriqueMarkersComponent } from './markers/lieu-mediation-numerique-markers/lieu-mediation-numerique-markers.component';
import { TerritoireMarkersComponent } from './markers/territoire-markers/territoire-markers.component';
import { NoLieuxFoundComponent } from './no-lieux-found/no-lieux-found.component';
import {
  AidantsComponent,
  BoutonsActionComponent,
  DescriptionComponent,
  HorairesComponent,
  InformationsGeneralesComponent,
  InformationsPratiquesComponent,
  LieuxMediationNumeriqueDetailsComponent,
  LieuxMediationNumeriqueDetailsPrintComponent,
  ModalitesAccompagnementComponent,
  OrientationSheetModalComponent,
  SendByEmailModalComponent,
  PublicPrisEnChargeComponent,
  ServicesComponent,
  MiseAJourComponent,
  AccessibiliteComponent
} from './lieux-mediation-numerique-details';
import { LabelModalComponent } from './label-modal/label-modal.component';
import { LocationBreadcrumbComponent } from './location-breadcrumb/location-breadcrumb.component';
import { AffinerRechercheFormComponent } from './affiner-recherche-form/affiner-recherche-form.component';
import { ModifierOrientationComponent } from './modifier-orientation/modifier-orientation.component';

export const components = [
  AffinerRechercheFormComponent,
  LieuxMediationNumeriqueDetailsPrintComponent,
  LieuxMediationNumeriqueDetailsComponent,
  LieuMediationNumeriqueListItemComponent,
  LieuxMediationNumeriqueListComponent,
  LieuxMediationNumeriqueListPrintComponent,
  InformationsGeneralesComponent,
  BoutonsActionComponent,
  InformationsPratiquesComponent,
  DescriptionComponent,
  ServicesComponent,
  HorairesComponent,
  ModalitesAccompagnementComponent,
  OrientationSheetModalComponent,
  SendByEmailModalComponent,
  PublicPrisEnChargeComponent,
  AidantsComponent,
  LabellisationsComponent,
  CartographieLoaderComponent,
  DepartementsListComponent,
  RegionsListComponent,
  LieuMediationNumeriqueMarkersComponent,
  TerritoireMarkersComponent,
  NoLieuxFoundComponent,
  HubModalComponent,
  LabelModalComponent,
  MiseAJourComponent,
  AccessibiliteComponent,
  LocationBreadcrumbComponent,
  ModifierOrientationComponent
];
