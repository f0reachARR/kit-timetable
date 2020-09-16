import { ContainerModule } from 'inversify';
import { SyllabusController } from '../../controller/syllabus-controller';
import { FindSyllabusPresenter } from '../../presenters/find-syllabus-presenter';
import { SubjectSearchTermsPresenter } from '../../presenters/subject-search-terms-presenter';
import { SyllabusSubjectPresenter } from '../../presenters/syllabus-subject-presenter';

export const interfaceContainer = new ContainerModule((bind) => {
  bind(SyllabusController).toSelf().inSingletonScope();

  bind(SyllabusSubjectPresenter).toSelf().inSingletonScope();
  bind(FindSyllabusPresenter).toSelf().inSingletonScope();
  bind(SubjectSearchTermsPresenter).toSelf().inSingletonScope();
});
