import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegionsListComponent } from './regions-list.component';

describe('RegionsListComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [RegionsListComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('RegionsListComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<RegionsListComponent> = TestBed.createComponent(RegionsListComponent);
    const regionsListComponent: RegionsListComponent = fixture.componentInstance;
    expect(regionsListComponent).toBeTruthy();
  });
});
