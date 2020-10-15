import { injectable, inject } from 'inversify';
import { FindSyllabusUsecase } from '../../applications/usecases/find-syllabus';
import { GetSubjectUsecase } from '../../applications/usecases/get-subject';
import { GetSubjectSearchTermsUsecase } from '../../applications/usecases/get-subject-search-terms';
import { SubjectSearchQuery } from '../../frameworks/server/graphql.generated';
import { TYPES } from '../../types';
import { FindSyllabusPresenter } from '../presenters/find-syllabus-presenter';
import { SubjectSearchTermsPresenter } from '../presenters/subject-search-terms-presenter';
import { SyllabusSubjectPresenter } from '../presenters/syllabus-subject-presenter';

@injectable()
export class SyllabusController {
  constructor(
    @inject(TYPES.FindSyllabusUsecase)
    private readonly findSyllabus: FindSyllabusUsecase,
    @inject(TYPES.GetSubjectSearchTerms)
    private readonly getSubjectSearchTerms: GetSubjectSearchTermsUsecase,
    @inject(TYPES.GetSubjectUsecase)
    private readonly getSubject: GetSubjectUsecase,
    @inject(FindSyllabusPresenter)
    private readonly findSyllabusPresenter: FindSyllabusPresenter,
    @inject(SyllabusSubjectPresenter)
    private readonly subjectPresenter: SyllabusSubjectPresenter,
    @inject(SubjectSearchTermsPresenter)
    private readonly subjectSearchTermsPresenter: SubjectSearchTermsPresenter,
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
        faculty: query?.faculty ?? undefined,
        category: query?.category ?? undefined,
        field: query?.field ?? undefined,
        program: query?.program ?? undefined,
      },
      from: from ?? undefined,
      count: count ?? undefined,
    });

    return this.findSyllabusPresenter.run(response);
  }

  async getTerms() {
    const response = await this.getSubjectSearchTerms.run();

    return this.subjectSearchTermsPresenter.run(response);
  }

  async get(id: string) {
    const { subject } = await this.getSubject.run({ id });

    return this.subjectPresenter.run(subject);
  }
}
