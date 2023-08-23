import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';
import { OrientationSheetForm, SendLieuByEmail } from '../../models';
import { FilterPresentation } from '../../../core/presenters';

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
  @Output() public reportAnError: EventEmitter<void> = new EventEmitter<void>();
  @Output() public closeDetails: EventEmitter<LieuMediationNumeriqueDetailsPresentation> =
    new EventEmitter<LieuMediationNumeriqueDetailsPresentation>();
  @Output() public showLabel: EventEmitter<LabelNational> = new EventEmitter<LabelNational>();
  @Output() public showLabelInvokingContext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public lieuIsFranceServices(): boolean {
    return this.lieuMediationNumerique.labels_nationaux?.includes(LabelNational.FranceServices) ?? false;
  }
}
