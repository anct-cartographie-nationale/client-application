import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { ValidationAttachmentComponent } from './validation-attachment/validation-attachment.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PanelComponent, ValidationAttachmentComponent],
  imports: [CommonModule, SharedModule],
})
export class AdminModule {}
