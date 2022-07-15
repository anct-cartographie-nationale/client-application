import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  GeometryPolygonConfiguration,
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  MapModule,
  StructureModule,
  ZoomLevelConfiguration
} from '@gouvfr-anct/mediation-numerique';
import { DistanceModule } from '@gouvfr-anct/mediation-numerique/shared';
import { UiLieuxMediationNumeriqueModule } from '@gouvfr-anct/mediation-numerique/ui';
import { MARKER_TYPE_CONFIGURATION, POSITION_CONFIGURATION } from '../../../../root';
import metropole from '../services/assets/metropole.json';
import { GeojsonService, SearchService, StructureService } from '../services';
import { CartographieLayout } from '../presentation/layouts';
import { LieuxMediationNumeriqueDetailsPage, LieuxMediationNumeriqueListPage } from '../presentation/pages';
import { CartographieFeatureRoutingModule } from './cartographie.feature-routing.module';
import {
  LeafletMapMarkerDirective,
  LeafletMapPopupDirective,
  LeafletMapStateChangeDirective,
  LeafletMapTooltipDirective
} from '../presentation/directives';
import {
  AidantsConnectComponent,
  ApticComponent,
  BoutonsActionComponent,
  CampusConnecteComponent,
  DescriptionComponent,
  FabriqueDeTerritoireComponent,
  FrenchTechComponent,
  GrandesEcolesDuNumeriqueComponent,
  InformationsGeneralesComponent,
  InformationsPratiquesComponent,
  LabellisationsComponent,
  LeafletMapComponent,
  LieuMediationNumeriqueListItemComponent,
  MaisonFranceServiceComponent,
  PointRelaisCafComponent,
  PublicPrisEnChargeComponent,
  RelaisPoleEmploiComponent
} from '../presentation/components';
import { ServicesComponent } from '../presentation/components/services/services.component';
import { ModalitesAccompagnementComponent } from '../presentation/components/modalites-accompagnement/modalites-accompagnement.component';

@NgModule({
  declarations: [
    CartographieLayout,
    LieuxMediationNumeriqueListPage,
    LieuxMediationNumeriqueDetailsPage,
    LieuMediationNumeriqueListItemComponent,
    InformationsGeneralesComponent,
    BoutonsActionComponent,
    InformationsPratiquesComponent,
    DescriptionComponent,
    ServicesComponent,
    ModalitesAccompagnementComponent,
    PublicPrisEnChargeComponent,
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
    LeafletMapComponent,
    LeafletMapPopupDirective,
    LeafletMapStateChangeDirective,
    LeafletMapTooltipDirective,
    LeafletMapMarkerDirective
  ],
  imports: [
    HttpClientModule,
    MapModule.forRoot(
      metropole as GeometryPolygonConfiguration,
      {} as ZoomLevelConfiguration,
      {} as InitialPositionConfiguration,
      MARKER_TYPE_CONFIGURATION,
      GeojsonService
    ),
    StructureModule.forRoot(SearchService, StructureService),
    CartographieFeatureRoutingModule,
    CommonModule,
    UiLieuxMediationNumeriqueModule,
    DistanceModule
  ],
  providers: [GeojsonService, { provide: INITIAL_POSITION_TOKEN, useValue: POSITION_CONFIGURATION }]
})
export class CartographieFeatureModule {}
