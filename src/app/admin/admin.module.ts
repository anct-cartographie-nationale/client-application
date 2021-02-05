import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { ClaimStructureComponent } from './components/claim-structure/claim-structure.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PanelComponent, ClaimStructureComponent],
  imports: [CommonModule, SharedModule],
})
export class AdminModule {}
