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

@NgModule({
  declarations: [
    CartographieLayout,
    LieuxMediationNumeriqueListPage,
    LieuxMediationNumeriqueDetailsPage,
    LieuMediationNumeriqueListItemComponent
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
