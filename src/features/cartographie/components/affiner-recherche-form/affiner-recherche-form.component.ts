import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DispositifProgrammeNational, FormationLabel, Frais, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  FilterFormPresentation,
  LieuMediationNumeriquePresentation,
  OpeningHours,
  toFilterFormPresentationFromQuery
} from '../../../core/presenters';
import {
  dispositifProgrammesNationauxFrom,
  formationsLabelsFrom,
  servicesFrom,
  strategiesTerritorialesFrom
} from './affiner-recherche-form.presenter';
import { MatomoTracker } from 'ngx-matomo';

type AffinerRechercheFields = {
  prise_rdv: FormControl<boolean>;
  fiche_acces_libre: FormControl<boolean>;
  horaires_ouverture: FormControl<OpeningHours[] | false>;
  frais_a_charge: FormControl<Frais[]>;
  dispositif_programmes_nationaux: FormControl<DispositifProgrammeNational[]>;
  formations_labels: FormControl<FormationLabel[]>;
  autres_formations_labels: FormControl<string[]>;
  service: FormControl<Service[]>;
};

type AffinerRechercheValues = {
  prise_rdv: boolean;
  fiche_acces_libre: boolean;
  horaires_ouverture: OpeningHours[] | false;
  frais_a_charge: Frais[];
  dispositif_programmes_nationaux: DispositifProgrammeNational[];
  formations_labels: FormationLabel[];
  autres_formations_labels: string[];
  service: Service[];
};

const AFFINER_RECHERCHE_FORM = (
  filterFormPresentation: FilterFormPresentation
): FormGroup<Record<keyof AffinerRechercheValues, FormControl>> =>
  new FormGroup<Record<keyof AffinerRechercheValues, FormControl>>({
    prise_rdv: new FormControl<AffinerRechercheValues['prise_rdv']>(filterFormPresentation.prise_rdv ?? false),
    fiche_acces_libre: new FormControl<AffinerRechercheValues['fiche_acces_libre']>(
      filterFormPresentation.fiche_acces_libre ?? false
    ),
    horaires_ouverture: new FormControl<AffinerRechercheValues['horaires_ouverture']>(
      filterFormPresentation.horaires_ouverture ?? false
    ),
    frais_a_charge: new FormControl<AffinerRechercheValues['frais_a_charge']>(filterFormPresentation.frais_a_charge ?? []),
    dispositif_programmes_nationaux: new FormControl<AffinerRechercheValues['dispositif_programmes_nationaux']>(
      filterFormPresentation.dispositif_programmes_nationaux ?? []
    ),
    formations_labels: new FormControl<AffinerRechercheValues['formations_labels']>(
      filterFormPresentation.formations_labels ?? []
    ),
    autres_formations_labels: new FormControl<AffinerRechercheValues['autres_formations_labels']>(
      filterFormPresentation.autres_formations_labels ?? []
    ),
    service: new FormControl<AffinerRechercheValues['service']>(filterFormPresentation.service ?? [])
  });

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-affiner-recherche-form',
  templateUrl: './affiner-recherche-form.component.html'
})
export class AffinerRechercheFormComponent {
  @Input() public lieuxMediationNumeriques: LieuMediationNumeriquePresentation[] = [];

  public labelMap: Map<string, string> = new Map<string, string>([
    [DispositifProgrammeNational.ConseillersNumeriques, DispositifProgrammeNational.ConseillersNumeriques],
    ['QPV', 'QPV (quartier prioritaire de la ville)'],
    ['ZRR', 'ZRR (zones de revitalisation rurale)'],
    [Service.AideAuxDemarchesAdministratives, 'Démarches administratives'],
    [Service.MaitriseDesOutilsNumeriquesDuQuotidien, 'Outils numériques du quotidien'],
    [Service.InsertionProfessionnelleViaLeNumerique, 'Insertion professionnelle'],
    [Service.ParentaliteEtEducationAvecLeNumerique, 'Parentalité et éducation'],
    [Service.MaterielInformatiqueAPrixSolidaire, 'Acquisition de matériel']
  ]);

  public constructor(
    public route: ActivatedRoute,
    public readonly router: Router,
    @Optional() private readonly _matomoTracker?: MatomoTracker
  ) {}

  public affinerRechercheForm: FormGroup<AffinerRechercheFields> = AFFINER_RECHERCHE_FORM(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  public readonly strategiesTerritorialesFrom = strategiesTerritorialesFrom;

  public readonly dispositifProgrammesNationauxFrom = dispositifProgrammesNationauxFrom;

  public readonly formationsLabelsFrom = formationsLabelsFrom;

  public readonly servicesFrom = servicesFrom;

  public setFilterToQueryString(field: string): void {
    this._matomoTracker?.trackEvent('Cartographie', 'Affiner recherche', field);
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
