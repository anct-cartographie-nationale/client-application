import { NgModule } from '@angular/core';
import { CartographieCommonModule } from '../common/cartographie.common.module';
import { CartographieFeatureRoutingModule } from './cartographie.feature-routing.module';

@NgModule({
  imports: [CartographieCommonModule, CartographieFeatureRoutingModule]
})
export class CartographieFeatureModule {}
