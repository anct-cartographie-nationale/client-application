import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePage } from './date.page';

describe('DatePage', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DatePage]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('DatePage');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<DatePage> = TestBed.createComponent(DatePage);
    const datePage: DatePage = fixture.componentInstance;
    expect(datePage).toBeTruthy();
  });
});
