import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkersPresenter } from '../../../core/presenters';
import { ListHeaderLayout } from './list-header.layout';

describe('ListHeaderLayout', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ListHeaderLayout],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: MarkersPresenter,
          useValue: {}
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('ListHeaderLayout');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<ListHeaderLayout> = TestBed.createComponent(ListHeaderLayout);
    const listHeaderLayout: ListHeaderLayout = fixture.componentInstance;
    expect(listHeaderLayout).toBeTruthy();
  });
});
