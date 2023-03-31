import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { By, CoordinateursSortPresentation, DEFAULT_SORT } from '../../presenters';

type Sort = {
  by: FormControl<By | null>;
  direction: FormControl<boolean | null>;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sort',
  templateUrl: './sort.component.html'
})
export class SortComponent {
  @Output() public sortChange: EventEmitter<CoordinateursSortPresentation> = new EventEmitter<CoordinateursSortPresentation>();

  public sortForm: FormGroup<Sort> = new FormGroup<Sort>({
    by: new FormControl<By>(DEFAULT_SORT.by),
    direction: new FormControl<boolean>(true)
  });

  public onSortUpdated(): void {
    this.sortChange.emit({
      direction: this.sortForm.value.direction ? 'asc' : 'desc',
      by: this.sortForm.value.by ?? DEFAULT_SORT.by
    });
  }
}
