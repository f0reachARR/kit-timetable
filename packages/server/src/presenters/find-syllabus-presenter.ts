import { injectable, inject } from 'inversify';
import { FindSyllabusResponse } from '../usecases/find-syllabus';
import { SyllabusSubjectPresenter } from './syllabus-subject-presenter';

@injectable()
export class FindSyllabusPresenter {
  constructor(
    @inject(SyllabusSubjectPresenter)
    private readonly syllabusSubjectPresenter: SyllabusSubjectPresenter,
  ) {}

  run({ items, totalCount }: FindSyllabusResponse) {
    return {
      items: items.map((item) => this.syllabusSubjectPresenter.run(item)),
      total: totalCount,
    };
  }
}
