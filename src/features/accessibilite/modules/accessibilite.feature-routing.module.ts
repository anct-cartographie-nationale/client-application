import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessibilitePage } from '../pages';

const ROUTES: Routes = [
  {
    component: AccessibilitePage,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class AccessibiliteFeatureRoutingModule {}
