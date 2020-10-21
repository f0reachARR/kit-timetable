import { EntityBase } from './base';

export class TimetableEntity extends EntityBase {
  readonly id!: string;
  readonly title!: string;
  readonly description = '';
  readonly tags: number[] = [];

  readonly createdBy!: string;
  readonly createdAt = new Date();
  readonly updatedAt = new Date();

  readonly defaultYear: number | null = null;
  readonly defaultSemester: string | null = null;
  readonly isShared = false;
  readonly isSearchable = false;
}
