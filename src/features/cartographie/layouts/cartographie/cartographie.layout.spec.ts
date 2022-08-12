import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { LieuxMediationNumeriqueRepository } from '../../../core';
import { LeafletMapStubComponent } from '../../test-doubles';
import { CartographieLayout } from './cartographie.layout';

describe('CartographieLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [CartographieLayout, LeafletMapStubComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: LieuxMediationNumeriqueRepository,
          useValue: {
            getAll$: () => of([])
          }
        },
        {
          provide: ZOOM_LEVEL_TOKEN,
          useValue: {}
        },
        {
          provide: INITIAL_POSITION_TOKEN,
          useValue: {
            latitude: 44.555545,
            longitude: 6.078166
          }
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('CartographieLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<CartographieLayout> = TestBed.createComponent(CartographieLayout);
    const cartographieLayout: CartographieLayout = fixture.componentInstance;
    expect(cartographieLayout).toBeTruthy();
  });
});
