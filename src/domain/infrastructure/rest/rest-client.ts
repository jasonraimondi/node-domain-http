import { AxiosPromise, AxiosRequestConfig } from 'axios';

export interface IRestPromise<T = any> extends AxiosPromise<T> {}

export interface IRestConfig extends AxiosRequestConfig {}

export interface IRestClient {
  setBaseURL(baseURL: string): void;
  get<T = any>(path: string, config: IRestConfig): Promise<T | any>;
  post<T = any>(
    path: string,
    data: object,
    config: IRestConfig,
  ): Promise<T | any>;
}
