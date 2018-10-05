import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { LoggerService } from '../services/logger.service';
import { IRestClient } from './rest-client';

export class AxiosRestClient implements IRestClient {
  private readonly axios = axios.create();

  public constructor(
    private readonly logger: LoggerService,
    baseURL?: string,
  ) {
    if (baseURL) {
      this.setBaseURL(baseURL);
    }
  }

  public setBaseURL(baseURL: string): void {
    this.axios.defaults.baseURL = baseURL;
  }

  public async get<T = any>(
    path: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.get(path, config);
    } catch (e) {
      this.logErrors(e);
      throw e;
    }
  }

  public async post<T = any>(
    path: string,
    data = {},
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.post(path, data, config);
    } catch (e) {
      this.logErrors(e);
      throw e;
    }
  }

  private logErrors(error: AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      this.logger.error(error.response.data);
      this.logger.error(error.response.status);
      this.logger.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `e.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      this.logger.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      this.logger.error(error.message);
    }
  }
}
