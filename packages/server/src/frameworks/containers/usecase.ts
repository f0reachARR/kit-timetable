import { ContainerModule } from 'inversify';
import { FindSyllabusInteractor } from '../../interactors/find-syllabus';
import { GetSubjectSearchTermsIntractor } from '../../interactors/get-subject-search-terms';
import { TYPES } from '../../types';
import { FindSyllabusUsecase } from '../../usecases/find-syllabus';
import { GetSubjectSearchTermsUsecase } from '../../usecases/get-subject-search-terms';

export const usecaseContainer = new ContainerModule((bind) => {
  bind<FindSyllabusUsecase>(TYPES.FindSyllabusUsecase)
    .to(FindSyllabusInteractor)
    .inSingletonScope();
  bind<GetSubjectSearchTermsUsecase>(TYPES.GetSubjectSearchTerms)
    .to(GetSubjectSearchTermsIntractor)
    .inSingletonScope();
});
