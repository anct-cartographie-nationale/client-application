import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedFiltersComponent } from './selected-filters.component';

describe('SelectedFiltersComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [SelectedFiltersComponent]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('SelectedFiltersComponent');
      });
  });

  it('should create component', (): void => {
    const fixture: ComponentFixture<SelectedFiltersComponent> = TestBed.createComponent(SelectedFiltersComponent);
    const component: SelectedFiltersComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
