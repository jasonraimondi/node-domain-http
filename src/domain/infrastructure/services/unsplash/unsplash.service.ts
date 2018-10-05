import { injectable } from 'inversify';

import { ImageEntity } from '../../../models/image/image.entity';
import { LoggerService } from '../logger.service';
import { IRestClient } from '../../rest/rest-client';
import { UnsplashRestClient } from '../../rest/unsplash.rest-client';

@injectable()
export class UnsplashService {
  private readonly unsplashRestClient: UnsplashRestClient;

  constructor(restClient: IRestClient, private readonly logger: LoggerService) {
    this.unsplashRestClient = new UnsplashRestClient(restClient);
  }

  public async listPhotos(): Promise<ImageEntity[]> {
    const response = await this.unsplashRestClient.get('photos');

    return response.data.map((res) => {
      return new ImageEntity({
        original: res.urls.raw,
        large: res.urls.full,
        medium: res.urls.regular,
        small: res.urls.small,
        thumb: res.urls.thumb,
      });
    });
  }
}
