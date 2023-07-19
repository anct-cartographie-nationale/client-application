import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

type AffinerRechercheFields = {
  priseRdv: FormControl<boolean>;
  accessibilite: FormControl<boolean>;
  ouvertActuellement: FormControl<boolean>;
  gratuit: FormControl<boolean>;
  aidantsConnect: FormControl<boolean>;
  conseillerNumerique: FormControl<boolean>;
  franceServices: FormControl<boolean>;
};

type AffinerRechercheValues = {
  priseRdv: boolean;
  accessibilite: boolean;
  ouvertActuellement: boolean;
  gratuit: boolean;
  aidantsConnect: boolean;
  conseillerNumerique: boolean;
  franceServices: boolean;
};

const AFFINER_RECHERCHE_FORM: FormGroup<Record<keyof AffinerRechercheValues, FormControl>> = new FormGroup<
  Record<keyof AffinerRechercheValues, FormControl>
>({
  priseRdv: new FormControl<AffinerRechercheValues['priseRdv']>(false),
  accessibilite: new FormControl<AffinerRechercheValues['accessibilite']>(false),
  ouvertActuellement: new FormControl<AffinerRechercheValues['ouvertActuellement']>(false),
  gratuit: new FormControl<AffinerRechercheValues['gratuit']>(false),
  aidantsConnect: new FormControl<AffinerRechercheValues['aidantsConnect']>(false),
  conseillerNumerique: new FormControl<AffinerRechercheValues['conseillerNumerique']>(false),
  franceServices: new FormControl<AffinerRechercheValues['franceServices']>(false)
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-affiner-recherche-form',
  templateUrl: './affiner-recherche-form.component.html'
})
export class AffinerRechercheFormComponent {
  public affinerRechercheForm: FormGroup<AffinerRechercheFields> = AFFINER_RECHERCHE_FORM;
}
