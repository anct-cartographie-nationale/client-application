import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

@Component({
  selector: 'app-lieu-card',
  templateUrl: './lieu-card.component.html'
})
export class LieuCardComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumerique;
  @Input() public isOrientation: boolean = false;
  @Output() public showDetails: EventEmitter<LieuMediationNumerique> = new EventEmitter<LieuMediationNumerique>();
  @Output() public hover: EventEmitter<LieuMediationNumerique> = new EventEmitter<LieuMediationNumerique>();
  @Output() public mailContact: EventEmitter<LieuMediationNumerique> = new EventEmitter<LieuMediationNumerique>();
}
