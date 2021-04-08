import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PanelComponent } from './admin/components/panel/panel.component';
import { FormComponent } from './form/form.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { DeactivateGuard } from './guards/deactivate.guard';
import { CartoComponent } from './carto/carto.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TempUserResolver } from './resolvers/temp-user.resolver';
import { StructureJoinComponent } from './structure-join/structure-join.component';
import { StructureDetailsComponent } from './structure-list/components/structure-details/structure-details.component';
import { StructureListComponent } from './structure-list/structure-list.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { NewsletterSubscriptionComponent } from './newsletter-subscription/newsletter-subscription.component';

const routes: Routes = [
  { path: 'print', outlet: 'print', children: [{ path: 'structure', component: StructureDetailsComponent }] },
  {
    path: 'acteurs',
    component: CartoComponent,
  },
  {
    path: 'login',
    component: CartoComponent,
  },
  {
    path: 'structures',
    component: StructureListComponent,
  },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'users/verify/:id',
    component: UserVerificationComponent,
  },
  {
    path: 'register',
    component: FormComponent,
    canDeactivate: [DeactivateGuard],
    resolve: {
      user: TempUserResolver,
    },
  },
  {
    path: 'change-email/:id',
    component: ResetEmailComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'join',
    canActivate: [AuthGuard],
    component: StructureJoinComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: PanelComponent,
  },
  {
    path: 'create-structure',
    component: FormComponent,
    canDeactivate: [DeactivateGuard],
  },
  {
    path: 'newsletter',
    component: NewsletterSubscriptionComponent,
  },

  {
    path: 'newsletter-unsubscribe',
    component: NewsletterSubscriptionComponent,
  },

  {
    path: 'news',
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'home',
    redirectTo: 'news',
  },
  {
    path: '**',
    redirectTo: 'news',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
