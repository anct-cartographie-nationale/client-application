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

  public getUpdateLink(source: SourcePresentation | undefined): string | null {
    if (source?.update_link) return source.update_link;
    else if (!source?.update_link && source?.label !== 'France Services')
      return 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F';
    else return null;
  }
}
