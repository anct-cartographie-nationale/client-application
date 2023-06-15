import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { SourcePresentation } from '@features/cartographie/presenters';
import { ASSETS_TOKEN, AssetsConfiguration } from 'projects/client-application/src/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mise-a-jour',
  templateUrl: './mise-a-jour.component.html'
})
export class MiseAJourComponent {
  @Input() public source: SourcePresentation | undefined;

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}
}
