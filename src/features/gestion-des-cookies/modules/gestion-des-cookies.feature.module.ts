import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDesCookiesFeatureRoutingModule } from './gestion-des-cookies.feature-routing.module';
import { GestionDesCookiesLayout } from '../pages';

@NgModule({
  declarations: [GestionDesCookiesLayout],
  imports: [GestionDesCookiesFeatureRoutingModule, CommonModule]
})
export class GestionDesCookiesFeatureModule {}
