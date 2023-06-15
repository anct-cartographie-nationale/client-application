import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATA_COORDINATEURS_CONFIGURATION, POSITION_CONFIGURATION, ZOOM_LEVEL_CONFIGURATION } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateurs-web-component.layout.html'
})
export class CoordinateursWebComponentLayout implements OnInit {
  @Input() set latitude(latitude: string) {
    POSITION_CONFIGURATION.latitude = parseFloat(latitude);
  }

  @Input() set longitude(longitude: string) {
    POSITION_CONFIGURATION.longitude = parseFloat(longitude);
  }

  @Input() set zoom(zoom: string) {
    ZOOM_LEVEL_CONFIGURATION.regular = parseInt(zoom);
  }

  @Input() set conseillersSource(conseillersSource: string) {
    DATA_COORDINATEURS_CONFIGURATION.conseillers = conseillersSource;
  }

  @Input() set coordinateursSource(coordinateursSource: string) {
    DATA_COORDINATEURS_CONFIGURATION.coordinateurs = coordinateursSource;
  }

  public constructor(private readonly router: Router) {}

  public ngOnInit(): void {
    this.router.initialNavigation();
  }
}
