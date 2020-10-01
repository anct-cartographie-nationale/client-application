import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomBreakPointsProvider } from './config/custom-breakpoint';
import { StructureListComponent } from './structure-list/structure-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, StructureListComponent],
  imports: [BrowserModule, AppRoutingModule, FlexLayoutModule],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }, CustomBreakPointsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
