import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { SourcePresentation } from '@features/cartographie/presenters';
import { ASSETS_TOKEN, AssetsConfiguration } from 'projects/client-application/src/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-source-footer',
  templateUrl: './source-footer.component.html'
})
export class SourceFooterComponent {
  @Input() public sources: SourcePresentation[] | undefined;

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}

  public getFirstUpdateLink(sources: SourcePresentation[] | undefined): string {
    return (
      sources?.find((source) => source.update_link)?.update_link ||
      'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F'
    );
  }
}
