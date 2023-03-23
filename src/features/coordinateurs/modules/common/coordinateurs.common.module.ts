import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapService, NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { COMPONENTS } from '../../components';
import { LAYOUTS } from '../../layouts';
import { PAGES } from '../../pages';

@NgModule({
  declarations: [...LAYOUTS, ...PAGES, ...COMPONENTS],
  exports: [...LAYOUTS, ...PAGES],
  providers: [MapService],
  imports: [CommonModule, HttpClientModule, RouterModule, NgxMapLibreGLModule]
})
export class CoordinateursCommonModule {}
