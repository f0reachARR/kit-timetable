import { injectable, multiInject, inject } from 'inversify';
import { TYPES } from '../../types';
import { AccountRepository } from '../repositories/account';
import { IdProviderRepository } from '../repositories/id-provider';
import { SessionRepository } from '../repositories/session';
import {
  IdpLoginUsecase,
  IdpLoginRequest,
  IdpLoginResponse,
} from '../usecases/idp-login';

@injectable()
export class IdpLoginInteractor implements IdpLoginUsecase {
  private providers: Map<string, IdProviderRepository>;
  constructor(
    @multiInject(TYPES.IdProviderRepositories)
    providers: readonly IdProviderRepository[],
    @inject(TYPES.AccountRepository)
    private readonly accountRepository: AccountRepository,
    @inject(TYPES.SessionRepository)
    private readonly sessionRepository: SessionRepository,
  ) {
    this.providers = new Map();
    providers.forEach((provider) =>
      this.providers.set(provider.type, provider),
    );
  }

  private async getOrCreateAccount(
    provider: IdProviderRepository,
    idpUserId: string,
  ) {
    const associatedUserId = await provider.getInternalUserId(idpUserId);

    if (associatedUserId) {
      const account = await this.accountRepository.get(associatedUserId);

      if (!account) {
        throw new Error('Associated account not found');
      }

      return account;
    }

    const newAccount = await this.accountRepository.create();
    await provider.associateInternalUserId(idpUserId, newAccount.userId);

    return newAccount;
  }

  async run({
    type,
    state,
    verifier,
  }: IdpLoginRequest): Promise<IdpLoginResponse> {
    const provider = this.providers.get(type);
    if (!provider) {
      throw new Error('Unsupported provider');
    }

    const idpUserId = await provider.getUserId(verifier, state);
    const account = await this.getOrCreateAccount(provider, idpUserId);

    const sessionId = await this.sessionRepository.createSession(
      account.userId,
    );

    return {
      account,
      sessionId,
    };
  }
}
