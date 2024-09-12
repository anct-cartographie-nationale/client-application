import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  Optional
} from '@angular/core';
import { DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';
import { OrientationSheetForm, SendLieuByEmail } from '../../models';
import { FilterPresentation } from '../../../core/presenters';
import { FormGroup } from '@angular/forms';
import { MatomoTracker } from 'ngx-matomo';
import { environment } from 'projects/client-application/src/environments/environment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-details',
  templateUrl: './lieux-mediation-numerique-details.component.html'
})
export class LieuxMediationNumeriqueDetailsComponent {
  @ViewChild('source') sourceRef!: ElementRef;

  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;

  @Input() public filters?: FilterPresentation;

  @Input() public erreursReportFormGroup!: FormGroup;

  @Output() public print: EventEmitter<OrientationSheetForm> = new EventEmitter<OrientationSheetForm>();

  @Output() public sendEmailTo: EventEmitter<SendLieuByEmail> = new EventEmitter<SendLieuByEmail>();

  @Output() public reportAnError: EventEmitter<void> = new EventEmitter<void>();

  @Output() public closeDetails: EventEmitter<LieuMediationNumeriqueDetailsPresentation> =
    new EventEmitter<LieuMediationNumeriqueDetailsPresentation>();

  @Output() public openOrientationSheetModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() public openImpressionChoiceModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() public openErreurFormModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() public showLabel: EventEmitter<DispositifProgrammeNational> = new EventEmitter<DispositifProgrammeNational>();

  @Output() public showLabelInvokingContext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public constructor(@Optional() private readonly _matomoTracker?: MatomoTracker) {}

  onScrollToSource = (): void => {
    this.sourceRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  };

  public onPrintFromBandeau(): void {
    if (environment.production) {
      this._matomoTracker?.trackEvent('fiche détail', 'bandeau footer', `impression fiche`);
      const sourceLabels = this.lieuMediationNumerique.source?.map((source) => source.label).join(', ');
      this._matomoTracker?.trackEvent('fiche détail', sourceLabels ?? 'Source inconnue', 'bandeau footer - impression fiche');
    }
  }
}
