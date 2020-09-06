import { ContainerModule } from 'inversify';
import { SyllabusController } from '../../controller/syllabus-controller';
import { SyllabusSubjectPresenter } from '../../presenters/syllabus-subject-presenter';

export const interfaceContainer = new ContainerModule((bind) => {
  bind(SyllabusController).toSelf().inSingletonScope();

  bind(SyllabusSubjectPresenter).toSelf().inSingletonScope();
});
