import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResultFoundPresentation } from '../../../adresse';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-field',
  templateUrl: './search-field.component.html'
})
export class SearchFieldComponent<TResultType extends string> implements OnChanges {
  @Input() public suggestions: ResultFoundPresentation<{ type: TResultType }>[] = [];

  @Input() public isNotFound: boolean = false;

  @Input() public displayReset: boolean = false;

  @Input() public placeholder: string = 'Entrez une adresse';

  @Input() public defaultValue?: string;

  @Output() public readonly selected: EventEmitter<ResultFoundPresentation<{ type: TResultType }>> = new EventEmitter<
    ResultFoundPresentation<{ type: TResultType }>
  >();

  @Output() public readonly resetSearch: EventEmitter<void> = new EventEmitter<void>();

  @Output() public readonly search: EventEmitter<string> = new EventEmitter<string>();

  public formGroup: FormGroup = new FormGroup({ search: new FormControl() });

  public previousSuggestions: ResultFoundPresentation<{ type: TResultType }>[] = [];

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    simpleChanges['defaultValue'] && this.formGroup.get('search')?.setValue(this.defaultValue ?? '');
  }

  public setSuggestion(suggestion: ResultFoundPresentation<{ type: TResultType }>): void {
    this.formGroup.get('search')?.setValue(suggestion.label);
    this.search.next(suggestion.label);
    this.selected.next(suggestion);
  }

  public trackBySuggestionName(_: number, suggestion: ResultFoundPresentation<{ type: TResultType }>): string {
    return `${suggestion.label}-${suggestion.context}`;
  }

  public clear(): void {
    this.formGroup.get('search')?.reset();
    this.resetSearch.emit();
  }

  public onReduced(): void {
    if (this.suggestions.length > 0) this.previousSuggestions = this.suggestions;
    this.suggestions = [];
  }
}
