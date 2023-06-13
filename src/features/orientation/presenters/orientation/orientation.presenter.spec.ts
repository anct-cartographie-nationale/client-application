import { filterNotFoundEmailBody } from './orientation.presenter';

describe('orientation presenter', (): void => {
  it('should get filter not found email body', (): void => {
    const email: string = filterNotFoundEmailBody();

    expect(email).toStrictEqual(
      "Bonjour 👋,%0D%0A%0D%0AJe ne trouve pas mon besoin dans la liste de vos besoins sur le parcours d'orientation de la cartographie nationale.%0D%0AJ'aimerai pouvoir filtrer les lieux selon :%0D%0A%0D%0A%0D%0A%0D%0ANumériquement, à bientôt !"
    );
  });
});
