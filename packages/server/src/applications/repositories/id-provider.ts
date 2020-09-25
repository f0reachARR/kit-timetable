export interface IdProviderStartData {
  state: string;
  url: string;
}

export interface IdProviderRepository {
  start(): Promise<IdProviderStartData>;
  getUserId(verifier: string, state: string): Promise<string>;
}
