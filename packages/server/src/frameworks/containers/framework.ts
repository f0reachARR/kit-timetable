import { AsyncContainerModule } from 'inversify';
import { TYPES } from '../../types';
import { ConfigImpl, Config } from '../config';

export const frameworkContainer = new AsyncContainerModule(async (bind) => {
  bind<Config>(TYPES.Config).to(ConfigImpl).inSingletonScope();
});
