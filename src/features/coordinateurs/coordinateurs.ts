import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../../environments/environment';
import { CoordinateursWebComponentModule } from './modules';

environment.production && enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(CoordinateursWebComponentModule)
  .catch((err) => console.error(err));
