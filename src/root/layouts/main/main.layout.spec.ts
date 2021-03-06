import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainLayout } from './main.layout';
import { BRAND_TOKEN } from '../../configuration';

describe('MainLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [MainLayout],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: BRAND_TOKEN,
          useValue: {}
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('MainLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<MainLayout> = TestBed.createComponent(MainLayout);
    const mainLayout: MainLayout = fixture.componentInstance;
    expect(mainLayout).toBeTruthy();
  });
});
