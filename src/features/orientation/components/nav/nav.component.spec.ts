import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';

describe('NavComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('NavComponent');
      });
  });

  it('should create component', (): void => {
    const fixture: ComponentFixture<NavComponent> = TestBed.createComponent(NavComponent);
    const component: NavComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
