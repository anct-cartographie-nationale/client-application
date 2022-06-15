import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecificitePage } from './specificite.page';

describe('SpecificitePage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [SpecificitePage]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('SpecificitePage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<SpecificitePage> = TestBed.createComponent(SpecificitePage);
    const specificitePage: SpecificitePage = fixture.componentInstance;
    expect(specificitePage).toBeTruthy();
  });
});
