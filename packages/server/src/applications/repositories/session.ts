export interface SessionRepository {
  getId(sessionId: string): Promise<string>;
  createSession(userId: string): Promise<string>;
}
