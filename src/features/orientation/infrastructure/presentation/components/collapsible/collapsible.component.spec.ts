import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CollapsibleComponent } from './collapsible.component';

describe('CollapsibleComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [CollapsibleComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('CollapsibleComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<CollapsibleComponent> = TestBed.createComponent(CollapsibleComponent);
    const collapsibleComponent: CollapsibleComponent = fixture.componentInstance;
    expect(collapsibleComponent).toBeTruthy();
  });
});
