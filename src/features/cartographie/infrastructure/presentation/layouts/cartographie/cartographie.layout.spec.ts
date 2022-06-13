import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartographieLayout } from './cartographie.layout';
import {
  CardStubComponent,
  MapStubComponent,
  StructureListStubComponent,
  StructureListSearchStubComponent,
  StructureDetailsStubComponent
} from '@gouvfr-anct/mediation-numerique/testing';
import { of } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../../../domain';

describe('CartographieLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [
        CartographieLayout,
        CardStubComponent,
        MapStubComponent,
        StructureListStubComponent,
        StructureListSearchStubComponent,
        StructureDetailsStubComponent
      ],
      imports: [RouterTestingModule],
      providers: [
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
        throw new Error('CartographieLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<CartographieLayout> = TestBed.createComponent(CartographieLayout);
    const cartographieLayout: CartographieLayout = fixture.componentInstance;
    expect(cartographieLayout).toBeTruthy();
  });
});
