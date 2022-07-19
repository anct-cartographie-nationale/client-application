export class OptionalPropertyError extends Error {
  public constructor(public readonly key: string, message: string) {
    super(message);
  }
}

const filterObject = <TModel>(payload: { [k: string]: unknown }, propertyToIgnore: string) =>
  Object.fromEntries(Object.entries(payload).filter(([property]: [string, unknown]) => property !== propertyToIgnore));

export const ignoreInvalidPropertiesOf = <TModel>(
  payload: { [k: string]: unknown },
  factory: (data: { [k: string]: unknown }) => TModel
): TModel => {
  try {
    return factory(payload);
  } catch (error) {
    if (error instanceof OptionalPropertyError) {
      return ignoreInvalidPropertiesOf<TModel>(filterObject(payload, error.key), factory);
    }

    throw error;
  }
};

export const ignoreInvalidValueOf =
  <TModel, TValue>(factory: (data: TValue) => TModel) =>
  (data: TValue): TModel => {
    try {
      return factory(data);
    } catch (error) {
      return null as unknown as TModel;
    }
  };
