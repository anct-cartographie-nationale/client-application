import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterResultCountComponent } from './filter-result-count.component';

describe('FilterResultCountComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [FilterResultCountComponent]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('FilterResultCountComponent');
      });
  });

  it('should create component', (): void => {
    const fixture: ComponentFixture<FilterResultCountComponent> = TestBed.createComponent(FilterResultCountComponent);
    const component: FilterResultCountComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
