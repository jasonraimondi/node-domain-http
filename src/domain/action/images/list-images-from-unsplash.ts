import { ListImagesFromUnsplashHandler } from '../../action-handlers/images/list-images-from-unsplash.handler';
import { Action } from '../../infrastructure/lib/decorators/action.decorator';
import { IPagination } from '../../infrastructure/lib/interfaces';
import { BaseQuery } from '../../infrastructure/lib/actions/base-query';

export interface IListImagesFromUnsplash extends IPagination {
}

@Action(ListImagesFromUnsplashHandler)
export class ListImagesFromUnsplash extends BaseQuery implements IListImagesFromUnsplash  {
  public readonly page: number;
  public readonly itemsPerPage: number;

  public constructor(init: IListImagesFromUnsplash) {
    super();
    Object.assign(this, init);
  }
}
