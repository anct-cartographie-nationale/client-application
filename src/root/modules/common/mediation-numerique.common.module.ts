import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cartographieProviders } from '../../../features/cartographie/modules/common';
import { orientationProviders } from '../../../features/orientation/modules/common';
import { OffcanvasModule } from '../../../features/core/components';
import { ConteneurComponent } from '../../components';
import { mediationNumeriqueProviders } from './mediation-numerique.providers';

@NgModule({
  declarations: [ConteneurComponent],
  imports: [BrowserAnimationsModule, HttpClientModule, RouterModule, OffcanvasModule],
  exports: [ConteneurComponent, BrowserAnimationsModule],
  providers: [...cartographieProviders, ...orientationProviders, ...mediationNumeriqueProviders]
})
export class MediationNumeriqueCommonModule {}
