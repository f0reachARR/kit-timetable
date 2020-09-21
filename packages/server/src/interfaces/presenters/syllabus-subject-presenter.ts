import { injectable } from 'inversify';
import {
  SyllabusSubjectEntity,
  SubjectSchedule,
} from '../../entities/syllabus-subject';
import {
  SubjectFlags,
  SubjectScheduleType,
} from '../../frameworks/server/graphql.generated';

@injectable()
export class SyllabusSubjectPresenter {
  private transformFlag(flag: SyllabusSubjectEntity['flags'][0]): SubjectFlags {
    switch (flag) {
      case 'internship':
        return SubjectFlags.Internship;
      case 'al':
        return SubjectFlags.Al;
      case 'igp':
        return SubjectFlags.Igp;
      case 'kyoto':
        return SubjectFlags.Kyoto;
      case 'lottery':
        return SubjectFlags.Lottery;
      case 'pbl':
        return SubjectFlags.Pbl;
      case 'pt':
        return SubjectFlags.Pt;
      case 'univ3':
        return SubjectFlags.Univ3;
    }
  }

  private transformScheduleType(
    type: SubjectSchedule['type'],
  ): SubjectScheduleType {
    switch (type) {
      case 'intensive':
        return SubjectScheduleType.Intensive;
      case 'fixed':
        return SubjectScheduleType.Fixed;
      case 'unknown':
        return SubjectScheduleType.Unknown;
    }
  }

  run(entity: SyllabusSubjectEntity) {
    return {
      ...entity,
      id: entity.id.toString(),
      flags: entity.flags.map((flag) => this.transformFlag(flag)),
      categories: entity.categories.map((category) => ({
        ...category,
        schedule: {
          ...category.schedule,
          type: this.transformScheduleType(category.schedule.type),
        },
      })),
    };
  }
}
