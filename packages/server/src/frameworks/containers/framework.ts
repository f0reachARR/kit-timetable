import { ContainerModule } from 'inversify';
import { TYPES } from '../../types';
import { ConfigImpl, Config } from '../config';
import { Server, ServerImpl } from '../server';

export const frameworkContainer = new ContainerModule((bind) => {
  bind<Config>(TYPES.Config).to(ConfigImpl).inSingletonScope();
  bind<Server>(TYPES.Server).to(ServerImpl).inSingletonScope();
});
