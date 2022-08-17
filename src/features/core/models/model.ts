export type Model<TName extends string, TValues> = TValues & { [modelKey in `is${Capitalize<TName>}`]: true };
