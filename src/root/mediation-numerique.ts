import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MediationNumeriqueWebComponentModule } from './modules/web-components';

platformBrowserDynamic()
  .bootstrapModule(MediationNumeriqueWebComponentModule)
  .catch((err) => console.error(err));
