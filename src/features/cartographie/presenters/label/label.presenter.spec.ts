import { DispositifProgrammeNational, ModaliteAccompagnement, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LabelPresentation, labelToDisplayMap } from '../../presenters';

describe('label presenter', (): void => {
  it('should get label to display from label national', (): void => {
    const dispositifProgrammeNational: DispositifProgrammeNational = DispositifProgrammeNational.ConseillersNumeriques;

    const labelPresentation: LabelPresentation | undefined = labelToDisplayMap.get(dispositifProgrammeNational);

    expect(labelPresentation).toStrictEqual<LabelPresentation>({
      ref: DispositifProgrammeNational.ConseillersNumeriques,
      nom: DispositifProgrammeNational.ConseillersNumeriques,
      description:
        'Un Conseiller numérique a pour mission d’accompagner les Français dans leur appropriation des usages numériques quotidiens',
      url: 'https://www.conseiller-numerique.gouv.fr/',
      carracteristiques: [
        Service.AideAuxDemarchesAdministratives,
        Service.InsertionProfessionnelleViaLeNumerique,
        Service.MaitriseDesOutilsNumeriquesDuQuotidien,
        Service.ParentaliteEtEducationAvecLeNumerique,
        Service.ComprehensionDuMondeNumerique,
        Service.UtilisationSecuriseeDuNumerique,
        ModaliteAccompagnement.AccompagnementIndividuel
      ]
    });
  });
});
