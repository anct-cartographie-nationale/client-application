import { DisponibilitePage } from './disponibilite/disponibilite.page';
import { DemarrerPage } from './demarrer/demarrer.page';
import { LocalisationPage } from './localisation/localisation.page';
import { BesoinPage } from './besoin/besoin.page';
import { AccessibilitePage } from './accessibilite/accessibilite.page';

export * from './accessibilite/accessibilite.page';
export * from './besoin/besoin.page';
export * from './demarrer/demarrer.page';
export * from './disponibilite/disponibilite.page';
export * from './localisation/localisation.page';

export const pages = [BesoinPage, DisponibilitePage, DemarrerPage, LocalisationPage, AccessibilitePage];
