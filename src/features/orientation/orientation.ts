import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../../environments/environment';
import { OrientationWebComponentModule } from './modules';

environment.production && enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(OrientationWebComponentModule)
  .catch((err) => console.error(err));
