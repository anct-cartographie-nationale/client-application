import { FilterFormPresentation } from '../../../core/presenters';
import { hasActiveFilter } from './demarrer.page.presenter';
import { ConditionAcces, ModaliteAccompagnement, PublicAccueilli, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';

describe('démarrer page prensenter', (): void => {
  it('should indicates that there is no active filter', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      service: undefined,
      address: undefined,
      latitude: undefined,
      longitude: undefined,
      distance: undefined,
      accessibilite: undefined,
      conditions_acces: [],
      publics_accueillis: [],
      modalites_accompagnement: [],
      horaires_ouverture: undefined
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(false);
  });

  it('should indicates that there is an active filter when service is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      service: Service.UtiliserLeNumerique
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
      accessibilite: false
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when conditions_acces is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      conditions_acces: [ConditionAcces.GratuitSousCondition]
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when publics_accueillis is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      publics_accueillis: [PublicAccueilli.Surdite]
    };

    const activeFilter: boolean = hasActiveFilter(filterFormPresentation);

    expect(activeFilter).toBe(true);
  });

  it('should indicates that there is an active filter when modalites_accompagnement is defined', (): void => {
    const filterFormPresentation: FilterFormPresentation = {
      modalites_accompagnement: [ModaliteAccompagnement.AMaPlace]
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
