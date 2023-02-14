import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';
import { OrientationSheetForm, SendLieuByEmail } from '../../models';
import { FilterPresentation } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-details',
  templateUrl: './lieux-mediation-numerique-details.component.html'
})
export class LieuxMediationNumeriqueDetailsComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;
  @Input() public filters?: FilterPresentation;

  @Output() public print: EventEmitter<OrientationSheetForm> = new EventEmitter<OrientationSheetForm>();
  @Output() public sendEmailTo: EventEmitter<SendLieuByEmail> = new EventEmitter<SendLieuByEmail>();
}
