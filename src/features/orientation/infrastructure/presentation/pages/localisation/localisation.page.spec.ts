import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalisationPage } from './localisation.page';

describe('LocalisationPage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LocalisationPage]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LocalisationPage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LocalisationPage> = TestBed.createComponent(LocalisationPage);
    const localisationPage: LocalisationPage = fixture.componentInstance;
    expect(localisationPage).toBeTruthy();
  });
});
