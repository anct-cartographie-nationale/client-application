import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoLieuxFoundComponent } from './no-lieux-found.component';

describe('NoLieuxFoundComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [NoLieuxFoundComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('NoLieuxFoundComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<NoLieuxFoundComponent> = TestBed.createComponent(NoLieuxFoundComponent);
    const noLieuxFoundComponent: NoLieuxFoundComponent = fixture.componentInstance;
    expect(noLieuxFoundComponent).toBeTruthy();
  });
});
