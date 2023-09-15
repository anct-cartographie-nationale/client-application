import { searchSplit, SplitResult } from './search-split';

describe('search split', (): void => {
  it("should not find any match in '' for 'test'", (): void => {
    const results: SplitResult[] = searchSplit('', 'test');

    expect(results).toStrictEqual<SplitResult[]>([]);
  });

  it("should not find any match in 'hello' for 'test' but full non matching 'hello'", (): void => {
    const results: SplitResult[] = searchSplit('hello', 'test');

    expect(results).toStrictEqual<SplitResult[]>([
      {
        matchString: false,
        value: 'hello'
      }
    ]);
  });

  it("should find a single match in 'test' for 'test'", (): void => {
    const results: SplitResult[] = searchSplit('test', 'test');

    expect(results).toStrictEqual<SplitResult[]>([
      {
        matchString: true,
        value: 'test'
      }
    ]);
  });

  it("should find a single match in 'test123' for 'test' and '123' as last split result", (): void => {
    const results: SplitResult[] = searchSplit('test123', 'test');

    expect(results).toStrictEqual<SplitResult[]>([
      {
        matchString: true,
        value: 'test'
      },
      {
        matchString: false,
        value: '123'
      }
    ]);
  });

  it("should find a single match in '123test' for 'test' and '123' as first split result", (): void => {
    const results: SplitResult[] = searchSplit('123test', 'test');

    expect(results).toStrictEqual<SplitResult[]>([
      {
        matchString: false,
        value: '123'
      },
      {
        matchString: true,
        value: 'test'
      }
    ]);
  });

  it("should find a single match in '123test' for 'test' and '123' as first split result", (): void => {
    const results: SplitResult[] = searchSplit('123test456', 'test');

    expect(results).toStrictEqual<SplitResult[]>([
      {
        matchString: false,
        value: '123'
      },
      {
        matchString: true,
        value: 'test'
      },
      {
        matchString: false,
        value: '456'
      }
    ]);
  });

  it('should not find extra match when input string contains ; separator', (): void => {
    const results: SplitResult[] = searchSplit('test123;456', 'test');

    expect(results).toStrictEqual<SplitResult[]>([
      {
        matchString: true,
        value: 'test'
      },
      {
        matchString: false,
        value: '123 456'
      }
    ]);
  });
});
