import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeometryPolygonConfiguration, MapModule, StructureModule } from '@gouvfr-anct/mediation-numerique';
import { ButtonModule, SvgIconModule, TooltipModule } from '@gouvfr-anct/mediation-numerique/shared';
import { ToastrModule } from 'ngx-toastr';

import metropole from '../../assets/geojson/metropole.json';
import { environment } from '../../environments/environment';
import { AppComponent } from '../components/app/app.component';
import { CartoComponent } from '../components/carto/carto.component';
import { HeaderComponent } from '../components/header/header.component';
import { InitialPosition, MarkerType, ZoomLevel } from '../config';
import { GeojsonService } from '../services/geojson.service';
import { SearchService } from '../services/search.service';
import { StructureService } from '../services/structure.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CartoComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ButtonModule,
    SvgIconModule,
    TooltipModule,
    MapModule.forRoot(metropole as GeometryPolygonConfiguration, ZoomLevel, InitialPosition, MarkerType, GeojsonService),
    StructureModule.forRoot(SearchService, StructureService)
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
