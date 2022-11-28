import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonneesPersonnellesLayout } from '../pages';

const ROUTES: Routes = [
  {
    component: DonneesPersonnellesLayout,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class DonneesPersonnellesFeatureRoutingModule {}
