import { UnitType } from 'dayjs';
import * as dayjs from 'dayjs';

export class Timestamp {
  public static now(): number {
    return dayjs().unix();
  }

  public static add(
    start: number,
    count: number,
    type: UnitType = 'day',
  ): number {
    return dayjs(start)
      .add(count, type)
      .unix();
  }
}
