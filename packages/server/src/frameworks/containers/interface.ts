import { ContainerModule } from 'inversify';
import { SyllabusController } from '../../interfaces/controller/syllabus-controller';
import { FindSyllabusPresenter } from '../../interfaces/presenters/find-syllabus-presenter';
import { SubjectSearchTermsPresenter } from '../../interfaces/presenters/subject-search-terms-presenter';
import { SyllabusSubjectPresenter } from '../../interfaces/presenters/syllabus-subject-presenter';

export const interfaceContainer = new ContainerModule((bind) => {
  bind(SyllabusController).toSelf().inSingletonScope();

  bind(SyllabusSubjectPresenter).toSelf().inSingletonScope();
  bind(FindSyllabusPresenter).toSelf().inSingletonScope();
  bind(SubjectSearchTermsPresenter).toSelf().inSingletonScope();
});
