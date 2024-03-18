import { AxiosResponse } from 'axios';
import { IRequestConfig } from './IRequestConfig';

enum OrderEnum {
  ASC = 1,
  DEFAULT = 0,
  DESC = -1
}

type Order = OrderEnum.ASC | OrderEnum.DEFAULT | OrderEnum.DESC

type Ret = 0 | 1 | -1

interface IOrderBy {
  field: string;
  order: Order;
}
interface IFieldError {
  field: string;
  msg: string;
}

export interface IError {
  msg: string;
  errorCode: number;
  fieldErrors: IFieldError[];
}

export interface IResponseCustomData<T = any> extends AxiosResponse {
  ret: Ret;
  data: T;
  bizCode: number;
  error: IError | null;
}

export interface IPageResponseData<T = any> {
  data: T[];
  orderbys: IOrderBy[];
  limit: number;
  skip: number;
  total: number;
}


export interface IResponseConfig extends AxiosResponse {
  config: IRequestConfig;
  data: IResponseCustomData;
}


