import { ChangeDetectionStrategy, Component, HostListener, Inject, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatestWith, Observable, of, Subject, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatomoTracker } from 'ngx-matomo';
import { DispositifProgrammeNational, LieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  ASSETS_TOKEN,
  AssetsConfiguration,
  BRAND_TOKEN,
  BrandConfiguration,
  SET_TITLE_ACTION,
  SetTitleAction,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '../../../../root';
import {
  FilterPresentation,
  toDepartement,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation,
  toRegion,
  MarkersPresenter
} from '../../../core/presenters';
import {
  LabelPresentation,
  labelToDisplayMap,
  LieuMediationNumeriqueDetailsPresentation,
  LieuxMediationNumeriqueDetailsPresenter
} from '../../presenters';
import { ErreursReportForm, OrientationSheetForm, SendLieuByEmail } from '../../models';
import { emailMessage, reportErrorEmailMessage } from './lieux-mediation-numerique-details.presentation';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { setZoomUserPosition } from '@features/adresse/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-details.page.html'
})
export class LieuxMediationNumeriqueDetailsPage {
  public lieuMediationNumerique$: Observable<LieuMediationNumeriqueDetailsPresentation> =
    this._lieuxMediationNumeriqueDetailsPresenter
      .lieuMediationNumeriqueFromParams$(
        this._route.paramMap,
        new Date(),
        of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(this._route.snapshot.queryParams)))
      )
      .pipe(
        tap((lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) =>
          this.setTitle([lieuMediationNumerique.nom, 'Fiche du lieu'])
        ),
        tap((lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) => this.select(lieuMediationNumerique))
      );

  private readonly _orientationSheetForm$: Subject<OrientationSheetForm | undefined> = new Subject<
    OrientationSheetForm | undefined
  >();
  public orientationSheetForm$: Observable<OrientationSheetForm | undefined> = this._orientationSheetForm$.asObservable();

  public filters$: Observable<FilterPresentation> = this._route.queryParams.pipe(map(toFilterFormPresentationFromQuery));

  private readonly _hasDepartementFilter: boolean = true;

  public erreursReportFormGroup: FormGroup = new FormGroup<Record<keyof ErreursReportForm, AbstractControl>>({
    selected: new FormControl<ErreursReportForm['selected']>([]),
    precision: new FormControl<ErreursReportForm['precision']>('')
  });

  private _labelToDisplay$: Subject<LabelPresentation> = new Subject<LabelPresentation>();
  public labelToDisplay$: Observable<LabelPresentation> = this._labelToDisplay$.asObservable().pipe(
    combineLatestWith(this._lieuxMediationNumeriqueDetailsPresenter.getAll$),
    map(([label, lieux]: [LabelPresentation, LieuMediationNumerique[]]) => ({
      ...label,
      lieuxCount: lieux.filter((lieu: LieuMediationNumerique) => lieu.dispositif_programmes_nationaux?.includes(label.ref))
        .length
    }))
  );

  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    @Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration,
    private readonly _lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter,
    private readonly _markersPresenter: MarkersPresenter,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction,
    @Optional() private readonly _matomoTracker?: MatomoTracker
  ) {
    this._hasDepartementFilter =
      this._router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString().includes('/regions/') ?? true;
  }

  @HostListener('window:keydown.control.p', ['$event']) onCtrlP(event: KeyboardEvent): void {
    event.preventDefault();
    this.onPrint();
  }

  public onPrint(orientationSheetValues?: OrientationSheetForm): void {
    this._matomoTracker?.trackEvent(
      "parcours d'orientation",
      'fin',
      `impression fiche ${orientationSheetValues ? "d'orientation" : 'lieu'}`
    );
    this._orientationSheetForm$.next(orientationSheetValues);
    setTimeout(() => {
      window.print();
      this._orientationSheetForm$.next(void 0);
    });
  }

  public onSendEmailTo(sendLieuByEmail: SendLieuByEmail): void {
    this._matomoTracker?.trackEvent("parcours d'orientation", 'fin', 'envoi par email');
    document.location.href = `mailto:${sendLieuByEmail.email}?subject=[Médiation numérique] Fiche lieu - ${
      sendLieuByEmail.lieu.nom
    }&body=${emailMessage(sendLieuByEmail.lieu, location.href)}`;
  }

  public onReportAnError(lieu: LieuMediationNumeriqueDetailsPresentation): void {
    const mailTo: string = `cartographie.sonum@anct.gouv.fr`;
    const carbonCopy: string = lieu.contact?.courriels?.[0] ?? '';
    this._matomoTracker?.trackEvent(
      "rapport d'erreurs",
      lieu.nom,
      `${this.erreursReportFormGroup.controls['selected'].value.join(', ')} - ${
        this.erreursReportFormGroup.controls['precision'].value ?? 'Pas de précision'
      } `
    );
    document.location.href = `mailto:${mailTo}?cc=${carbonCopy}&subject=Erreur sur la fiche du lieu : ${
      lieu.nom
    }&body=${reportErrorEmailMessage(
      location.href,
      this.erreursReportFormGroup.controls['selected'].value,
      this.erreursReportFormGroup.controls['precision'].value
    )}`;
  }

  public onCloseDetails(lieu: LieuMediationNumeriqueDetailsPresentation): void {
    this._router.navigate(
      [this._hasDepartementFilter ? `../../regions/${toRegion(lieu)?.nom}/${toDepartement(lieu)?.nom}/${lieu.id}` : '..'],
      {
        relativeTo: this._route,
        queryParamsHandling: 'preserve'
      }
    );
    if (lieu.localisation && !this._hasDepartementFilter)
      this._markersPresenter.center(
        lieu.localisation,
        setZoomUserPosition(this._zoomLevel.userPosition, parseInt(this._route.snapshot.queryParams['distance']))
      );
  }

  public onShowLabel(dispositifProgrammeNational: DispositifProgrammeNational) {
    const labelPresentation: LabelPresentation | undefined = labelToDisplayMap.get(dispositifProgrammeNational);
    labelPresentation && this._labelToDisplay$.next(labelPresentation);
  }

  private select(lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation): void {
    lieuMediationNumerique.localisation && this._markersPresenter.center(lieuMediationNumerique.localisation);
    this._markersPresenter.select(lieuMediationNumerique.id);
  }

  public onCloseNoLieuFound(): void {
    this._router.navigate(['../../regions'], {
      relativeTo: this._route,
      queryParamsHandling: 'preserve'
    });
  }
}
