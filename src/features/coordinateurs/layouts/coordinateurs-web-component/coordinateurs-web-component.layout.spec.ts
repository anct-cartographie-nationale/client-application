import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoordinateursWebComponentLayout } from './coordinateurs-web-component.layout';

describe('CoordinateursWebComponentLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [CoordinateursWebComponentLayout],
      imports: [RouterTestingModule],
      providers: [
        {
          useValue: new Map()
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('CoordinateursWebComponentLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<CoordinateursWebComponentLayout> = TestBed.createComponent(CoordinateursWebComponentLayout);
    const coordinateursWebComponentLayout: CoordinateursWebComponentLayout = fixture.componentInstance;
    expect(coordinateursWebComponentLayout).toBeTruthy();
  });
});
