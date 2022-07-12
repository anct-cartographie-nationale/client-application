import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  GeometryPolygonConfiguration,
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  MapModule,
  StructureModule,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '@gouvfr-anct/mediation-numerique';
import { DistanceModule } from '@gouvfr-anct/mediation-numerique/shared';
import { UiLieuxMediationNumeriqueModule } from '@gouvfr-anct/mediation-numerique/ui';
import { CartographieLayout } from '../presentation/layouts';
import { LieuxMediationNumeriqueDetailsPage, LieuxMediationNumeriqueListPage } from '../presentation/pages';
import { GeojsonService, SearchService, StructureService } from '../services';
import metropole from '../services/assets/metropole.json';
import { CartographieFeatureRoutingModule } from './cartographie.feature-routing.module';
import { LieuMediationNumeriqueListItemComponent } from '../presentation/components/lieu-mediation-numerique-list-item/lieu-mediation-numerique-list-item.component';
import { MARKER_TYPE_CONFIGURATION, POSITION_CONFIGURATION, ZOOM_LEVEL_CONFIGURATION } from '../../../../root';
import { InformationsGeneralesComponent } from '../presentation/components/informations-generales/informations-generales.component';
import { BoutonsActionComponent } from '../presentation/components/boutons-action/boutons-action.component';
import { InformationsPratiquesComponent } from '../presentation/components/informations-pratiques/informations-pratiques.component';
import { DescriptionComponent } from '../presentation/components/description/description.component';
import { ServicesComponent } from '../presentation/components/services/services.component';
import { TypesAccompagnementComponent } from '../presentation/components/types-accompagnement/types-accompagnement.component';
import { PublicPrisEnChargeComponent } from '../presentation/components/public-pris-en-charge/public-pris-en-charge.component';
import { LabellisationsComponent } from '../presentation/components/labellisations/labellisations.component';
import { MaisonFranceServiceComponent } from '../presentation/components/labellisations/maison-france-service/maison-france-service.component';
import { AidantsConnectComponent } from '../presentation/components/labellisations/aidants-connect/aidants-connect.component';
import { ApticComponent } from '../presentation/components/labellisations/aptic/aptic.component';
import { CampusConnecteComponent } from '../presentation/components/labellisations/campus-connecte/campus-connecte.component';
import { FabriqueDeTerritoireComponent } from '../presentation/components/labellisations/fabriques-de-territoire/fabriques-de-territoire.component';
import { FrenchTechComponent } from '../presentation/components/labellisations/french-tech/french-tech.component';
import { GrandesEcolesDuNumeriqueComponent } from '../presentation/components/labellisations/grandes-ecoles-du-numerique/grandes-ecoles-du-numerique.component';
import { PointRelaisCafComponent } from '../presentation/components/labellisations/point-relais-caf/point-relais-caf.component';
import { RelaisPoleEmploiComponent } from '../presentation/components/labellisations/relais-pole-emploi/relais-pole-emploi.component';

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
    TypesAccompagnementComponent,
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
    RelaisPoleEmploiComponent
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
  providers: [
    GeojsonService,
    { provide: INITIAL_POSITION_TOKEN, useValue: POSITION_CONFIGURATION },
    { provide: ZOOM_LEVEL_TOKEN, useValue: ZOOM_LEVEL_CONFIGURATION }
  ]
})
export class CartographieFeatureModule {}
