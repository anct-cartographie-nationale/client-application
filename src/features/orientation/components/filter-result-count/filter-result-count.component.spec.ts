import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BRAND_TOKEN } from '../../../../root';
import { FilterResultCountComponent } from './filter-result-count.component';

describe('FilterResultCountComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [FilterResultCountComponent],
      providers: [
        {
          provide: BRAND_TOKEN,
          useValue: {
            illustration: 'grand-ouest'
          }
        }
      ]
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
