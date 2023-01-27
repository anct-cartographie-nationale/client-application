import { CartographieLoaderComponent } from './cartographie-loader/cartographie-loader.component';
import { LabellisationsComponent } from './labellisations/labellisations.component';
import {
  AidantsConnectComponent,
  ApticComponent,
  CampusConnecteComponent,
  CnfsComponent,
  FabriqueDeTerritoireComponent,
  FrenchTechComponent,
  GrandesEcolesDuNumeriqueComponent,
  MaisonFranceServiceComponent,
  PointNumeriqueCafComponent,
  PointRelaisCafComponent,
  RelaisPoleEmploiComponent
} from './labellisations';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { DepartementsListComponent } from './departements-list/departements-list.component';
import { RegionsListComponent } from './regions-list/regions-list.component';
import {
  LieuxMediationNumeriqueListComponent,
  LieuMediationNumeriqueListItemComponent
} from './lieux-mediation-numerique-list';
import { LieuMediationNumeriqueMarkersComponent } from './markers/lieu-mediation-numerique-markers/lieu-mediation-numerique-markers.component';
import { DepartementMarkersComponent } from './markers/departement-markers/departement-markers.component';
import { RegionMarkersComponent } from './markers/region-markers/region-markers.component';
import { NoLieuxFoundComponent } from './no-lieux-found/no-lieux-found.component';
import { UserLocationComponent } from './user-location/user-location.component';
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
  PublicPrisEnChargeComponent,
  ServicesComponent
} from './lieux-mediation-numerique-details';

export * from './leaflet-map/leaflet-map.component';

export const components = [
  LieuxMediationNumeriqueDetailsPrintComponent,
  LieuxMediationNumeriqueDetailsComponent,
  LieuMediationNumeriqueListItemComponent,
  LieuxMediationNumeriqueListComponent,
  InformationsGeneralesComponent,
  BoutonsActionComponent,
  InformationsPratiquesComponent,
  DescriptionComponent,
  ServicesComponent,
  HorairesComponent,
  ModalitesAccompagnementComponent,
  PublicPrisEnChargeComponent,
  AidantsComponent,
  LabellisationsComponent,
  MaisonFranceServiceComponent,
  AidantsConnectComponent,
  ApticComponent,
  CampusConnecteComponent,
  FabriqueDeTerritoireComponent,
  FrenchTechComponent,
  GrandesEcolesDuNumeriqueComponent,
  PointRelaisCafComponent,
  RelaisPoleEmploiComponent,
  CnfsComponent,
  PointNumeriqueCafComponent,
  LeafletMapComponent,
  CartographieLoaderComponent,
  DepartementsListComponent,
  RegionsListComponent,
  LieuMediationNumeriqueMarkersComponent,
  DepartementMarkersComponent,
  RegionMarkersComponent,
  NoLieuxFoundComponent,
  UserLocationComponent
];
