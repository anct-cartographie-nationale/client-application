import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLocationComponent } from '../components';
import { AdresseModule } from './adresse.module';

@NgModule({
  declarations: [UserLocationComponent],
  exports: [UserLocationComponent],
  imports: [CommonModule, AdresseModule]
})
export class UserLocationModule {}
