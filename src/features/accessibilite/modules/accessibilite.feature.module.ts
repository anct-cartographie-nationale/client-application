import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipLinkModule } from '../../core';
import { AccessibilitePage } from '../pages';
import { AccessibiliteFeatureRoutingModule } from './accessibilite.feature-routing.module';

@NgModule({
  declarations: [AccessibilitePage],
  imports: [AccessibiliteFeatureRoutingModule, CommonModule, SkipLinkModule]
})
export class AccessibiliteFeatureModule {}
