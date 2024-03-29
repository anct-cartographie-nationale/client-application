import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FEATURES_TOKEN } from '../../../../root';
import { CartographieWebComponentLayout } from './cartographie-web-component.layout';

describe('CartographieWebComponentLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [CartographieWebComponentLayout],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: FEATURES_TOKEN,
          useValue: new Map()
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('CartographieWebComponentLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<CartographieWebComponentLayout> = TestBed.createComponent(CartographieWebComponentLayout);
    const cartographieWebComponentLayout: CartographieWebComponentLayout = fixture.componentInstance;
    expect(cartographieWebComponentLayout).toBeTruthy();
  });
});
