import { IRestClient } from '../../src/domain/infrastructure/rest/rest-client';

export class DummyRestClient implements IRestClient {
  public setBaseURL(baseURL: string): void {
    console.log(baseURL);
  }

  public async get<T = any>(path: string, config: object): Promise<T|any> {
    return 'DatabaseList';
  }

  public async post<T = any>(path: string, data: object, config: object): Promise<T|any> {
    return 'DatabaseList';
  }
}
