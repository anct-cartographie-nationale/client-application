import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeometryPolygonConfiguration, MapModule, StructureModule } from '@gouvfr-anct/mediation-numerique';
import { UiLieuxMediationNumeriqueModule } from '@gouvfr-anct/mediation-numerique/ui';
import { CartographieLayout } from '../presentation/layouts';
import { LieuxMediationNumeriqueDetailsPage, LieuxMediationNumeriqueListPage } from '../presentation/pages';
import { InitialPosition, MarkerType, ZoomLevel } from '../configuration/mediation-numerique';
import { GeojsonService, SearchService, StructureService } from '../services';
import metropole from '../services/assets/metropole.json';
import { CartographieFeatureRoutingModule } from './cartographie.feature-routing.module';

@NgModule({
  declarations: [CartographieLayout, LieuxMediationNumeriqueListPage, LieuxMediationNumeriqueDetailsPage],
  imports: [
    HttpClientModule,
    MapModule.forRoot(metropole as GeometryPolygonConfiguration, ZoomLevel, InitialPosition, MarkerType, GeojsonService),
    StructureModule.forRoot(SearchService, StructureService),
    CartographieFeatureRoutingModule,
    CommonModule,
    UiLieuxMediationNumeriqueModule
  ],
  providers: [GeojsonService]
})
export class CartographieFeatureModule {}
