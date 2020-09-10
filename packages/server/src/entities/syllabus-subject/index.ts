import { EntityBase } from '../base';

export interface SubjectClassPlan {
  topic: string;
  content?: string;
}

export interface SubjectInstructor {
  id?: string;
  name: string;
}

export interface SubjectGoal {
  description: string;
  evaluations: Array<{
    label: string;
    description: string;
  }>;
}

export interface SubjectSchedule {
  type: 'intensive' | 'fixed' | 'unknown';
  days?: Array<{
    date: number;
    hour: number;
  }>;
}

export interface SubjectCategory {
  faculty?: string;
  field?: string;
  program?: string;
  category?: string;
  semester: string;
  available: boolean;
  year: number[];
  schedule: SubjectSchedule;
}

export interface SubjectAttachment {
  key: string;
  name: string;
}

export class SyllabusSubjectEntity extends EntityBase {
  readonly id!: number;
  readonly title!: string;
  readonly categories!: SubjectCategory[];
  readonly instructors!: SubjectInstructor[];
  readonly attachments!: SubjectAttachment[];
  readonly flags!: Array<
    'internship' | 'igp' | 'al' | 'pbl' | 'pt' | 'univ3' | 'kyoto' | 'lottery'
  >;
  readonly outline!: string;
  readonly purpose!: string;
  readonly plans!: SubjectClassPlan[];
  readonly requirement!: string;
  readonly point!: string;
  readonly textbook!: string;
  readonly gradingPolicy!: string;
  readonly remark!: string;
  readonly researchPlan!: string;

  readonly timetableId: number | null = null;
  readonly courseId: number | null = null;
  readonly credits: number | null = null;
  readonly type: string | null = null;
  readonly code: string | null = null;
  readonly className: string | null = null;
  readonly goal: SubjectGoal | null = null;
}
