import { injectable, multiInject } from 'inversify';
import { TYPES } from '../../types';
import { IdProviderRepository } from '../repositories/id-provider';
import {
  StartIdpLoginUsecase,
  StartIdpLoginRequest,
  StartIdpLoginResponse,
} from '../usecases/start-idp-login';

@injectable()
export class StartIdpLoginInteractor implements StartIdpLoginUsecase {
  private providers: Map<string, IdProviderRepository>;
  constructor(
    @multiInject(TYPES.IdProviderRepositories)
    providers: readonly IdProviderRepository[],
  ) {
    this.providers = new Map();
    providers.forEach((provider) =>
      this.providers.set(provider.type, provider),
    );
  }

  async run(request: StartIdpLoginRequest): Promise<StartIdpLoginResponse> {
    const provider = this.providers.get(request.idpType);
    if (!provider) {
      throw new Error('Unsupported provider');
    }

    const result = await provider.start();

    return {
      redirectUrl: result.url,
      state: result.state,
    };
  }
}
