import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisponibilitePage } from './disponibilite.page';

describe('DisponibilitePage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DisponibilitePage]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('DisponibilitePage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<DisponibilitePage> = TestBed.createComponent(DisponibilitePage);
    const disponibilitePage: DisponibilitePage = fixture.componentInstance;
    expect(disponibilitePage).toBeTruthy();
  });
});
