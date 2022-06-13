import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrientationLayout } from '../layouts';

const ROUTES: Routes = [
  {
    children: [],
    component: OrientationLayout,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class OrientationFeatureRoutingModule {}
