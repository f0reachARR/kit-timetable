import { SyllabusSubjectEntity } from '../../entities/syllabus-subject';

export interface SyllabusSubjectRepositoryQuery {
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
export interface SyllabusSubjectRepositoryFindRequest {
  query: SyllabusSubjectRepositoryQuery;
  from: number;
  count: number;
}

export interface SyllabusSubjectRepositoryFindResponse {
  totalCount: number;
  items: SyllabusSubjectEntity[];
}

export interface SyllabusSubjectRepositoryTermsResponse {
  semesters: string[];
  years: number[];
  hours: number[];
}

export interface SyllabusSubjectRepository {
  init(): Promise<void> | void;
  get(id: number): Promise<SyllabusSubjectEntity | null>;
  find(
    request: SyllabusSubjectRepositoryFindRequest,
  ): Promise<SyllabusSubjectRepositoryFindResponse>;
  getTerms(): Promise<SyllabusSubjectRepositoryTermsResponse>;
}
