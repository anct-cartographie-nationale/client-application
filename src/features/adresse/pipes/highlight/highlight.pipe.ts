import { Pipe, PipeTransform } from '@angular/core';
import { searchSplit } from './search-split';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(inputText: string, searchText: string): { matchString: boolean; value: string }[] {
    return searchSplit(inputText, searchText);
  }
}
