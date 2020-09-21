import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import { SyllabusSubjectRepository } from '../repositories/syllabus-subject';
import {
  GetSubjectUsecase,
  GetSubjectRequest,
  GetSubjectResponse,
} from '../usecases/get-subject';

@injectable()
export class GetSubjectInteractor implements GetSubjectUsecase {
  constructor(
    @inject(TYPES.SyllabusSubjectRepository)
    readonly syllabusSubjectRepository: SyllabusSubjectRepository,
  ) {}

  async run(request: GetSubjectRequest): Promise<GetSubjectResponse> {
    const id = Number(request.id);
    if (isNaN(id)) {
      throw new Error('id is not valid');
    }

    const subject = await this.syllabusSubjectRepository.get(id);

    if (!subject) {
      throw new Error('entity not found');
    }

    return { subject };
  }
}
