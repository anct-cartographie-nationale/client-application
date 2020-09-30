import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StructureListComponent } from './structure-list/structure-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'projects',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: HomeComponent,
  },
  {
    path: 'sturctures',
    component: StructureListComponent,
  },
  {
    path: 'resources',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
