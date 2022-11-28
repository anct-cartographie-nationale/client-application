import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibiliteLayout } from '../pages';
import { AccessibiliteFeatureRoutingModule } from './accessibilite.feature-routing.module';

@NgModule({
  declarations: [AccessibiliteLayout],
  imports: [AccessibiliteFeatureRoutingModule, CommonModule]
})
export class AccessibiliteFeatureModule {}
