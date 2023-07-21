import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConditionAcces, LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  FilterFormPresentation,
  LieuMediationNumeriquePresentation,
  OpeningHours,
  toFilterFormPresentationFromQuery
} from '../../../core/presenters';
import { labelNationauxFrom } from './affiner-recherche-form.presenter';

type AffinerRechercheFields = {
  prise_rdv: FormControl<boolean>;
  accessibilite: FormControl<boolean>;
  horaires_ouverture: FormControl<OpeningHours[] | false>;
  conditions_acces: FormControl<ConditionAcces[]>;
  labels_nationaux: FormControl<LabelNational[]>;
};

type AffinerRechercheValues = {
  prise_rdv: boolean;
  accessibilite: boolean;
  horaires_ouverture: OpeningHours[] | false;
  conditions_acces: ConditionAcces[];
  labels_nationaux: LabelNational[];
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
    labels_nationaux: new FormControl<AffinerRechercheValues['labels_nationaux']>(filterFormPresentation.labels_nationaux ?? [])
  });

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-affiner-recherche-form',
  templateUrl: './affiner-recherche-form.component.html'
})
export class AffinerRechercheFormComponent {
  @Input() public lieuxMediationNumeriques: LieuMediationNumeriquePresentation[] = [];

  public constructor(public route: ActivatedRoute, public readonly router: Router) {}

  public affinerRechercheForm: FormGroup<AffinerRechercheFields> = AFFINER_RECHERCHE_FORM(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  public labelNationauxFrom(lieuxMediationNumeriques: LieuMediationNumeriquePresentation[]): LabelNational[] {
    return labelNationauxFrom(lieuxMediationNumeriques);
  }

  public setFilterToQueryString(field: string): void {
    this.router.navigate([], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        [field]: this.affinerRechercheForm.get(field)?.value,
        ...(field === 'horaires_ouverture' && this.affinerRechercheForm.get(field)?.value
          ? { horaires_ouverture: JSON.stringify([{ day: 'now' }]) }
          : {})
      }
    });
  }
}
