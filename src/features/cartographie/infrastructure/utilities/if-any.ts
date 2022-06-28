export const ifAny = <TData, TParam = null>(field: string, data?: TParam | TData, callback?: (data: TParam) => TData) =>
  data ? { [field]: callback ? callback(data as TParam) : data } : {};

export const ifAnyInObject = <TContainer>(field: string, container: TContainer) =>
  Object.keys(container).length > 0 ? { [field]: container } : {};
