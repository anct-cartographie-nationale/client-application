import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeatureConfiguration } from '../../../../root';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

@Component({
  selector: 'app-lieux-mediation-numerique-list',
  template: ''
})
export class LieuxMediationNumeriqueListStubComponent {
  @Input() public lieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [];

  @Input() public orientationFeature?: FeatureConfiguration;

  @Input() public focusId: string = '';

  @Output() public print: EventEmitter<void> = new EventEmitter<void>();

  @Output() public selectLieu: EventEmitter<LieuMediationNumeriquePresentation> =
    new EventEmitter<LieuMediationNumeriquePresentation>();
}
