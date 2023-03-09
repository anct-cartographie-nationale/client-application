import { LabelNational, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LabelPresentation, labelToDisplayMap } from '../../presenters';

describe('label presenter', (): void => {
  it('should get label to display from label national', (): void => {
    const label: LabelNational = LabelNational.CNFS;

    const labelPresentation: LabelPresentation | undefined = labelToDisplayMap.get(label);

    expect(labelPresentation).toStrictEqual<LabelPresentation>({
      ref: LabelNational.CNFS,
      nom: 'Conseiller numérique France Services',
      description:
        'Un Conseiller numérique France Services a pour mission d’accompagner les Français dans leur appropriation des usages numériques quotidiens',
      url: 'https://www.conseiller-numerique.gouv.fr/',
      carracteristiques: [
        Service.RealiserDesDemarchesAdministratives,
        Service.AccompagnerLesDemarchesDeSante,
        Service.FavoriserMonInsertionProfessionnelle,
        Service.DevenirAutonomeDansLesDemarchesAdministratives,
        Service.PrendreEnMainUnOrdinateur,
        Service.SoutenirLaParentalite,
        Service.UtiliserLeNumerique
      ]
    });
  });
});
