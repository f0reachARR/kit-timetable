import { injectable } from 'inversify';
import { GetSubjectSearchTermsResponse } from '../../applications/usecases/get-subject-search-terms';

@injectable()
export class SubjectSearchTermsPresenter {
  run(input: GetSubjectSearchTermsResponse) {
    return {
      semesters: input.semesters.sort(),
      years: input.years.sort(),
      hours: input.hours.sort(),
    };
  }
}
