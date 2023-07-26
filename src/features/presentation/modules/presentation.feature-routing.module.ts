import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationPage } from '../pages';

const ROUTES: Routes = [
  {
    component: PresentationPage,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class PresentationFeatureRoutingModule {}
