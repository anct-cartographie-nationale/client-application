import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDesCookiesPage } from '../pages';

const ROUTES: Routes = [
  {
    component: GestionDesCookiesPage,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class GestionDesCookiesFeatureRoutingModule {}
