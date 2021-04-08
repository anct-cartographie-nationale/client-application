import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { ClaimStructureComponent } from './components/claim-structure/claim-structure.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { SharedModule } from '../shared/shared.module';
import { NewsComponent } from '../post/news.component';
import { NewsletterUsersComponent } from './components/newsletter-users/newsletter-users.component';

@NgModule({
  declarations: [PanelComponent, ClaimStructureComponent, DeleteUserComponent, NewsletterUsersComponent],
  imports: [CommonModule, SharedModule],
})
export class AdminModule {}
