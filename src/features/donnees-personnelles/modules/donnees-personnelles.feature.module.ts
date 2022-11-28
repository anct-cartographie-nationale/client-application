import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonneesPersonnellesLayout } from '../pages';
import { DonneesPersonnellesFeatureRoutingModule } from './donnees-personnelles.feature-routing.module';

@NgModule({
  declarations: [DonneesPersonnellesLayout],
  imports: [DonneesPersonnellesFeatureRoutingModule, CommonModule]
})
export class DonneesPersonnellesFeatureModule {}
