const processDataFromCallback = <TData>(dataFormCallback: TData, field: string) =>
  dataFormCallback != null ? { [field]: dataFormCallback } : {};

const processData = <TData, TParam>(data: TParam | TData, field: string, callback?: (data: TParam) => TData) =>
  callback ? processDataFromCallback(callback(data as TParam), field) : { [field]: data };

export const ifAny = <TData, TParam = null>(field: string, data?: TParam | TData, callback?: (data: TParam) => TData) =>
  data != null ? processData(data, field, callback) : {};
