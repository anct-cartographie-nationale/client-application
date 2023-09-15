export type SplitResult = {
  matchString: boolean;
  value: string;
};

export const searchSplit = (inputText: string, searchText: string): SplitResult[] =>
  inputText
    .replace(';', ' ')
    .replace(new RegExp(searchText, 'gi'), `;$&;`)
    .split(';')
    .filter((value: string): boolean => value != '')
    .map((value: string): SplitResult => ({ matchString: value.toLowerCase() === searchText.toLowerCase(), value }));
