import { injectable, inject } from 'inversify';
import { SyllabusSubjectPresenter } from '../presenters/syllabus-subject-presenter';
import { TYPES } from '../types';
import {
  FindSyllabusUsecase,
  FindSyllabusQuery,
} from '../usecases/find-syllabus';

@injectable()
export class SyllabusController {
  constructor(
    @inject(TYPES.FindSyllabusUsecase)
    readonly findSyllabus: FindSyllabusUsecase,
    @inject(SyllabusSubjectPresenter)
    readonly syllabusSubjectPresenter: SyllabusSubjectPresenter,
  ) {}

  async find(query: FindSyllabusQuery, from?: number, count?: number) {
    const { items, totalCount } = await this.findSyllabus.run({
      query,
      from,
      count,
    });

    return {
      items: items.map((entity) => this.syllabusSubjectPresenter.run(entity)),
      totalCount,
    };
  }
}
