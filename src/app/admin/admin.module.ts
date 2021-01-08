import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { ValidationAttachmentComponent } from './validation-attachment/validation-attachment.component';



@NgModule({
  declarations: [PanelComponent, ValidationAttachmentComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
