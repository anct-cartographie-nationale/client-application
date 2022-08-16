import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { ApplicationModule } from './root/modules/application';
import { MediationNumeriqueWebComponentModule } from './root/modules/web-components';

environment.production && enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(ApplicationModule)
  .catch((err) => console.error(err));

platformBrowserDynamic()
  .bootstrapModule(MediationNumeriqueWebComponentModule)
  .catch((err) => console.error(err));
