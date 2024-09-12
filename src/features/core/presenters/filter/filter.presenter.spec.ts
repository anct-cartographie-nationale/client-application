import {
  Frais,
  ModaliteAccompagnement,
  PriseEnChargeSpecifique,
  PublicSpecifiquementAdresse,
  Service
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterFormPresentation, hasActiveFilter } from './filter.presenter';

describe('démarrer page prensenter', (): void => {
  it('should indicates that there is no active filter', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      services: [],
      address: undefined,
      latitude: undefined,
      longitude: undefined,
      distance: undefined,
      fiche_acces_libre: undefined,
      frais_a_charge: [],
      publics_specifiquement_adresses: [],
      prise_en_charge_specifique: [],
      modalites_accompagnement: [],
      horaires_ouverture: undefined
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(false);
  });

  it('should indicates that there is an active filter when service is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      services: [Service.MaitriseDesOutilsNumeriquesDuQuotidien]
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when address is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      address: '77 avenue de Ségur 75015, Paris'
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when latitude is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      latitude: 45.7689958
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when longitude is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      longitude: 4.71258736
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when distance is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      distance: 949849
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when accessibilite is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      fiche_acces_libre: false
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when frais_a_charge is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      frais_a_charge: [Frais.GratuitSousCondition]
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when publics_specifiquement_adresses is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      publics_specifiquement_adresses: [PublicSpecifiquementAdresse.Seniors]
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when prise_en_charge_specifique is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      prise_en_charge_specifique: [PriseEnChargeSpecifique.Surdite]
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when modalites_accompagnement is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      modalites_accompagnement: [ModaliteAccompagnement.AccompagnementIndividuel]
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when horaires_ouverture is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      horaires_ouverture: [
        {
          day: 'now'
        }
      ]
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });
});
