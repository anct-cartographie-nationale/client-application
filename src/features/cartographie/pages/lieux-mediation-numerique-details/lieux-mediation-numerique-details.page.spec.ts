import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ZOOM_LEVEL_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { BRAND_TOKEN } from '../../../../root';
import { LieuxMediationNumeriqueRepository } from '../../../core';
import { LieuxMediationNumeriqueDetailsPresenter, MarkersPresenter } from '../../presenters';
import { LieuxMediationNumeriqueDetailsPage } from './lieux-mediation-numerique-details.page';

describe('LieuxMediationNumeriqueDetailsPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuxMediationNumeriqueDetailsPage],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ZOOM_LEVEL_TOKEN,
          useValue: {}
        },
        {
          provide: BRAND_TOKEN,
          useValue: {}
        },
        {
          provide: MarkersPresenter,
          useValue: {}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '6001a38516b08100062e4161' } }
          }
        },
        {
          provide: LieuxMediationNumeriqueRepository,
          useValue: {
            getAll$: () => of([])
          }
        },
        {
          provide: LieuxMediationNumeriqueDetailsPresenter,
          useValue: {
            lieuMediationNumeriqueFromParams$: () => of({})
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
