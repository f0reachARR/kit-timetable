import { injectable, inject } from 'inversify';
import { sign, verify } from 'jsonwebtoken';
import { SessionRepository } from '../../../applications/repositories/session';
import { Config } from '../../../frameworks/config';
import { TYPES } from '../../../types';

const options = {
  algorithm: 'HS256' as const,
  issuer: 'kit-timetable',
};

type JwtPayload = { sub: string };

@injectable()
export class SessionGateway implements SessionRepository {
  constructor(
    @inject(TYPES.Config)
    readonly config: Config,
  ) {}

  async createSession(userId: string) {
    const token = sign({}, this.config.session.secretKey, {
      ...options,
      subject: userId,
    });

    return token;
  }

  async getId(sessionId: string) {
    const result = verify(sessionId, this.config.session.secretKey, {
      ...options,
    });

    if (typeof result !== 'object') {
      throw new Error('jwt is invalid');
    }

    const { sub } = result as JwtPayload;

    if (typeof sub !== 'string') {
      throw new Error('jwt is invalid');
    }

    return sub;
  }
}
