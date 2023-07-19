import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConditionAcces, LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterFormPresentation, toFilterFormPresentationFromQuery } from '../../../core/presenters';

type AffinerRechercheFields = {
  prise_rdv: FormControl<boolean>;
  accessibilite: FormControl<boolean>;
  ouvert_actuellement: FormControl<boolean>;
  conditions_acces: FormControl<ConditionAcces[]>;
  label_national: FormControl<LabelNational[]>;
};

type AffinerRechercheValues = {
  prise_rdv: boolean;
  accessibilite: boolean;
  ouvert_actuellement: boolean;
  conditions_acces: ConditionAcces[];
  label_national: LabelNational[];
};

const AFFINER_RECHERCHE_FORM = (
  filterFormPresentation: FilterFormPresentation
): FormGroup<Record<keyof AffinerRechercheValues, FormControl>> =>
  new FormGroup<Record<keyof AffinerRechercheValues, FormControl>>({
    prise_rdv: new FormControl<AffinerRechercheValues['prise_rdv']>(filterFormPresentation.prise_rdv ?? false),
    accessibilite: new FormControl<AffinerRechercheValues['accessibilite']>(filterFormPresentation.accessibilite ?? false),
    ouvert_actuellement: new FormControl<AffinerRechercheValues['ouvert_actuellement']>(false),
    conditions_acces: new FormControl<AffinerRechercheValues['conditions_acces']>(
      filterFormPresentation.conditions_acces ?? []
    ),
    label_national: new FormControl<AffinerRechercheValues['label_national']>([])
  });

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-affiner-recherche-form',
  templateUrl: './affiner-recherche-form.component.html'
})
export class AffinerRechercheFormComponent {
  public constructor(public route: ActivatedRoute, public readonly router: Router) {}

  public affinerRechercheForm: FormGroup<AffinerRechercheFields> = AFFINER_RECHERCHE_FORM(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  public setFilterToQueryString(field: string): void {
    this.router.navigate([], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        [field]: this.affinerRechercheForm.get(field)?.value
      }
    });
  }
}
