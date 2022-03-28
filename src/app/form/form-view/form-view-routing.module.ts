import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { AccountFormComponent } from './account-form/account-form.component';
import { FormViewComponent } from './form-view.component';
import { PersonalOfferGuard } from './guards/personalOffer.guard';
import { PersonalOfferFormComponent } from './personal-offer-form/personal-offer-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { StructureFormComponent } from './structure-form/structure-form.component';

const routes: Routes = [
  {
    path: '',
    component: FormViewComponent,
    children: [
      {
        path: 'structure',
        canActivate: [AuthGuard],
        component: StructureFormComponent,
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileFormComponent,
      },
      {
        path: 'personaloffer',
        canActivate: [AuthGuard, PersonalOfferGuard],
        component: PersonalOfferFormComponent,
      },
      {
        path: 'account',
        component: AccountFormComponent,
      },
      {
        path: '**',
        redirectTo: 'account',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormViewRoutingModule {}
