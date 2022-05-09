import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeometryPolygonConfiguration, MapModule, StructureModule } from '@gouvfr-anct/mediation-numerique';
import { ButtonModule, SvgIconModule, TooltipModule } from '@gouvfr-anct/mediation-numerique/shared';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartoComponent } from './carto/carto.component';
import { HeaderComponent } from './header/header.component';
import { CustomHttpInterceptor } from './config/http-interceptor';
import { DeactivateGuard } from './guards/deactivate.guard';
import { RouterListenerService } from './services/routerListener.service';
import { environment } from '../environments/environment';
import { StructureResolver } from './resolvers/structure.resolver';
import metropole from '../assets/geojson/metropole.json';
import { GeojsonService } from './services/geojson.service';
import { MarkerType, ZoomLevel } from './config';
import { StructureService } from './services/structure.service';

import { SearchService } from './services/search.service';

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
    MapModule.forRoot(metropole as GeometryPolygonConfiguration, ZoomLevel, MarkerType, GeojsonService),
    StructureModule.forRoot(SearchService, StructureService)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    DeactivateGuard,
    StructureResolver,
    RouterListenerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
