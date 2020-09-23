import { ContainerModule } from 'inversify';
import { AccountRepository } from '../../applications/repositories/account';
import { SessionRepository } from '../../applications/repositories/session';
import { SyllabusSubjectRepository } from '../../applications/repositories/syllabus-subject';
import { AccountGateway } from '../../interfaces/gateways/account';
import { SessionGateway } from '../../interfaces/gateways/session';
import { SyllabusSubjectGateway } from '../../interfaces/gateways/syllabus-subject';
import { TYPES } from '../../types';

export const gatewayContainer = new ContainerModule((bind) => {
  bind<SyllabusSubjectRepository>(TYPES.SyllabusSubjectRepository)
    .to(SyllabusSubjectGateway)
    .inSingletonScope();
  bind<AccountRepository>(TYPES.AccountRepository)
    .to(AccountGateway)
    .inSingletonScope();
  bind<SessionRepository>(TYPES.SessionRepository)
    .to(SessionGateway)
    .inSingletonScope();
});
