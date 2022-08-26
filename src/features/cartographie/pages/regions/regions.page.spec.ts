import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LieuxMediationNumeriquePresenter } from '../../../core';
import { MarkersPresenter } from '../../presenters';
import { RegionsListStubComponent } from '../../test-doubles';
import { RegionsPage } from './regions.page';

describe('RegionsPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [RegionsPage, RegionsListStubComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: LieuxMediationNumeriquePresenter,
          useValue: {
            lieuxMediationNumeriqueByRegion$: () => of([])
          }
        },
        {
          provide: MarkersPresenter,
          useValue: {}
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('RegionsPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<RegionsPage> = TestBed.createComponent(RegionsPage);
    const regionsPage: RegionsPage = fixture.componentInstance;
    expect(regionsPage).toBeTruthy();
  });
});
