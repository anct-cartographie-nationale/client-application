import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MapComponents } from './components';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  imports: [CommonModule, SharedModule, LeafletModule],
  declarations: [MapComponents],
  providers: [DatePipe],
  exports: [MapComponents],
})
export class MapModule {}
