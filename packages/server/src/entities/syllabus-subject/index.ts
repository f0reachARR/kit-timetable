import { EntityBase } from '../base';

interface SubjectClassPlan {
  topic: string;
  content?: string;
}

interface SubjectInstructor {
  id?: string;
  name: string;
}

interface SubjectGoal {
  description: string;
  evaluations: Array<{
    label: string;
    description: string;
  }>;
}

interface SubjectSchedule {
  type: 'intensive' | 'fixed' | 'unknown';
  days?: Array<{
    date: number;
    hour: number;
  }>;
}

interface SubjectCategory {
  faculty?: string;
  field?: string;
  program?: string;
  category?: string;
  semester: string;
  available: boolean;
  year: number[];
  schedule: SubjectSchedule;
}

export class SyllabusSubjectEntity extends EntityBase {
  readonly id!: number;
  readonly title!: string;
  readonly categories!: SubjectCategory[];
  readonly instructors!: SubjectInstructor[];
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
