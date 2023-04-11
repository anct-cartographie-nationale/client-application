import { CoordinateurDetailsPresenter } from './coordinateur-details.presenter';
import { ConseillerDetailsPresentation, CoordinateurDetailsPresentation } from './coordinateur-details.presentation';
import { firstValueFrom } from 'rxjs';

describe('coordinateur details presenter', (): void => {
  it('should get coordinateur matching given id', async (): Promise<void> => {
    const coordinateur: CoordinateurDetailsPresentation | undefined = await firstValueFrom(
      new CoordinateurDetailsPresenter().coordinateur$('22b8d7ba-3de9-4c12-8a33-8b0a785d764c')
    );

    expect(coordinateur).toStrictEqual({
      id: '22b8d7ba-3de9-4c12-8a33-8b0a785d764c',
      nom: 'Lucie Petit',
      commune: 'Paris (75011)',
      adresse: '56 Rue Oberkampf, 75011 Paris',
      courriel: 'lucie.petit@depta.fr',
      telephone: '+33678543210',
      perimetre: 'Départemental',
      nombreDePersonnesCoordonnees: 13,
      nombreDeStructuresAvecDesPersonnesCoordonnees: 9,
      dispositif: 'CnFS',
      latitude: 48.86471611,
      longitude: 2.376019843
    });
  });

  it('should get conseillers coordonnés by coordinateur', async (): Promise<void> => {
    const conseillers: ConseillerDetailsPresentation[] = await firstValueFrom(
      new CoordinateurDetailsPresenter().conseillersCoordonnesPar$({
        id: '85d7a78b-26c7-4f62-b0c9-0d019d08e1db',
        nom: 'Lucie Petit',
        commune: 'Rennes',
        adresse: '14 Rue Saint-Louis, 35000 Rennes',
        courriel: 'ines.clamey@depta.fr',
        telephone: '+33698542132',
        perimetre: 'Régional',
        nombreDePersonnesCoordonnees: 13,
        nombreDeStructuresAvecDesPersonnesCoordonnees: 9,
        dispositif: 'CnFS',
        latitude: 48.1134758,
        longitude: -1.6811292
      })
    );

    expect(conseillers).toStrictEqual([
      {
        id: 'ea8a21f92d08c61cbf58b764',
        coordinateurId: '85d7a78b-26c7-4f62-b0c9-0d019d08e1db',
        distance: 1171.8017216531223,
        nom: 'Pierre-Yves Dupont',
        latitude: 48.105127,
        longitude: -1.69076,
        email: 'pierre-yves.dupont@example.com',
        phone: '06 12 34 56 78',
        structurePorteuse: {
          nom: 'Mairie de Pacé',
          adresse: '1 Rue de la Mairie, 35740 Pacé'
        },
        lieuActivitePrincipal: {
          nom: 'Médiathèque de Pacé',
          adresse: 'Rue des Écoles, 35740 Pacé'
        },
        lieuActivite: []
      },
      {
        id: '62ab2c598255a806e299ca57',
        coordinateurId: '85d7a78b-26c7-4f62-b0c9-0d019d08e1db',
        distance: 488.8747716872108,
        nom: 'Mélina Bouchard',
        latitude: 48.117266,
        longitude: -1.677792,
        email: 'melina.bouchard@example.com',
        phone: '06 12 34 56 78',
        structurePorteuse: {
          nom: 'Mairie de Rennes',
          adresse: 'Place de la Mairie, 35000 Rennes'
        },
        lieuActivitePrincipal: {
          nom: 'Bibliothèque municipale',
          adresse: '15 Rue de la Fontaine, 35000 Rennes'
        },
        lieuActivite: [
          {
            nom: 'Café des Sports',
            commune: 'Rennes',
            codePostal: '35000'
          },
          {
            nom: 'Théâtre National de Bretagne',
            commune: 'Rennes',
            codePostal: '35000'
          }
        ]
      }
    ]);
  });

  it('should get distance between coordinateur and farthest conseiller coordonné', async (): Promise<void> => {
    const distance: number = await firstValueFrom(
      new CoordinateurDetailsPresenter().farthestConseillerDistance$({
        id: '85d7a78b-26c7-4f62-b0c9-0d019d08e1db',
        nom: 'Lucie Petit',
        commune: 'Rennes',
        adresse: '14 Rue Saint-Louis, 35000 Rennes',
        courriel: 'ines.clamey@depta.fr',
        telephone: '+33698542132',
        perimetre: 'Régional',
        nombreDePersonnesCoordonnees: 13,
        nombreDeStructuresAvecDesPersonnesCoordonnees: 9,
        dispositif: 'CnFS',
        latitude: 48.1134758,
        longitude: -1.6811292
      })
    );

    expect(distance).toBe(1171.8017216531223);
  });

  it('should get all conseillers in coordinateur perimeter', async (): Promise<void> => {
    const conseillers: ConseillerDetailsPresentation[] = await firstValueFrom(
      new CoordinateurDetailsPresenter().allConseillersInPerimeterOf$({
        id: '85d7a78b-26c7-4f62-b0c9-0d019d08e1db',
        nom: 'Lucie Petit',
        commune: 'Rennes',
        adresse: '14 Rue Saint-Louis, 35000 Rennes',
        courriel: 'ines.clamey@depta.fr',
        telephone: '+33698542132',
        perimetre: 'Régional',
        nombreDePersonnesCoordonnees: 13,
        nombreDeStructuresAvecDesPersonnesCoordonnees: 9,
        dispositif: 'CnFS',
        latitude: 48.1134758,
        longitude: -1.6811292
      })
    );

    expect(conseillers).toStrictEqual([
      {
        id: '51bf06e2f39d0c7db9d19e1f',
        nom: 'Emilie Lefèvre',
        latitude: 48.11038,
        longitude: -1.680245,
        email: 'emilie.lefevre@example.com',
        phone: '06 12 34 56 78',
        distance: 350.4405260445954,
        structurePorteuse: {
          nom: 'Centre Social Carrefour 18',
          adresse: "7 Rue d'Espagne, 35200 Rennes"
        },
        lieuActivitePrincipal: {
          nom: 'Médiathèque de Beauregard',
          adresse: '18 Rue de Brest, 35000 Rennes'
        },
        lieuActivite: [
          {
            nom: 'Maison de Quartier Villejean',
            commune: 'Rennes',
            codePostal: '35000'
          }
        ]
      },
      {
        id: '88928bcb3b3dc50e0c52c09e',
        nom: 'Lucie Martin',
        latitude: 48.105856,
        longitude: -1.680022,
        email: 'lucie.martin@example.com',
        phone: '06 12 34 56 78',
        distance: 851.2615777816636,
        structurePorteuse: {
          nom: 'Maison des Associations',
          adresse: '6 Cours des Alliés, 35000 Rennes'
        },
        lieuActivitePrincipal: {
          nom: 'Médiathèque de Maurepas',
          adresse: 'Rue Jean-Jaurès, 35700 Rennes'
        },
        lieuActivite: [
          {
            nom: 'Espace Social de Maurepas',
            commune: 'Rennes',
            codePostal: '35700'
          }
        ]
      }
    ]);
  });
});
