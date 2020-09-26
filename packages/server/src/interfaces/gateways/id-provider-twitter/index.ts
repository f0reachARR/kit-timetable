import { injectable, inject } from 'inversify';
import { OAuth } from 'oauth';
import { Repository, getRepository } from 'typeorm';
import {
  IdProviderRepository,
  IdProviderStartData,
} from '../../../applications/repositories/id-provider';
import { Config } from '../../../frameworks/config';
import { TYPES } from '../../../types';
import { IdProviderOrm } from './orm';

@injectable()
export class IdProviderTwitterGateway implements IdProviderRepository {
  private readonly oauth: OAuth;
  private readonly orm: Repository<IdProviderOrm>;
  readonly type = 'twitter';
  constructor(
    @inject(TYPES.Config)
    { twitter }: Config,
  ) {
    this.oauth = new OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      twitter.consumerKey,
      twitter.consumerSecret,
      '1.0',
      twitter.callbackUrl ?? 'oob',
      'HMAC-SHA1',
    );
    this.orm = getRepository(IdProviderOrm);
  }

  async start() {
    return new Promise<IdProviderStartData>((resolve, reject) => {
      this.oauth.getOAuthRequestToken((err, token, tokenSecret) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            url: `https://api.twitter.com/oauth/authorize?oauth_token=${token}`,
            state: JSON.stringify({ token, tokenSecret }),
          });
        }
      });
    });
  }

  private async getAccessToken(stateData: string, verifier: string) {
    const state: Record<string, string> = JSON.parse(stateData ?? '{}');
    if (
      typeof state.token !== 'string' ||
      typeof state.tokenSecret !== 'string'
    ) {
      throw new Error('invalid type');
    }

    return new Promise<{ token: string; tokenSecret: string }>(
      (resolve, reject) => {
        this.oauth.getOAuthAccessToken(
          state.token,
          state.tokenSecret,
          verifier,
          (err, token, tokenSecret) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                token,
                tokenSecret,
              });
            }
          },
        );
      },
    );
  }

  async getUserId(verifier: string, state: string) {
    const { token, tokenSecret } = await this.getAccessToken(state, verifier);
    const userId = token.substring(0, token.indexOf('-'));

    const ormEntity = this.orm.create({
      id: userId,
      token,
      tokenSecret,
    });
    await this.orm.save(ormEntity);

    return userId;
  }

  async getInternalUserId(id: string) {
    const entity = await this.orm.findOne({ id });

    return entity?.associatedId ?? null;
  }

  async associateInternalUserId(id: string, internalId: string) {
    const entity = await this.orm.findOne({ id });
    if (!entity) {
      throw new Error('Unknown id');
    }
    if (entity?.associatedId) {
      throw new Error('This id is associated with other account');
    }

    await this.orm.update({ id }, { associatedId: internalId });
  }
}
