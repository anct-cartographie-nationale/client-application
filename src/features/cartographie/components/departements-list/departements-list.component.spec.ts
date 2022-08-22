import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DepartementsListComponent } from './departements-list.component';

describe('DepartementsListComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DepartementsListComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('DepartementsListComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<DepartementsListComponent> = TestBed.createComponent(DepartementsListComponent);
    const departementsListComponent: DepartementsListComponent = fixture.componentInstance;
    expect(departementsListComponent).toBeTruthy();
  });
});
