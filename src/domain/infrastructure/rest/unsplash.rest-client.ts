import { IRestClient, IRestConfig, IRestPromise } from './rest-client';

export class UnsplashRestClient implements IRestClient {
  public constructor(private readonly restClient: IRestClient) {
    restClient.setBaseURL('https://api.unsplash.com/');
  }

  public get(
    path: string,
    config: IRestConfig = {},
    shouldAuthenticate = true,
  ): IRestPromise {
    if (shouldAuthenticate) {
      config = this.appendKeyToParams(config);
    }
    return this.restClient.get(path, config);
  }

  public post(
    path: string,
    data: {} = {},
    config: IRestConfig = {},
    shouldAuthenticate = true,
  ): IRestPromise {
    if (shouldAuthenticate) {
      config = this.appendKeyToParams(config);
    }
    return this.restClient.post(path, data, config);
  }

  public setBaseURL(baseURL: string): void {
    this.restClient.setBaseURL(baseURL);
  }

  private appendKeyToParams(config: IRestConfig): IRestConfig {
    config.params = {
      ...config.params,
      client_id: process.env.UNSPLASH_ACCESS_KEY,
    };
    return config;
  }
}
