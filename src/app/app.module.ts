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
import { StructureListComponent } from './structure-list/structure-list.component';
import { CardComponent } from './structure-list/components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './structure-list/components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StructureListComponent,
    CardComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    SharedModule,
    MapModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }, CustomBreakPointsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
