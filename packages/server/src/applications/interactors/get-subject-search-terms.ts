import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import { SyllabusSubjectRepository } from '../repositories/syllabus-subject';
import { GetSubjectSearchTermsUsecase } from '../usecases/get-subject-search-terms';

@injectable()
export class GetSubjectSearchTermsIntractor
  implements GetSubjectSearchTermsUsecase {
  constructor(
    @inject(TYPES.SyllabusSubjectRepository)
    readonly repository: SyllabusSubjectRepository,
  ) {}

  async run() {
    const result = await this.repository.getTerms();

    return result;
  }
}
