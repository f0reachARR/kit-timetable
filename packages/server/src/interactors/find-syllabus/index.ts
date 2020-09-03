import { injectable, inject } from 'inversify';
import {
  SyllabusSubjectRepository,
  SyllabusSubjectRepositoryFindRequest,
} from '../../repositories/syllabus-subject';
import { TYPES } from '../../types';
import {
  FindSyllabusUsecase,
  FindSyllabusRequest,
  FindSyllabusResponse,
  FindSyllabusQuery,
} from '../../usecases/find-syllabus';

@injectable()
export class FindSyllabusInteractor implements FindSyllabusUsecase {
  constructor(
    @inject(TYPES.SyllabusSubjectRepository)
    readonly syllabusSubjectRepo: SyllabusSubjectRepository,
  ) {}

  private validateQuery(query: FindSyllabusQuery) {
    if (query.title && query.title?.length > 64) {
      throw new Error('query `title` is too long');
    }

    if (typeof query.year === 'number' && (query.year > 4 || query.year < 1)) {
      throw new Error('query `year` is out of range');
    }

    if (typeof query.hour === 'number' && (query.hour > 6 || query.hour < 1)) {
      throw new Error('query `hour` is out of range');
    }

    if (typeof query.date === 'number' && (query.date > 5 || query.date < 1)) {
      throw new Error('query `date` is out of range');
    }

    return query;
  }

  async run(request: FindSyllabusRequest): Promise<FindSyllabusResponse> {
    const repoRequest: SyllabusSubjectRepositoryFindRequest = {
      count: Math.max(Math.min(request.count ?? 25, 100), 0),
      from: Math.max(request.from ?? 0, 0),
      query: this.validateQuery(request.query ?? {}),
    };
    const result = await this.syllabusSubjectRepo.find(repoRequest);

    return result;
  }
}
