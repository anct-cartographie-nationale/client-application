import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavLinkComponent } from './nav-link.component';

describe('NavLinkComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [NavLinkComponent]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('NavLinkComponent');
      });
  });

  it('should create component', (): void => {
    const fixture: ComponentFixture<NavLinkComponent> = TestBed.createComponent(NavLinkComponent);
    const component: NavLinkComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
