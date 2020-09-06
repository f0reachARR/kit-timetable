import { injectable } from 'inversify';
import { SyllabusSubjectEntity } from '../entities/syllabus-subject';

@injectable()
export class SyllabusSubjectPresenter {
  run(entity: SyllabusSubjectEntity) {
    return entity;
  }
}
