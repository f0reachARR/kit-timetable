import { TimetableEntity } from '../../entities/timetable';

export interface TimetableRepository {
  findById(id: string): Promise<TimetableEntity | null>;
  findByAccountId(
    accountId: string,
    offset: number,
    limit: number,
  ): Promise<TimetableEntity[]>;
  save(entity: TimetableEntity): Promise<TimetableEntity>;
}
