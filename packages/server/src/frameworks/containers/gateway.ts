import { ContainerModule } from 'inversify';
import { SyllabusSubjectGateway } from '../../gateways/syllabus-subject';
import { SyllabusSubjectRepository } from '../../repositories/syllabus-subject';
import { TYPES } from '../../types';

export const gatewayContainer = new ContainerModule((bind) => {
  bind<SyllabusSubjectRepository>(TYPES.SyllabusSubjectRepository)
    .to(SyllabusSubjectGateway)
    .inSingletonScope();
});
