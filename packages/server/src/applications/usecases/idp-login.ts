import { AccountEntity } from '../../entities/account';

export interface IdpLoginRequest {
  type: string;
  state: string;
  verifier: string;
}

export interface IdpLoginResponse {
  account: AccountEntity;
  sessionId: string;
}

export interface IdpLoginUsecase {
  run(request: IdpLoginRequest): Promise<IdpLoginResponse>;
}
