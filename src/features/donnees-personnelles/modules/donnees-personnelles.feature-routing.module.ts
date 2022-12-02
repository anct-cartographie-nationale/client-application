import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonneesPersonnellesPage } from '../pages';

const ROUTES: Routes = [
  {
    component: DonneesPersonnellesPage,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class DonneesPersonnellesFeatureRoutingModule {}
