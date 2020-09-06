import { ContainerModule } from 'inversify';
import { FindSyllabusInteractor } from '../../interactors/find-syllabus';
import { TYPES } from '../../types';
import { FindSyllabusUsecase } from '../../usecases/find-syllabus';

export const usecaseContainer = new ContainerModule((bind) => {
  bind<FindSyllabusUsecase>(TYPES.FindSyllabusUsecase)
    .to(FindSyllabusInteractor)
    .inSingletonScope();
});
