import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MapService, NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { CheckboxArrayModule } from '../../../core/directives';
import { CollapseModule } from '../../../core/components';
import { DistancePipeModule, PhonePipeModule } from '../../../core/pipes';
import { UserLocationModule } from '../../../adresse';
import { COMPONENTS } from '../../components';
import { LAYOUTS } from '../../layouts';
import { PAGES } from '../../pages';
import { coordinateursProviders } from './coordinateurs.providers';

@NgModule({
  declarations: [...LAYOUTS, ...PAGES, ...COMPONENTS],
  exports: [...LAYOUTS, ...PAGES],
  providers: [MapService, ...coordinateursProviders],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMapLibreGLModule,
    PhonePipeModule,
    UserLocationModule,
    CheckboxArrayModule,
    CollapseModule,
    DistancePipeModule
  ]
})
export class CoordinateursCommonModule {}
