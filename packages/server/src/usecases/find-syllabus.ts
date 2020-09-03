import { SyllabusSubjectEntity } from '../entities/syllabus-subject';

export interface FindSyllabusQuery {
  date?: number;
  hour?: number;
  type?: 'intensive' | 'fixed';
  year?: number;
  semester?: string;
  available?: boolean;
  flags?: Array<
    'internship' | 'igp' | 'al' | 'pbl' | 'pt' | 'univ3' | 'kyoto' | 'lottery'
  >;
  title?: string;
}
export interface FindSyllabusRequest {
  query: FindSyllabusQuery;
  from?: number;
  count?: number;
}

export interface FindSyllabusResponse {
  totalCount: number;
  items: SyllabusSubjectEntity[];
}

export interface FindSyllabusUsecase {
  run(request: FindSyllabusRequest): Promise<FindSyllabusResponse>;
}
