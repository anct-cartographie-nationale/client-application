import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { ClaimStructureComponent } from './components/claim-structure/claim-structure.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { SharedModule } from '../shared/shared.module';
import { NewsletterUsersComponent } from './components/newsletter-users/newsletter-users.component';
import { AdminStructuresListComponent } from './components/structures-list/admin-structures-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { DeleteUserComponent } from './components/manage-users/delete-user/delete-user.component';
import { AdministredStructuresComponent } from './components/manage-users/administred-structures/administred-structures.component';

@NgModule({
  declarations: [
    PanelComponent,
    ClaimStructureComponent,
    NewsletterUsersComponent,
    AdminStructuresListComponent,
    ManageUsersComponent,
    DeleteUserComponent,
    AdministredStructuresComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AgGridModule.withComponents([DeleteUserComponent, AdministredStructuresComponent]),
  ],
})
export class AdminModule {}
