import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResultFoundPresentation } from '../../../adresse';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-field',
  templateUrl: './search-field.component.html'
})
export class SearchFieldComponent implements OnChanges {
  @Input() public suggestions: ResultFoundPresentation[] = [];

  @Input() public isNotFound: boolean = false;

  @Input() public displayReset: boolean = false;

  @Input() public placeholder: string = 'Entrez une adresse';

  @Input() public defaultValue?: string;

  @Output() public readonly selected: EventEmitter<ResultFoundPresentation> = new EventEmitter<ResultFoundPresentation>();

  @Output() public readonly resetSearch: EventEmitter<void> = new EventEmitter<void>();

  @Output() public readonly search: EventEmitter<string> = new EventEmitter<string>();

  formGroup: FormGroup = new FormGroup({ search: new FormControl() });

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    simpleChanges['defaultValue'] && this.formGroup.get('search')?.setValue(this.defaultValue ?? '');
  }

  public setSuggestion(suggestion: ResultFoundPresentation): void {
    this.formGroup.get('search')?.setValue(suggestion.label);
    this.search.next(suggestion.label);
    this.selected.next(suggestion);
  }

  public trackBySuggestionName(_: number, suggestion: ResultFoundPresentation): string {
    return `${suggestion.label}-${suggestion.context}`;
  }

  public clear(): void {
    this.formGroup.get('search')?.reset();
    this.resetSearch.emit();
  }
}
