import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrientationWebComponentLayout } from './orientation-web-component.layout';

describe('OrientationWebComponentLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [OrientationWebComponentLayout],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('OrientationWebComponentLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<OrientationWebComponentLayout> = TestBed.createComponent(OrientationWebComponentLayout);
    const orientationWebComponentLayout: OrientationWebComponentLayout = fixture.componentInstance;
    expect(orientationWebComponentLayout).toBeTruthy();
  });
});
