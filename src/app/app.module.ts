import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeometryPolygonConfiguration, MapModule } from '@gouvfr-anct/mediation-numerique';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartoComponent } from './carto/carto.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { StructureListComponent } from './structure-list/structure-list.component';
import { CardComponent } from './structure-list/components/card/card.component';
import { StructureListSearchComponent } from './structure-list/components/structure-list-search/structure-list-search.component';
import { StructureDetailsComponent } from './structure-list/components/structure-details/structure-details.component';
import { ModalFilterComponent } from './structure-list/components/modal-filter/modal-filter.component';
import { CustomHttpInterceptor } from './config/http-interceptor';
import { DeactivateGuard } from './guards/deactivate.guard';
import { RouterListenerService } from './services/routerListener.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StructureResolver } from './resolvers/structure.resolver';
import metropole from '../assets/geojson/metropole.json';
import { GeojsonService } from './services/geojson.service';
import { MarkerType, ZoomLevel } from './config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartoComponent,
    StructureListComponent,
    CardComponent,
    StructureListSearchComponent,
    ModalFilterComponent,
    StructureDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    MapModule.forRoot(metropole as GeometryPolygonConfiguration, ZoomLevel, MarkerType, GeojsonService)
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
