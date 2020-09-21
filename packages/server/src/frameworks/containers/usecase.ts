import { ContainerModule } from 'inversify';
import { FindSyllabusInteractor } from '../../applications/interactors/find-syllabus';
import { GetSubjectInteractor } from '../../applications/interactors/get-subject';
import { GetSubjectSearchTermsIntractor } from '../../applications/interactors/get-subject-search-terms';
import { FindSyllabusUsecase } from '../../applications/usecases/find-syllabus';
import { GetSubjectUsecase } from '../../applications/usecases/get-subject';
import { GetSubjectSearchTermsUsecase } from '../../applications/usecases/get-subject-search-terms';
import { TYPES } from '../../types';

export const usecaseContainer = new ContainerModule((bind) => {
  bind<FindSyllabusUsecase>(TYPES.FindSyllabusUsecase)
    .to(FindSyllabusInteractor)
    .inSingletonScope();
  bind<GetSubjectSearchTermsUsecase>(TYPES.GetSubjectSearchTerms)
    .to(GetSubjectSearchTermsIntractor)
    .inSingletonScope();
  bind<GetSubjectUsecase>(TYPES.GetSubjectUsecase)
    .to(GetSubjectInteractor)
    .inSingletonScope();
});
