import { Contact, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';

const formatServices = (services: Service[]): string => `${services.join('%0D%0A- ')}`;

const formatTelephoneIfAny = (telephone?: string): string => (telephone ? `%0D%0ANuméro de téléphone : ${telephone}` : '');

const formatCourrielIfAny = (telephone?: string): string => (telephone ? `%0D%0ACourriel : ${telephone}` : '');

const formatSiteWebIfAny = (site_web?: string): string => (site_web ? `%0D%0ASite internet : ${site_web}` : '');

const formatContactIfAny = (contact?: Contact): string =>
  contact
    ? `${formatTelephoneIfAny(contact.telephone)}${formatCourrielIfAny(contact.courriel)}${formatSiteWebIfAny(
        contact.site_web?.[0]
      )}%0D%0A`
    : '';

export const emailMessage = (lieu: LieuMediationNumeriqueDetailsPresentation, detailsLink: string): string =>
  `Bonjour 👋,

Voici le lieu de médiation numérique qui vous a été partagé à l'issue du parcours d'orientation :

${lieu.nom}

${lieu.adresse}

Services disponibles :
- ${formatServices(lieu.services)}
${formatContactIfAny(lieu.contact)}
Retrouvez toutes ces informations sur la cartographie : ${detailsLink}

À bientôt sur la cartographie nationale des lieux de médiation numérique !`.replace(/\n/gu, '%0D%0A');
