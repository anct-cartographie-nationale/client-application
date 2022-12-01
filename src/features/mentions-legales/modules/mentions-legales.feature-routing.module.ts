import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentionsLegalesPage } from '../pages';

const ROUTES: Routes = [
  {
    component: MentionsLegalesPage,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class MentionsLegalesFeatureRoutingModule {}
