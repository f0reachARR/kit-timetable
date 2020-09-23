export interface IdProviderStartData {
  state?: string;
  url: string;
}

export interface IdProviderRepository {
  start(): Promise<IdProviderStartData>;
  getUserId(data: IdProviderStartData, verifier: string): Promise<string>;
}
