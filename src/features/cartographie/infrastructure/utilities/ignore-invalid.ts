export class OptionalPropertyError extends Error {
  public constructor(public readonly key: string, message: string) {
    super(message);
  }
}

const filterObject = (property: string, payload: { [k: string]: unknown }) => {
  const { [property]: _, ...filteredPayload } = payload;
  return filteredPayload;
};

export const ignoreInvalidPropertiesOf = <TModel>(
  payload: { [k: string]: unknown },
  factory: (data: { [k: string]: unknown }) => TModel
): TModel => {
  try {
    return factory(payload);
  } catch (error) {
    if (error instanceof OptionalPropertyError) {
      return ignoreInvalidPropertiesOf<TModel>(filterObject(error.key, payload), factory);
    }

    throw error;
  }
};

export const ignoreInvalidValueOf =
  <TModel, TValue>(factory: (data: TValue) => TModel) =>
  (data: TValue): TModel => {
    try {
      return factory(data);
    } catch {
      return null as unknown as TModel;
    }
  };
