import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipLinkModule } from '../../core';
import { GestionDesCookiesPage } from '../pages';
import { GestionDesCookiesFeatureRoutingModule } from './gestion-des-cookies.feature-routing.module';

@NgModule({
  declarations: [GestionDesCookiesPage],
  imports: [GestionDesCookiesFeatureRoutingModule, CommonModule, SkipLinkModule]
})
export class GestionDesCookiesFeatureModule {}
