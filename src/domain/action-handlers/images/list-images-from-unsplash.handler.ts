import { ListImagesFromUnsplash } from '../../action/images/list-images-from-unsplash';
import { ActionHandler } from '../../infrastructure/lib/decorators/action-handler.decorator';
import { IQueryHandler } from '../../infrastructure/lib/interfaces';
import { UnsplashService } from '../../infrastructure/services/unsplash/unsplash.service';

@ActionHandler()
export class ListImagesFromUnsplashHandler implements IQueryHandler<ListImagesFromUnsplash> {
  public constructor(
    private readonly unsplashService: UnsplashService,
  ) {
  }

  public async execute(command: ListImagesFromUnsplash): Promise<any> {
    return await this.unsplashService.listPhotos();
  }
}
