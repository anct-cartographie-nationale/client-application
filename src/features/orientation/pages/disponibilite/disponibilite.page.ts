import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import { OpeningHours } from '../../../core';
import { OrientationLayout } from '../../layouts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disponibilite.page.html'
})
export class DisponibilitePage {
  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    public readonly route: ActivatedRoute,
    public readonly orientationLayout: OrientationLayout
  ) {}

  public hasOpeningsHours: boolean = this.orientationLayout.filterForm.controls['horaires_ouverture'].value?.length > 0;

  public onSelectOpeningHours(openingHours: OpeningHours[]): void {
    this.orientationLayout.filterForm.get('horaires_ouverture')?.setValue(openingHours);
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}
