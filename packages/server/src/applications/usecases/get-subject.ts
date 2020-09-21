import { SyllabusSubjectEntity } from '../../entities/syllabus-subject';

export interface GetSubjectRequest {
  id: string;
}

export interface GetSubjectResponse {
  subject: SyllabusSubjectEntity;
}

export interface GetSubjectUsecase {
  run(request: GetSubjectRequest): Promise<GetSubjectResponse>;
}
