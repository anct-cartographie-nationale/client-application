import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomBreakPointsProvider } from './config/custom-breakpoint';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { MapModule } from './map/map.module';
import { RechercheComponent } from './structure-list/components/recherche/recherche.component';
import { StructureListComponent } from './structure-list/structure-list.component';
import { CardComponent } from './structure-list/components/card/card.component';
import { StructureDetailsComponent } from './structure-list/components/structure-details/structure-details.component';
import { StructureOpeningStatusComponent } from './structure-list/components/structure-opening-status/structure-opening-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StructureListComponent,
    CardComponent,
    RechercheComponent,
    StructureDetailsComponent,
    StructureOpeningStatusComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FlexLayoutModule, SharedModule, MapModule],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }, CustomBreakPointsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
