import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LieuxMediationNumeriqueDetailsPage } from './lieux-mediation-numerique-details.page';
import { ActivatedRoute } from '@angular/router';

describe('LieuxMediationNumeriqueDetailsPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuxMediationNumeriqueDetailsPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '6001a38516b08100062e4161' } }
          }
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuxMediationNumeriqueDetailsPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuxMediationNumeriqueDetailsPage> = TestBed.createComponent(
      LieuxMediationNumeriqueDetailsPage
    );
    const lieuxMediationNumeriqueDetailsPage: LieuxMediationNumeriqueDetailsPage = fixture.componentInstance;
    expect(lieuxMediationNumeriqueDetailsPage).toBeTruthy();
  });
});
