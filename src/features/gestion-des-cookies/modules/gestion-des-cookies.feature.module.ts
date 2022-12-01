import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDesCookiesFeatureRoutingModule } from './gestion-des-cookies.feature-routing.module';
import { GestionDesCookiesPage } from '../pages';

@NgModule({
  declarations: [GestionDesCookiesPage],
  imports: [GestionDesCookiesFeatureRoutingModule, CommonModule]
})
export class GestionDesCookiesFeatureModule {}
