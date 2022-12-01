import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonneesPersonnellesFeatureRoutingModule } from './donnees-personnelles.feature-routing.module';
import { DonneesPersonnellesPage } from '../pages';

@NgModule({
  declarations: [DonneesPersonnellesPage],
  imports: [DonneesPersonnellesFeatureRoutingModule, CommonModule]
})
export class DonneesPersonnellesFeatureModule {}
