import { injectable } from 'inversify';
import { Repository, getRepository } from 'typeorm';
import { AccountRepository } from '../../../applications/repositories/account';
import { AccountEntity } from '../../../entities/account';
import { AccountOrm } from './orm';

@injectable()
export class AccountGateway implements AccountRepository {
  private orm: Repository<AccountOrm>;
  constructor() {
    this.orm = getRepository(AccountOrm);
  }

  private transformFromOrm(account: AccountOrm) {
    return AccountEntity.from({
      userId: account.id,
      isVerified: account.verified,
    });
  }

  async create() {
    const account = await this.orm.create();

    return this.transformFromOrm(account);
  }

  async update(entity: AccountEntity) {
    await this.orm.findOneOrFail(entity.userId);

    await this.orm.update(entity.userId, {
      verified: entity.isVerified,
    });

    return entity;
  }

  async get(id: string) {
    const account = await this.orm.findOne(id);

    return account ? this.transformFromOrm(account) : null;
  }
}
