import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Url } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from 'projects/client-application/src/root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-accessibilite',
  templateUrl: './accessibilite.component.html'
})
export class AccessibiliteComponent {
  @Input() public accessibilite?: Url;

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}
}
