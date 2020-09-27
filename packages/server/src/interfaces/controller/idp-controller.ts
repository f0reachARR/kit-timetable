import { injectable, inject } from 'inversify';
import { IdpLoginUsecase } from '../../applications/usecases/idp-login';
import { StartIdpLoginUsecase } from '../../applications/usecases/start-idp-login';
import {
  IdProviderType,
  IdProviderStartInfo,
  IdProviderFinishResponse,
  IdProviderLoginResult,
} from '../../frameworks/server/graphql.generated';
import { TYPES } from '../../types';
import { AccountPresenter } from '../presenters/account-presenter';

@injectable()
export class IdpController {
  constructor(
    @inject(TYPES.StartIdpLoginUsecase)
    private readonly startIdpLoginUsecase: StartIdpLoginUsecase,
    @inject(TYPES.IdpLoginUsecase)
    private readonly idpLoginUsecase: IdpLoginUsecase,
    @inject(AccountPresenter)
    private readonly accountPresenter: AccountPresenter,
  ) {}

  async startIdpLogin(type: IdProviderType): Promise<IdProviderStartInfo> {
    const { state, redirectUrl } = await this.startIdpLoginUsecase.run({
      idpType: type,
    });

    return {
      url: redirectUrl,
      state,
    };
  }

  async finishIdpLogin(
    response: IdProviderFinishResponse,
  ): Promise<IdProviderLoginResult> {
    const result = await this.idpLoginUsecase.run({
      type: response.type,
      state: response.state,
      verifier: response.verifier,
    });

    return {
      sessionId: result.sessionId,
      account: this.accountPresenter.run(result.account),
    };
  }
}
