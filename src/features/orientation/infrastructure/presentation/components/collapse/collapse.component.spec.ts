import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CollapseComponent } from './collapse.component';

describe('CollapseComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [CollapseComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('CollapseComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<CollapseComponent> = TestBed.createComponent(CollapseComponent);
    const collapseComponent: CollapseComponent = fixture.componentInstance;
    expect(collapseComponent).toBeTruthy();
  });
});
