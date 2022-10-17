import { BoutonsActionComponent } from './boutons-action/boutons-action.component';
import { CartographieLoaderComponent } from './cartographie-loader/cartographie-loader.component';
import { DescriptionComponent } from './description/description.component';
import { HorairesComponent } from './horaires/horaires.component';
import { InformationsGeneralesComponent } from './informations-generales/informations-generales.component';
import { InformationsPratiquesComponent } from './informations-pratiques/informations-pratiques.component';
import { LabellisationsComponent } from './labellisations/labellisations.component';
import { AidantsComponent } from './aidants/aidants.component';
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
import { LieuMediationNumeriqueListItemComponent } from './lieu-mediation-numerique-list-item/lieu-mediation-numerique-list-item.component';
import { ModalitesAccompagnementComponent } from './modalites-accompagnement/modalites-accompagnement.component';
import { PublicPrisEnChargeComponent } from './public-pris-en-charge/public-pris-en-charge.component';
import { ServicesComponent } from './services/services.component';
import { DepartementsListComponent } from './departements-list/departements-list.component';
import { RegionsListComponent } from './regions-list/regions-list.component';
import { LieuxMediationNumeriqueListComponent } from './lieux-mediation-numerique-list/lieux-mediation-numerique-list.component';
import { LieuMediationNumeriqueMarkersComponent } from './markers/lieu-mediation-numerique-markers/lieu-mediation-numerique-markers.component';
import { DepartementMarkersComponent } from './markers/departement-markers/departement-markers.component';
import { RegionMarkersComponent } from './markers/region-markers/region-markers.component';
import { NoLieuxFoundComponent } from './no-lieux-found/no-lieux-found.component';

export * from './leaflet-map/leaflet-map.component';

export const components = [
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
  NoLieuxFoundComponent
];
