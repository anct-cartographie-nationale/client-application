import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartographieLayout } from '../presentation/layouts';
import { LieuxMediationNumeriqueDetailsPage, LieuxMediationNumeriqueListPage } from '../presentation/pages';

const ROUTES: Routes = [
  {
    children: [
      {
        component: LieuxMediationNumeriqueDetailsPage,
        path: ':id/details'
      },
      {
        component: LieuxMediationNumeriqueListPage,
        path: ':id'
      },
      {
        component: LieuxMediationNumeriqueListPage,
        path: ''
      }
    ],
    component: CartographieLayout,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class CartographieFeatureRoutingModule {}
