export interface StartIdpLoginRequest {
  idpType: string;
}

export interface StartIdpLoginResponse {
  state: string;
  redirectUrl: string;
}

export interface StartIdpLoginUsecase {
  run(request: StartIdpLoginRequest): Promise<StartIdpLoginResponse>;
}
