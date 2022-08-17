import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { ApplicationModule } from './root/modules/application';

environment.production && enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(ApplicationModule)
  .catch((err) => console.error(err));
