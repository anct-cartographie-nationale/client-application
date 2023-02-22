import { Contact, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';

const formatServices = (services: Service[]): string => `${services.join('%0D%0A- ')}`;

const formatTelephoneIfAny = (telephone?: string): string => (telephone ? `%0D%0A${telephone}` : '');

const formatCourrielIfAny = (telephone?: string): string => (telephone ? `%0D%0AC${telephone}` : '');

const formatContactIfAny = (contact?: Contact): string =>
  contact ? `${formatTelephoneIfAny(contact.telephone)}${formatCourrielIfAny(contact.courriel)}%0D%0A` : '';

export const emailMessage = (lieu: LieuMediationNumeriqueDetailsPresentation, detailsLink: string): string =>
  `Bonjour 👋,

Voici les informations du lieu qui saura vous accueillir et vous proposer un accompagnement au numérique :

${lieu.nom}

${lieu.adresse}
${formatContactIfAny(lieu.contact)}
Services disponibles :
- ${formatServices(lieu.services)}

Retrouvez toutes les informations de ce lieu sur le site web de la cartographie : ${detailsLink}

Numériquement, à bientôt !`.replace(/\n/gu, '%0D%0A');

export const reportErrorEmailMessage = (detailsLink: string): string =>
  `Bonjour 👋,

En naviguant sur cette fiche structure ${detailsLink}, j'ai repéré cette erreur :



Numériquement, à bientôt !`.replace(/\n/gu, '%0D%0A');
