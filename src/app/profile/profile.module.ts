import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormComponent } from '../form/form.component';

@NgModule({
  imports: [CommonModule, BrowserModule, SharedModule],
  declarations: [ProfileComponent, FormComponent],
  exports: [ProfileComponent, FormComponent],
})
export class ProfileModule {}
