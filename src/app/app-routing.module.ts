import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FormComponent } from './form/structure-form/form.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { DeactivateGuard } from './guards/deactivate.guard';
import { CartoComponent } from './carto/carto.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TempUserResolver } from './resolvers/temp-user.resolver';
import { StructureJoinComponent } from './structure-join/structure-join.component';
import { StructureDetailsComponent } from './structure-list/components/structure-details/structure-details.component';
import { StructureListComponent } from './structure-list/structure-list.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { NewsletterSubscriptionComponent } from './newsletter-subscription/newsletter-subscription.component';
import { OrientationFormComponent } from './form/orientation-form/orientation-form.component';
import { StructureListPrintComponent } from './form/orientation-form/component/structure-list-print/structure-list-print.component';
import { StructureResolver } from './resolvers/structure.resolver';
import { RoleGuard } from './guards/role.guard';
import { RouteRole } from './shared/enum/routeRole.enum';

const routes: Routes = [
  { path: 'print', outlet: 'print', children: [{ path: 'structure', component: StructureDetailsComponent }] },
  { path: 'print', outlet: 'print', children: [{ path: 'structures', component: StructureListPrintComponent }] },
  {
    path: 'orientation',
    component: OrientationFormComponent,
  },
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
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
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
    path: 'create-structure',
    component: FormComponent,
    canDeactivate: [DeactivateGuard],
  },
  {
    path: 'create-structure/:id',
    component: FormComponent,
    canDeactivate: [DeactivateGuard],
    canActivate: [RoleGuard],
    data: { allowedRoles: [RouteRole.structureAdmin] },
    resolve: {
      structure: StructureResolver,
    },
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
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
