import { Entity } from '../entity/entity';

export class ImageEntity extends Entity<ImageEntity> {
  public original?: string;
  public large?: string;
  public medium?: string;
  public small?: string;
  public thumb?: string;
}
