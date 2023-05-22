import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LieuxMediationNumeriquePresenter, MarkersPresenter } from '../../../core/presenters';
import { CartographieLayout } from '../../layouts';
import { DepartementsListStubComponent } from '../../test-doubles';
import { DepartementsPage } from './departements.page';
import { FEATURES_TOKEN } from '../../../../root';

describe('DepartementsPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DepartementsPage, DepartementsListStubComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: LieuxMediationNumeriquePresenter,
          useValue: {
            lieuxMediationNumeriqueByDepartement$: () => of([]),
            lieuxMediationNumeriqueByDistance$: () => of([])
          }
        },
        {
          provide: MarkersPresenter,
          useValue: {}
        },
        {
          provide: FEATURES_TOKEN,
          useValue: new Map()
        },
        {
          provide: CartographieLayout,
          useValue: {}
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('DepartementsPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<DepartementsPage> = TestBed.createComponent(DepartementsPage);
    const departementsPage: DepartementsPage = fixture.componentInstance;
    expect(departementsPage).toBeTruthy();
  });
});
