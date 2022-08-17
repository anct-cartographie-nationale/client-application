import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BRAND_TOKEN } from '../../configuration';
import { ConteneurComponent } from './conteneur.component';

describe('ConteneurComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ConteneurComponent],
      providers: [
        {
          provide: BRAND_TOKEN,
          useValue: {}
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('ConteneurComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<ConteneurComponent> = TestBed.createComponent(ConteneurComponent);
    const conteneurComponent: ConteneurComponent = fixture.componentInstance;
    expect(conteneurComponent).toBeTruthy();
  });
});
