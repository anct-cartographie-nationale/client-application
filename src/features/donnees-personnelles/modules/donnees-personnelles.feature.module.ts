import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipLinkModule } from '../../core';
import { DonneesPersonnellesPage } from '../pages';
import { DonneesPersonnellesFeatureRoutingModule } from './donnees-personnelles.feature-routing.module';

@NgModule({
  declarations: [DonneesPersonnellesPage],
  imports: [DonneesPersonnellesFeatureRoutingModule, CommonModule, SkipLinkModule]
})
export class DonneesPersonnellesFeatureModule {}
