import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LieuxMediationNumeriqueListPage } from './lieux-mediation-numerique-list.page';
import { GeolocationPresenter, MarkersPresenter } from '../../layouts/cartographie';

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
