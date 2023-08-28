import { ModuleWithProviders, NgModule } from '@angular/core';
import { SkipLinkComponent } from './skip-link.component';
import { SkipLinkPresenter } from './skip-link.presenter';

@NgModule({
  declarations: [SkipLinkComponent],
  exports: [SkipLinkComponent]
})
export class SkipLinkModule {
  static forRoot(): ModuleWithProviders<SkipLinkModule> {
    return {
      ngModule: SkipLinkModule,
      providers: [SkipLinkPresenter]
    };
  }
}
