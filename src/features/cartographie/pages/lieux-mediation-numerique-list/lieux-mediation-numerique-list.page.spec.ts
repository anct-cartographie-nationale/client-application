import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LieuxMediationNumeriqueListPage } from './lieux-mediation-numerique-list.page';
import { ZOOM_LEVEL_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { FEATURES_TOKEN } from '../../../../root';
import { LieuxMediationNumeriquePresenter } from '../../../core';
import { MarkersPresenter } from '../../presenters';
import { CartographieLayout } from '../../layouts';
import { of } from 'rxjs';

describe('LieuxMediationNumeriqueListPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuxMediationNumeriqueListPage],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: FEATURES_TOKEN,
          useValue: new Map()
        },
        {
          provide: ZOOM_LEVEL_TOKEN,
          useValue: {}
        },
        {
          provide: LieuxMediationNumeriquePresenter,
          useValue: {
            lieuxMediationNumeriqueByDistance$: () => of([]),
            lieuxMediationNumeriqueByDepartement$: () => of([]),
            lieuxMediationNumeriqueByRegion$: () => of([])
          }
        },
        {
          provide: MarkersPresenter,
          useValue: {}
        },
        {
          provide: CartographieLayout,
          useValue: {}
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuxMediationNumeriqueListPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuxMediationNumeriqueListPage> = TestBed.createComponent(LieuxMediationNumeriqueListPage);
    const lieuxMediationNumeriqueListPage: LieuxMediationNumeriqueListPage = fixture.componentInstance;
    expect(lieuxMediationNumeriqueListPage).toBeTruthy();
  });
});
