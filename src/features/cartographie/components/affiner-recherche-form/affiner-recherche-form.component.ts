import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConditionAcces, LabelNational, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  FilterFormPresentation,
  LieuMediationNumeriquePresentation,
  OpeningHours,
  toFilterFormPresentationFromQuery
} from '../../../core/presenters';
import { labelNationauxFrom, strategiesTerritorialesFrom } from './affiner-recherche-form.presenter';
import { MatomoTracker } from 'ngx-matomo';

type AffinerRechercheFields = {
  prise_rdv: FormControl<boolean>;
  accessibilite: FormControl<boolean>;
  horaires_ouverture: FormControl<OpeningHours[] | false>;
  conditions_acces: FormControl<ConditionAcces[]>;
  labels_nationaux: FormControl<LabelNational[]>;
  labels_autres: FormControl<string[]>;
  service: FormControl<Service | undefined>;
};

type AffinerRechercheValues = {
  prise_rdv: boolean;
  accessibilite: boolean;
  horaires_ouverture: OpeningHours[] | false;
  conditions_acces: ConditionAcces[];
  labels_nationaux: LabelNational[];
  labels_autres: string[];
  service: Service | undefined;
};

const AFFINER_RECHERCHE_FORM = (
  filterFormPresentation: FilterFormPresentation
): FormGroup<Record<keyof AffinerRechercheValues, FormControl>> =>
  new FormGroup<Record<keyof AffinerRechercheValues, FormControl>>({
    prise_rdv: new FormControl<AffinerRechercheValues['prise_rdv']>(filterFormPresentation.prise_rdv ?? false),
    accessibilite: new FormControl<AffinerRechercheValues['accessibilite']>(filterFormPresentation.accessibilite ?? false),
    horaires_ouverture: new FormControl<AffinerRechercheValues['horaires_ouverture']>(
      filterFormPresentation.horaires_ouverture ?? false
    ),
    conditions_acces: new FormControl<AffinerRechercheValues['conditions_acces']>(
      filterFormPresentation.conditions_acces ?? []
    ),
    labels_nationaux: new FormControl<AffinerRechercheValues['labels_nationaux']>(
      filterFormPresentation.labels_nationaux ?? []
    ),
    labels_autres: new FormControl<AffinerRechercheValues['labels_autres']>(filterFormPresentation.labels_autres ?? []),
    service: new FormControl<AffinerRechercheValues['service']>(filterFormPresentation.service)
  });

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-affiner-recherche-form',
  templateUrl: './affiner-recherche-form.component.html'
})
export class AffinerRechercheFormComponent {
  @Input() public lieuxMediationNumeriques: LieuMediationNumeriquePresentation[] = [];

  public labelMap: Map<string, string> = new Map<string, string>([
    ['CNFS', 'Conseillers Numériques'],
    ['QPV', 'QPV (quartier prioritaire de la ville)'],
    ['ZRR', 'ZRR (zones de revitalisation rurale)']
  ]);

  public constructor(
    public route: ActivatedRoute,
    public readonly router: Router,
    @Optional() private readonly _matomoTracker?: MatomoTracker
  ) {}

  public affinerRechercheForm: FormGroup<AffinerRechercheFields> = AFFINER_RECHERCHE_FORM(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  public strategiesTerritorialesFrom = strategiesTerritorialesFrom;

  public labelNationauxFrom = labelNationauxFrom;

  public toggleService(field: string): Service | undefined {
    return this.affinerRechercheForm.get(field)?.value ? Service.AccompagnerLesDemarchesDeSante : undefined;
  }

  public setFilterToQueryString(field: string): void {
    this._matomoTracker?.trackEvent('Cartographie', 'Affiner recherche', field);
    this.router.navigate([], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        [field]: field === 'service' ? this.toggleService(field) : this.affinerRechercheForm.get(field)?.value,
        ...(field === 'horaires_ouverture' && this.affinerRechercheForm.get(field)?.value
          ? { horaires_ouverture: JSON.stringify([{ day: 'now' }]) }
          : {})
      }
    });
  }
}
