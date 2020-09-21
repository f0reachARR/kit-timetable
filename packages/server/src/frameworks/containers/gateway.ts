import { ContainerModule } from 'inversify';
import { SyllabusSubjectRepository } from '../../applications/repositories/syllabus-subject';
import { SyllabusSubjectGateway } from '../../interfaces/gateways/syllabus-subject';
import { TYPES } from '../../types';

export const gatewayContainer = new ContainerModule((bind) => {
  bind<SyllabusSubjectRepository>(TYPES.SyllabusSubjectRepository)
    .to(SyllabusSubjectGateway)
    .inSingletonScope();
});
