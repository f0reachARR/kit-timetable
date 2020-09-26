export interface IdProviderStartData {
  state: string;
  url: string;
}

export interface IdProviderRepository {
  type: string;
  start(): Promise<IdProviderStartData>;
  getUserId(verifier: string, state: string): Promise<string>;

  getInternalUserId(userId: string): Promise<string | null>;
  associateInternalUserId(
    userId: string,
    internalUserId: string,
  ): Promise<void>;
}
