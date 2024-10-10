import { MatomoTracker } from 'ngx-matomo';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  Optional,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';
import { OrientationSheetForm, SendLieuByEmail } from '../../models';
import { FilterPresentation } from '../../../core/presenters';
import { environment } from 'projects/client-application/src/environments/environment';

const authorizationToken = (token?: string) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-details',
  templateUrl: './lieux-mediation-numerique-details.component.html'
})
export class LieuxMediationNumeriqueDetailsComponent implements OnInit {
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

  public constructor(private readonly _http: HttpClient, @Optional() private readonly _matomoTracker?: MatomoTracker) {}

  public ngOnInit(): void {
    this.lieuMediationNumerique.source?.forEach((source) => {
      if (source.origin == null) return;
      this._http.get(source.origin.api, authorizationToken(source.origin.token)).subscribe();
    });
  }

  onScrollToSource = (): void => {
    this.sourceRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  };

  public onPrintFromBandeau(): void {
    if (!environment.production) return;
    this._matomoTracker?.trackEvent('fiche détail', 'bandeau footer', `impression fiche`);
    const sourceLabels = this.lieuMediationNumerique.source?.map((source) => source.label).join(', ');
    this._matomoTracker?.trackEvent('fiche détail', sourceLabels ?? 'Source inconnue', 'bandeau footer - impression fiche');
  }
}
