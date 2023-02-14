import { LieuMediationNumeriqueDetailsPresentation, ModaliteAccompagnementPresentation } from '../../presenters';
import { emailMessage } from './lieux-mediation-numerique-details.presentation';
import { Contact, Service, Url } from '@gouvfr-anct/lieux-de-mediation-numerique';

describe('lieux mediation numerique details presentation', (): void => {
  it('should get message with only required text', (): void => {
    const lieu: LieuMediationNumeriqueDetailsPresentation = {
      adresse: '78 rue Lauriston 75016 Paris',
      id: '6303493719ed1006e01aa243',
      nom: 'Club Lauriston',
      services: [
        Service.PrendreEnMainUnSmartphoneOuUneTablette,
        Service.PrendreEnMainUnOrdinateur,
        Service.UtiliserLeNumerique,
        Service.ApprofondirMaCultureNumerique
      ]
    };

    const message: string = emailMessage(
      lieu,
      'https://cartographie.societenumerique.gouv.fr/cartographie/6303493719ed1006e01aa243/details'
    );

    expect(message).toBe(
      `Bonjour 👋,%0D%0A%0D%0AVoici le lieu de médiation numérique qui vous a été partagé à l'issue du parcours d'orientation :%0D%0A%0D%0AClub Lauriston%0D%0A%0D%0A78 rue Lauriston 75016 Paris%0D%0A%0D%0AServices disponibles :%0D%0A- Prendre en main un smartphone ou une tablette%0D%0A- Prendre en main un ordinateur%0D%0A- Utiliser le numérique au quotidien%0D%0A- Approfondir ma culture numérique%0D%0A%0D%0ARetrouvez toutes ces informations sur la cartographie : https://cartographie.societenumerique.gouv.fr/cartographie/6303493719ed1006e01aa243/details%0D%0A%0D%0AÀ bientôt sur la cartographie nationale des lieux de médiation numérique !`
    );
  });

  it('should get message with complete text', (): void => {
    const lieu: LieuMediationNumeriqueDetailsPresentation = {
      id: '638622e80830e306f21ecc64',
      nom: 'Cité des métiers / Universcience',
      adresse: 'AV FRANKLIN D ROOSEVELT 75008 Paris 8',
      services: [
        Service.PrendreEnMainUnSmartphoneOuUneTablette,
        Service.PrendreEnMainUnOrdinateur,
        Service.UtiliserLeNumerique,
        Service.ApprofondirMaCultureNumerique
      ],
      contact: Contact({
        telephone: '+33 1 85 53 99 74',
        courriel: 'infocontact@universcience.fr',
        site_web: [Url('https://www.cite-sciences.fr/fr/accueil')]
      })
    };

    const message: string = emailMessage(
      lieu,
      'https://cartographie.societenumerique.gouv.fr/cartographie/638622e80830e306f21ecc64/details'
    );

    expect(message).toBe(
      "Bonjour 👋,%0D%0A%0D%0AVoici le lieu de médiation numérique qui vous a été partagé à l'issue du parcours d'orientation :%0D%0A%0D%0ACité des métiers / Universcience%0D%0A%0D%0AAV FRANKLIN D ROOSEVELT 75008 Paris 8%0D%0A%0D%0AServices disponibles :%0D%0A- Prendre en main un smartphone ou une tablette%0D%0A- Prendre en main un ordinateur%0D%0A- Utiliser le numérique au quotidien%0D%0A- Approfondir ma culture numérique%0D%0A%0D%0ANuméro de téléphone : +33 1 85 53 99 74%0D%0ACourriel : infocontact@universcience.fr%0D%0ASite internet : https://www.cite-sciences.fr/fr/accueil%0D%0A%0D%0ARetrouvez toutes ces informations sur la cartographie : https://cartographie.societenumerique.gouv.fr/cartographie/638622e80830e306f21ecc64/details%0D%0A%0D%0AÀ bientôt sur la cartographie nationale des lieux de médiation numérique !"
    );
  });
});
