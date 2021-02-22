import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModalOptionsComponent } from './modal-options/modal-options.component';

@NgModule({
  imports: [CommonModule, BrowserModule, SharedModule],
  declarations: [ProfileComponent, ModalOptionsComponent],
  exports: [ProfileComponent],
})
export class ProfileModule {}
