import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { ApplicationModule, MediationNumeriqueWebComponentModule } from './root';
import { CartographieWebComponentModule } from './features/cartographie';
import { OrientationWebComponentModule } from './features/orientation';

environment.production && enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(ApplicationModule)
  .catch((err) => console.error(err));

platformBrowserDynamic()
  .bootstrapModule(MediationNumeriqueWebComponentModule)
  .catch((err) => console.error(err));

platformBrowserDynamic()
  .bootstrapModule(CartographieWebComponentModule)
  .catch((err) => console.error(err));

platformBrowserDynamic()
  .bootstrapModule(OrientationWebComponentModule)
  .catch((err) => console.error(err));
