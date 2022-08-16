import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../../environments/environment';
import { CartographieWebComponentModule } from './modules';

environment.production && enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(CartographieWebComponentModule)
  .catch((err) => console.error(err));
