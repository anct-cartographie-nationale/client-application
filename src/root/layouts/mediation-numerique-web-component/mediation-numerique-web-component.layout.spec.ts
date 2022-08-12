import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MediationNumeriqueWebComponentLayout } from './mediation-numerique-web-component.layout';

describe('MediationNumeriqueWebComponentLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [MediationNumeriqueWebComponentLayout],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('MediationNumeriqueWebComponentLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<MediationNumeriqueWebComponentLayout> = TestBed.createComponent(
      MediationNumeriqueWebComponentLayout
    );
    const mediationNumeriqueWebComponentLayout: MediationNumeriqueWebComponentLayout = fixture.componentInstance;
    expect(mediationNumeriqueWebComponentLayout).toBeTruthy();
  });
});
