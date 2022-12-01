import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilitePage } from '../pages';
import { AccessibiliteFeatureRoutingModule } from './accessibilite.feature-routing.module';

@NgModule({
  declarations: [AccessibilitePage],
  imports: [AccessibiliteFeatureRoutingModule, CommonModule]
})
export class AccessibiliteFeatureModule {}
