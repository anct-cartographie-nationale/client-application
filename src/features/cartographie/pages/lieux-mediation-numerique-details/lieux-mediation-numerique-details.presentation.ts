import { Contact, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';
import { AvailableErreur } from '../../models';

const formatServicesIfAny = (services?: Service[]): string => `${services ? services.join('%0D%0A- ') : 'Services inconnus'}`;

const formatTelephoneIfAny = (telephone?: string): string => (telephone ? `%0D%0A${telephone}` : '');

const formatCourrielIfAny = (courriel?: string): string => (courriel ? `%0D%0AC${courriel}` : '');

const formatContactIfAny = (contact?: Contact): string =>
  contact ? `${formatTelephoneIfAny(contact.telephone)}${formatCourrielIfAny(contact.courriels?.[0])}%0D%0A` : '';

export const emailMessage = (lieu: LieuMediationNumeriqueDetailsPresentation, detailsLink: string): string =>
  `Bonjour 👋,

Voici les informations du lieu qui saura vous accueillir et vous proposer un accompagnement au numérique :

${lieu.nom}

${lieu.adresse}
${formatContactIfAny(lieu.contact)}
Services disponibles :
- ${formatServicesIfAny(lieu.services)}

Retrouvez toutes les informations de ce lieu sur le site web de la cartographie : ${detailsLink}

Numériquement, à bientôt !`.replace(/\n/gu, '%0D%0A');

const messageNotExistError = (detailsLink: string, erreursPrecision?: string) =>
  `Bonjour 👋,

En naviguant sur la cartographie nationale, j'ai repéré la fiche ${detailsLink}, qui n'existe plus.

${erreursPrecision ?? ''}

Pour mettre à jour ces informations, suivez les instructions en bas de fiche "mettre à jour la fiche".

Merci pour votre collaboration et à bientôt !

Numériquement.`;

const messageWithSectionsErrors = (detailsLink: string, erreursSelected: string[], erreursPrecision?: string) =>
  `Bonjour 👋,

En naviguant sur la cartographie nationale, j'ai repéré une erreur sur votre fiche ${detailsLink}, concernant ${erreursSelected
    .map((erreur) => `la section ${erreur}`)
    .join(', ')} :

${erreursPrecision ?? ''}

Pour mettre à jour ces informations, suivez les instructions en bas de fiche "mettre à jour la fiche".

Merci pour votre collaboration et à bientôt !

Numériquement.`;

export const reportErrorEmailMessage = (detailsLink: string, erreursSelected: string[], erreursPrecision?: string): string =>
  erreursSelected.includes(AvailableErreur.lieuNExistePlus)
    ? messageNotExistError(detailsLink, erreursPrecision).replace(/\n/gu, '%0D%0A')
    : messageWithSectionsErrors(detailsLink, erreursSelected, erreursPrecision).replace(/\n/gu, '%0D%0A');
