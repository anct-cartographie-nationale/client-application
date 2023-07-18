import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-modifier-orientation',
  templateUrl: './modifier-orientation.component.html'
})
export class ModifierOrientationComponent {
  public constructor(
    public readonly route: ActivatedRoute,
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration
  ) {}

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}
