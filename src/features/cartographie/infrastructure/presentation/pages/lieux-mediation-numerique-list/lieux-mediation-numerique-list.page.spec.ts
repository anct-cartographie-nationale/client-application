import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LieuxMediationNumeriqueListPage } from './lieux-mediation-numerique-list.page';
import { of } from 'rxjs';
import { GeolocationPresenter, LieuxMediationNumeriqueRepository, MarkersPresenter } from '../../../../domain';

describe('LieuxMediationNumeriqueListPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuxMediationNumeriqueListPage],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: MarkersPresenter,
          useValue: {}
        },
        {
          provide: GeolocationPresenter,
          useValue: {}
        },
        {
          provide: LieuxMediationNumeriqueRepository,
          useValue: {
            getAll$: () => of([])
          }
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
