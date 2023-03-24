import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MapService, NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { AdresseModule } from '../../../adresse';
import { pages } from '../../pages';
import { CartographieLayout, ListHeaderLayout } from '../../layouts';
import { components } from '../../components';
import { PIPES } from '../../pipes';
import { PhonePipeModule } from '../../../core';

@NgModule({
  declarations: [CartographieLayout, ListHeaderLayout, ...pages, ...components, ...PIPES],
  exports: [CartographieLayout, ...pages, ...components],
  providers: [MapService],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMapLibreGLModule,
    AdresseModule,
    PhonePipeModule
  ]
})
export class CartographieCommonModule {}
