import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { ClaimStructureComponent } from './components/claim-structure/claim-structure.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { SharedModule } from '../shared/shared.module';
import { NewsletterUsersComponent } from './components/newsletter-users/newsletter-users.component';
import { AdminStructuresListComponent } from './components/structures-list/admin-structures-list.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [PanelComponent, ClaimStructureComponent, DeleteUserComponent, NewsletterUsersComponent, AdminStructuresListComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
