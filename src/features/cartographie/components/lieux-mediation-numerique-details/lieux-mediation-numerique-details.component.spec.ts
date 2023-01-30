import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BoutonsActionStubComponent,
  HorairesStubComponent,
  InformationsGeneralesStubComponent,
  InformationsPratiquesStubComponent,
  PhoneStubPipe,
  ServicesStubComponent
} from '../../test-doubles';
import { LieuxMediationNumeriqueDetailsComponent } from './lieux-mediation-numerique-details.component';

describe('LieuxMediationNumeriqueDetailsComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [
        LieuxMediationNumeriqueDetailsComponent,
        PhoneStubPipe,
        InformationsGeneralesStubComponent,
        InformationsPratiquesStubComponent,
        BoutonsActionStubComponent,
        HorairesStubComponent,
        ServicesStubComponent
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuxMediationNumeriqueDetailsComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuxMediationNumeriqueDetailsComponent> = TestBed.createComponent(
      LieuxMediationNumeriqueDetailsComponent
    );
    const lieuxMediationNumeriqueDetailsComponent: LieuxMediationNumeriqueDetailsComponent = fixture.componentInstance;
    expect(lieuxMediationNumeriqueDetailsComponent).toBeTruthy();
  });
});
