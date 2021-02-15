import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

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
import { SearchComponent } from './structure-list/components/search/search.component';
import { StructureDetailsComponent } from './structure-list/components/structure-details/structure-details.component';
import { StructureOpeningStatusComponent } from './structure-list/components/structure-opening-status/structure-opening-status.component';
import { ModalFilterComponent } from './structure-list/components/modal-filter/modal-filter.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { AboutComponent } from './about/about.component';
import { FormComponent } from './form/form.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomHttpInterceptor } from './config/http-interceptor';
import { ProfileModule } from './profile/profile.module';
import { ResetEmailComponent } from './reset-email/reset-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminModule } from './admin/admin.module';
import { AdminGuard } from './guards/admin.guard';
import { DeactivateGuard } from './guards/deactivate.guard';
import { FooterFormComponent } from './form/footer-form/footer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StructureListComponent,
    CardComponent,
    SearchComponent,
    ModalFilterComponent,
    StructureDetailsComponent,
    StructureOpeningStatusComponent,
    LegalNoticeComponent,
    AboutComponent,
    UserVerificationComponent,
    ResetEmailComponent,
    ResetPasswordComponent,
    FormComponent,
    FooterFormComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule, MapModule, ProfileModule, AdminModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    CustomBreakPointsProvider,
    AuthGuard,
    AdminGuard,
    DeactivateGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
