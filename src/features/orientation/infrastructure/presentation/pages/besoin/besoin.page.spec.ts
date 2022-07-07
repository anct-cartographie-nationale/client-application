import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BesoinPage } from './besoin.page';
import { CollapseStubComponent } from '../../test-doubles';
import { LieuxMediationNumeriqueListPresenter } from '../../../../../cartographie/domain';
import { OrientationLayout } from '../../layouts';
import { FormGroup } from '@angular/forms';

describe('BesoinPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [BesoinPage, CollapseStubComponent],
      providers: [
        {
          provide: LieuxMediationNumeriqueListPresenter,
          useValue: {
            lieuxMediationNumeriqueByDistance$: () => {}
          }
        },
        {
          provide: OrientationLayout,
          useValue: {
            filterForm: new FormGroup({})
          }
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('BesoinPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<BesoinPage> = TestBed.createComponent(BesoinPage);
    const besoinPage: BesoinPage = fixture.componentInstance;
    expect(besoinPage).toBeTruthy();
  });
});
