import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PlatformModule } from '@angular/cdk/platform';
import { MapService, NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { SkipLinkModule } from '@features/core';
import { CollapseModule, ModalModule, OffcanvasModule, TextSeparatorModule } from '@features/core/components';
import { CheckboxArrayModule } from '../../../core/directives';
import { DistancePipeModule, PhonePipeModule } from '../../../core/pipes';
import { AdresseModule, UserLocationModule } from '../../../adresse';
import { components } from '../../components';
import { pages } from '../../pages';
import { CartographieLayout } from '../../layouts';

@NgModule({
  declarations: [CartographieLayout, ...pages, ...components],
  exports: [CartographieLayout, ...pages, ...components],
  providers: [MapService],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    ScrollingModule,
    PlatformModule,
    NgxMapLibreGLModule,
    AdresseModule,
    PhonePipeModule,
    DistancePipeModule,
    UserLocationModule,
    CollapseModule,
    OffcanvasModule,
    CheckboxArrayModule,
    ModalModule,
    SkipLinkModule,
    TextSeparatorModule
  ]
})
export class CartographieCommonModule {}
