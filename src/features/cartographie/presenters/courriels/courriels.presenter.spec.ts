import { toCourrielsWithCC } from './courriels.presenter';

describe('courriels', () => {
  it('should not get any courriel when courriels is empty', () => {
    const courriels: string[] = [];

    const ccCouriels = toCourrielsWithCC(courriels);

    expect(ccCouriels).toBeNull();
  });

  it('should get single main courriel', () => {
    const courriels: string[] = ['contact@laquincaillerie.tl'];

    const ccCouriels = toCourrielsWithCC(courriels);

    expect(ccCouriels).toBe('contact@laquincaillerie.tl');
  });

  it('should get main courriel with cc courriel', () => {
    const courriels: string[] = ['contact@laquincaillerie.tl', 'responsable@laquincaillerie.tl'];

    const ccCouriels = toCourrielsWithCC(courriels);

    expect(ccCouriels).toBe('contact@laquincaillerie.tl?cc=responsable@laquincaillerie.tl');
  });

  it('should get main courriel with multiple cc courriel', () => {
    const courriels: string[] = ['contact@laquincaillerie.tl', 'responsable@laquincaillerie.tl', 'hello@laquincaillerie.tl'];

    const ccCouriels = toCourrielsWithCC(courriels);

    expect(ccCouriels).toBe('contact@laquincaillerie.tl?cc=responsable@laquincaillerie.tl,hello@laquincaillerie.tl');
  });
});
