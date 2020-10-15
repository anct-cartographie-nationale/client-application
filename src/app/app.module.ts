import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomBreakPointsProvider } from './config/custom-breakpoint';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { StructureListModule } from './structure-list/structure-list.module';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, FlexLayoutModule, SharedModule, StructureListModule, MapModule],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }, CustomBreakPointsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
