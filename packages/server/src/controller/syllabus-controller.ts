import { injectable, inject } from 'inversify';
import { SubjectSearchQuery } from '../frameworks/server/graphql.generated';
import { FindSyllabusPresenter } from '../presenters/find-syllabus-presenter';
import { TYPES } from '../types';
import { FindSyllabusUsecase } from '../usecases/find-syllabus';

@injectable()
export class SyllabusController {
  constructor(
    @inject(TYPES.FindSyllabusUsecase)
    private readonly findSyllabus: FindSyllabusUsecase,
    @inject(FindSyllabusPresenter)
    private readonly findSyllabusPresenter: FindSyllabusPresenter,
  ) {}

  async find(
    query?: SubjectSearchQuery | null,
    from?: number | null,
    count?: number | null,
  ) {
    const response = await this.findSyllabus.run({
      query: {
        date: query?.date ?? undefined,
        hour: query?.hour ?? undefined,
        type: query?.type ?? undefined,
        year: query?.year ?? undefined,
        semester: query?.semester ?? undefined,
        available: query?.available ?? undefined,
        flags: query?.flags?.slice() ?? undefined,
        title: query?.title ?? undefined,
      },
      from: from ?? undefined,
      count: count ?? undefined,
    });

    return this.findSyllabusPresenter.run(response);
  }
}
