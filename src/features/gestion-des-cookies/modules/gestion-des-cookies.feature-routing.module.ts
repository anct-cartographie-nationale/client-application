import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDesCookiesLayout } from '../pages';

const ROUTES: Routes = [
  {
    component: GestionDesCookiesLayout,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class GestionDesCookiesFeatureRoutingModule {}
