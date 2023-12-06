import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { SourcePresentation } from '@features/cartographie/presenters';
import { ASSETS_TOKEN, AssetsConfiguration } from 'projects/client-application/src/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-source-footer',
  templateUrl: './source-footer.component.html'
})
export class SourceFooterComponent {
  @Input() public date: Date | undefined;
  @Input() public sources: SourcePresentation[] | undefined;

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}
}
