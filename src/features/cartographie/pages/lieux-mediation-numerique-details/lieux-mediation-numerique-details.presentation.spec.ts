import { Contact, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';
import { emailMessage, reportErrorEmailMessage } from './lieux-mediation-numerique-details.presentation';
import { AvailableErreur } from '../../models';

describe('lieux mediation numerique details presentation', (): void => {
  it('should get message with only required text', (): void => {
    const lieu: LieuMediationNumeriqueDetailsPresentation = {
      adresse: '78 rue Lauriston 75016 Paris',
      code_postal: '51100',
      commune: 'reims',
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
      'Bonjour 👋,%0D%0A%0D%0AVoici les informations du lieu qui saura vous accueillir et vous proposer un accompagnement au numérique :%0D%0A%0D%0AClub Lauriston%0D%0A%0D%0A78 rue Lauriston 75016 Paris%0D%0A%0D%0AServices disponibles :%0D%0A- Prendre en main un smartphone ou une tablette%0D%0A- Prendre en main un ordinateur%0D%0A- Utiliser le numérique au quotidien%0D%0A- Approfondir ma culture numérique%0D%0A%0D%0ARetrouvez toutes les informations de ce lieu sur le site web de la cartographie : https://cartographie.societenumerique.gouv.fr/cartographie/6303493719ed1006e01aa243/details%0D%0A%0D%0ANumériquement, à bientôt !'
    );
  });

  it('should get message with complete text', (): void => {
    const lieu: LieuMediationNumeriqueDetailsPresentation = {
      id: '638622e80830e306f21ecc64',
      nom: 'Cité des métiers / Universcience',
      adresse: 'AV FRANKLIN D ROOSEVELT 75008 Paris 8',
      code_postal: '51100',
      commune: 'reims',
      services: [
        Service.PrendreEnMainUnSmartphoneOuUneTablette,
        Service.PrendreEnMainUnOrdinateur,
        Service.UtiliserLeNumerique,
        Service.ApprofondirMaCultureNumerique
      ],
      contact: Contact({
        telephone: '+33 1 85 53 99 74',
        courriel: 'infocontact@universcience.fr'
      })
    };

    const message: string = emailMessage(
      lieu,
      'https://cartographie.societenumerique.gouv.fr/cartographie/638622e80830e306f21ecc64/details'
    );

    expect(message).toBe(
      'Bonjour 👋,%0D%0A%0D%0AVoici les informations du lieu qui saura vous accueillir et vous proposer un accompagnement au numérique :%0D%0A%0D%0ACité des métiers / Universcience%0D%0A%0D%0AAV FRANKLIN D ROOSEVELT 75008 Paris 8%0D%0A%0D%0A+33 1 85 53 99 74%0D%0ACinfocontact@universcience.fr%0D%0A%0D%0AServices disponibles :%0D%0A- Prendre en main un smartphone ou une tablette%0D%0A- Prendre en main un ordinateur%0D%0A- Utiliser le numérique au quotidien%0D%0A- Approfondir ma culture numérique%0D%0A%0D%0ARetrouvez toutes les informations de ce lieu sur le site web de la cartographie : https://cartographie.societenumerique.gouv.fr/cartographie/638622e80830e306f21ecc64/details%0D%0A%0D%0ANumériquement, à bientôt !'
    );
  });

  it('should get error report message', (): void => {
    const erreursReportSelected: AvailableErreur[] = [AvailableErreur.contacts, AvailableErreur.horaires];
    const erreursPrecision: string = 'Erreur dans les contacts et les horaires';
    const message: string = reportErrorEmailMessage(
      'https://cartographie.societenumerique.gouv.fr/cartographie/638622e80830e306f21ecc64/details',
      erreursReportSelected,
      erreursPrecision
    );

    expect(message).toBe(
      'Bonjour 👋,%0D%0A  %0D%0AEn naviguant sur la cartographie nationale, j\'ai repéré une erreur sur votre fiche https://cartographie.societenumerique.gouv.fr/cartographie/638622e80830e306f21ecc64/details, concernant la section Contacts, la section Horaires : %0D%0A%0D%0AErreur dans les contacts et les horaires%0D%0A%0D%0APour mettre à jour ces informations, suivez les instructions en bas de fiche "mettre à jour la fiche".%0D%0A%0D%0AMerci pour votre collaboration et à bientôt !%0D%0A%0D%0ANumériquement.'
    );
  });
});
