import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LieuxMediationNumeriqueDetailsPrintComponent } from './lieux-mediation-numerique-details-print.component';
import {
  HorairesStubComponent,
  InformationsGeneralesStubComponent,
  InformationsPratiquesStubComponent,
  ModalitesAccompagnementStubComponent,
  PhoneStubPipe,
  PublicPrisEnChargeStubComponent,
  ServicesStubComponent
} from '../../test-doubles';

describe('LieuxMediationNumeriqueDetailsPrintComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [
        LieuxMediationNumeriqueDetailsPrintComponent,
        PhoneStubPipe,
        HorairesStubComponent,
        ServicesStubComponent,
        ModalitesAccompagnementStubComponent,
        PublicPrisEnChargeStubComponent
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuxMediationNumeriqueDetailsPrintComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuxMediationNumeriqueDetailsPrintComponent> = TestBed.createComponent(
      LieuxMediationNumeriqueDetailsPrintComponent
    );
    const lieuxMediationNumeriqueDetailsPrintComponent: LieuxMediationNumeriqueDetailsPrintComponent =
      fixture.componentInstance;
    expect(lieuxMediationNumeriqueDetailsPrintComponent).toBeTruthy();
  });
});
