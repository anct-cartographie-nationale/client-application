import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessibiliteLayout } from '../pages';

const ROUTES: Routes = [
  {
    component: AccessibiliteLayout,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class AccessibiliteFeatureRoutingModule {}
