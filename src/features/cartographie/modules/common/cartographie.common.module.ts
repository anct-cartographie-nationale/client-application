import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MapService, NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { PhonePipeModule, DistancePipeModule } from '../../../core/pipes';
import { AdresseModule, UserLocationModule } from '../../../adresse';
import { pages } from '../../pages';
import { CartographieLayout, ListHeaderLayout } from '../../layouts';
import { components } from '../../components';

@NgModule({
  declarations: [CartographieLayout, ListHeaderLayout, ...pages, ...components],
  exports: [CartographieLayout, ...pages, ...components],
  providers: [MapService],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMapLibreGLModule,
    AdresseModule,
    PhonePipeModule,
    DistancePipeModule,
    UserLocationModule
  ]
})
export class CartographieCommonModule {}
